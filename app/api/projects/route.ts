import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query(
      "SELECT id, category, project_name AS projectName, sub_project_id AS subProjectId, client_scope AS clientScope, location, caption, image_url AS url, created_at AS createdAt FROM projects ORDER BY created_at DESC"
    );
    return NextResponse.json({ success: true, projects: rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch projects from MySQL database" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, projectName, subProjectId, clientScope, location, caption, url } = body;

    if (!url || !caption || !projectName || !category) {
      return NextResponse.json(
        { success: false, error: "Category, Project Name, Caption, and Image URL are required" },
        { status: 400 }
      );
    }

    const subId = subProjectId || projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const result: any = await query(
      "INSERT INTO projects (category, project_name, sub_project_id, client_scope, location, caption, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        category,
        projectName,
        subId,
        clientScope || "Bespoke Architecture Fit-Out",
        location || "Delhi NCR",
        caption,
        url,
      ]
    );

    return NextResponse.json({
      success: true,
      id: result?.insertId,
      message: "Project image recorded in MySQL database successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save project image in MySQL" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const url = searchParams.get("url");

    if (id) {
      await query("DELETE FROM projects WHERE id = ?", [id]);
    } else if (url) {
      await query("DELETE FROM projects WHERE image_url = ?", [url]);
    } else {
      return NextResponse.json(
        { success: false, error: "Project ID or Image URL is required for deletion" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Project image deleted from MySQL database" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete project image" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, url, category, projectName, subProjectId, clientScope, location, caption, newUrl } = body;

    const targetUrl = newUrl || url;
    const subId = subProjectId || (projectName ? projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);

    if (id && typeof id === "number") {
      await query(
        "UPDATE projects SET category = ?, project_name = ?, sub_project_id = ?, client_scope = ?, location = ?, caption = ?, image_url = ? WHERE id = ?",
        [category, projectName, subId, clientScope || "Bespoke Turnkey Fit-Out", location || "Delhi NCR", caption, targetUrl, id]
      );
    } else if (url) {
      // Try updating existing row or insert if not yet in MySQL
      const rows: any = await query("SELECT id FROM projects WHERE image_url = ?", [url]);
      if (rows && rows.length > 0) {
        await query(
          "UPDATE projects SET category = ?, project_name = ?, sub_project_id = ?, client_scope = ?, location = ?, caption = ?, image_url = ? WHERE image_url = ?",
          [category, projectName, subId, clientScope || "Bespoke Turnkey Fit-Out", location || "Delhi NCR", caption, targetUrl, url]
        );
      } else {
        await query(
          "INSERT INTO projects (category, project_name, sub_project_id, client_scope, location, caption, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [category, projectName, subId, clientScope || "Bespoke Turnkey Fit-Out", location || "Delhi NCR", caption, targetUrl]
        );
      }
    }

    return NextResponse.json({ success: true, message: "Project image updated successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update project image" },
      { status: 500 }
    );
  }
}

