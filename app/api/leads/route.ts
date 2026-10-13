import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await query(
      "SELECT id, name, phone, email, category, message, status, created_at AS createdAt FROM leads ORDER BY created_at DESC"
    );
    return NextResponse.json({ success: true, leads: rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch leads from MySQL database" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, category, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone are required fields" },
        { status: 400 }
      );
    }

    const result: any = await query(
      "INSERT INTO leads (name, phone, email, category, message, status) VALUES (?, ?, ?, ?, ?, 'New')",
      [name, phone, email || "", category || "General", message || ""]
    );

    return NextResponse.json({
      success: true,
      id: result?.insertId,
      message: "Lead recorded in MySQL database successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to save lead in MySQL database" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Lead ID and Status are required" },
        { status: 400 }
      );
    }

    await query("UPDATE leads SET status = ? WHERE id = ?", [status, id]);
    return NextResponse.json({ success: true, message: "Lead status updated in MySQL database" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update lead status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Lead ID is required for deletion" },
        { status: 400 }
      );
    }

    await query("DELETE FROM leads WHERE id = ?", [id]);
    return NextResponse.json({ success: true, message: "Lead deleted from MySQL database" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete lead" },
      { status: 500 }
    );
  }
}
