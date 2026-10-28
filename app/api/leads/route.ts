import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { readServerData, writeServerData } from "@/lib/serverStorage";
import { sendInquiryNotification } from "@/lib/mailer";

export const dynamic = "force-dynamic";

interface LeadRecord {
  id: string | number;
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
  status: "New" | "Contacted" | "In Discussion" | "Closed";
  createdAt: string;
}

const DEFAULT_SAMPLE_LEADS: LeadRecord[] = [
  {
    id: 1,
    name: "Vikram Malhotra",
    phone: "+91 98112 34567",
    email: "vikram.m@corporatemail.com",
    category: "Luxury Apartment / Penthouse",
    message: "Looking for complete turnkey interior fit-out for a 7,500 sq.ft duplex penthouse at DLF Camellias, Golf Course Road.",
    createdAt: "2026-10-12T11:30:00.000Z",
    status: "New",
  },
  {
    id: 2,
    name: "Col. Rajesh & Sunita Ahluwalia",
    phone: "+91 98710 98765",
    email: "rajesh.ahluwalia@gmail.com",
    category: "Country Estate / Farmhouse",
    message: "Planning a 2.5 acre private farmhouse retreat in Chhatarpur. Interested in double-height living hall and natural stone architecture.",
    createdAt: "2026-10-10T15:45:00.000Z",
    status: "In Discussion",
  },
  {
    id: 3,
    name: "Sunil Singhania (MD)",
    phone: "+91 99990 12345",
    email: "singhania@apexcapital.in",
    category: "Corporate & Commercial Headquarters",
    message: "14,000 sq.ft corporate headquarters turnkey fitout at DLF Cyber City. Need boardrooms, agile zones and executive suites.",
    createdAt: "2026-10-08T09:15:00.000Z",
    status: "Contacted",
  },
];

export async function GET() {
  try {
    const rows = await query(
      "SELECT id, name, phone, email, category, message, status, created_at AS createdAt FROM leads ORDER BY created_at DESC"
    );
    if (Array.isArray(rows) && rows.length > 0) {
      writeServerData("leads.json", rows);
      return NextResponse.json({ success: true, leads: rows, source: "mysql" });
    }
  } catch {
    // MySQL unavailable, proceed to file storage
  }

  const leads = readServerData<LeadRecord[]>("leads.json", DEFAULT_SAMPLE_LEADS);
  return NextResponse.json({ success: true, leads, source: "file" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, category, message, location } = body;

    if (!name && !email && !phone) {
      return NextResponse.json(
        { success: false, error: "Contact details are required" },
        { status: 400 }
      );
    }

    const newLead: LeadRecord = {
      id: Date.now(),
      name: name || "Website Visitor",
      phone: phone || "-",
      email: email || "",
      category: category || "General Inquiry",
      message: message || (location ? `Property Location: ${location}` : ""),
      status: "New",
      createdAt: new Date().toISOString(),
    };

    // 1. Save to server file
    const currentLeads = readServerData<LeadRecord[]>("leads.json", DEFAULT_SAMPLE_LEADS);
    const updatedLeads = [newLead, ...currentLeads];
    writeServerData("leads.json", updatedLeads);

    // 2. Try MySQL sync
    try {
      const result: any = await query(
        "INSERT INTO leads (name, phone, email, category, message, status) VALUES (?, ?, ?, ?, ?, 'New')",
        [newLead.name, newLead.phone, newLead.email, newLead.category, newLead.message]
      );
      if (result?.insertId) {
        newLead.id = result.insertId;
      }
    } catch (dbErr) {
      console.warn("MySQL lead sync warning (saved to server file):", dbErr);
    }

    // 3. Dispatch notification email to info@ssinteriors.in (async)
    sendInquiryNotification({
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      location: location || "Not specified",
      category: newLead.category,
      message: newLead.message,
    }).catch((err: any) => console.warn("Inquiry email notification error:", err));

    return NextResponse.json({
      success: true,
      lead: newLead,
      message: "Client inquiry recorded and forwarded to design leadership successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to record inquiry" },
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

    // 1. Update in server file
    const currentLeads = readServerData<LeadRecord[]>("leads.json", DEFAULT_SAMPLE_LEADS);
    const updatedLeads = currentLeads.map((l) =>
      String(l.id) === String(id) ? { ...l, status } : l
    );
    writeServerData("leads.json", updatedLeads);

    // 2. Try MySQL
    try {
      await query("UPDATE leads SET status = ? WHERE id = ?", [status, id]);
    } catch (dbErr) {
      console.warn("MySQL status sync warning (updated in server file):", dbErr);
    }

    return NextResponse.json({ success: true, message: "Lead status updated successfully" });
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

    // 1. Delete from server file
    const currentLeads = readServerData<LeadRecord[]>("leads.json", DEFAULT_SAMPLE_LEADS);
    const updatedLeads = currentLeads.filter((l) => String(l.id) !== String(id));
    writeServerData("leads.json", updatedLeads);

    // 2. Try MySQL
    try {
      await query("DELETE FROM leads WHERE id = ?", [id]);
    } catch (dbErr) {
      console.warn("MySQL delete sync warning (deleted from server file):", dbErr);
    }

    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete lead" },
      { status: 500 }
    );
  }
}
