import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { readServerData, writeServerData } from "@/lib/serverStorage";

export const dynamic = "force-dynamic";

interface ProjectRecord {
  id: string | number;
  category: "Residential" | "Farmhouses" | "Commercial" | "Hospitality";
  projectName: string;
  subProjectId: string;
  clientScope: string;
  location: string;
  caption: string;
  url: string;
  createdAt?: string;
  isCustom?: boolean;
}

export async function GET() {
  // 1. Try MySQL
  try {
    const rows: any = await query(
      "SELECT id, category, project_name AS projectName, sub_project_id AS subProjectId, client_scope AS clientScope, location, caption, image_url AS url, created_at AS createdAt FROM projects ORDER BY created_at DESC"
    );
    if (Array.isArray(rows) && rows.length > 0) {
      writeServerData("projects.json", rows);
      return NextResponse.json({ success: true, projects: rows, source: "mysql" });
    }
  } catch {
    // MySQL unavailable, proceed to file storage
  }

  // 2. Server file storage
  const projects = readServerData<ProjectRecord[]>("projects.json", []);
  return NextResponse.json({ success: true, projects, source: "file" });
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
    const newProject: ProjectRecord = {
      id: `proj-${Date.now()}`,
      category,
      projectName,
      subProjectId: subId,
      clientScope: clientScope || "Bespoke Architecture Fit-Out",
      location: location || "Delhi NCR",
      caption,
      url,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    // 1. Save to server file
    const current = readServerData<ProjectRecord[]>("projects.json", []);
    const updated = [newProject, ...current.filter((p) => p.url !== url)];
    writeServerData("projects.json", updated);

    // 2. Try MySQL sync
    try {
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
      if (result?.insertId) {
        newProject.id = result.insertId;
      }
    } catch (dbErr) {
      console.warn("MySQL project sync warning (saved to server file):", dbErr);
    }

    return NextResponse.json({
      success: true,
      project: newProject,
      id: newProject.id,
      message: "Project image recorded successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save project image" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const url = searchParams.get("url");

    if (!id && !url) {
      return NextResponse.json(
        { success: false, error: "Project ID or Image URL is required for deletion" },
        { status: 400 }
      );
    }

    // 1. Delete from server file
    const current = readServerData<ProjectRecord[]>("projects.json", []);
    const updated = current.filter(
      (p) => String(p.id) !== String(id) && (!url || p.url !== url)
    );
    writeServerData("projects.json", updated);

    // 2. Try MySQL
    try {
      if (id) {
        await query("DELETE FROM projects WHERE id = ?", [id]);
      } else if (url) {
        await query("DELETE FROM projects WHERE image_url = ?", [url]);
      }
    } catch (dbErr) {
      console.warn("MySQL project delete sync warning (deleted from server file):", dbErr);
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
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

    // 1. Update in server file
    const current = readServerData<ProjectRecord[]>("projects.json", []);
    const updated = current.map((p) => {
      if (String(p.id) === String(id) || (url && p.url === url)) {
        return {
          ...p,
          ...(category && { category }),
          ...(projectName && { projectName }),
          ...(subId && { subProjectId: subId }),
          ...(clientScope && { clientScope }),
          ...(location && { location }),
          ...(caption && { caption }),
          ...(targetUrl && { url: targetUrl }),
        };
      }
      return p;
    });
    writeServerData("projects.json", updated);

    // 2. Try MySQL
    try {
      if (id && typeof id === "number") {
        await query(
          "UPDATE projects SET category = ?, project_name = ?, sub_project_id = ?, client_scope = ?, location = ?, caption = ?, image_url = ? WHERE id = ?",
          [category, projectName, subId, clientScope || "Bespoke Turnkey Fit-Out", location || "Delhi NCR", caption, targetUrl, id]
        );
      } else if (url) {
        await query("UPDATE projects SET category = ?, project_name = ?, caption = ?, client_scope = ?, location = ? WHERE image_url = ?", [
          category,
          projectName,
          caption,
          clientScope || "Bespoke Turnkey Fit-Out",
          location || "Delhi NCR",
          url,
        ]);
      }
    } catch (dbErr) {
      console.warn("MySQL project update sync warning (updated in server file):", dbErr);
    }

    return NextResponse.json({ success: true, message: "Project updated successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}
