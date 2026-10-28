import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { readServerData, writeServerData } from "@/lib/serverStorage";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

export interface SiteSettingsData {
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  whatsapp: string;
  pinterest?: string;
  phone: string;
  altPhone?: string;
  email: string;
  address: string;
  mapUrl?: string;
}

const DEFAULT_SETTINGS: SiteSettingsData = {
  instagram: SITE.instagram || "https://www.instagram.com/ssinteriorsbyvishan?xtok=Nm9ybTgxbnoxNWp0",
  facebook: SITE.facebook || "https://www.facebook.com/ssinteriorss",
  linkedin: "",
  youtube: "",
  whatsapp: SITE.whatsapp || "+91 9205784061",
  pinterest: "",
  phone: SITE.phone || "+91 9205784061",
  altPhone: SITE.altPhone || "+91 9891800510",
  email: SITE.email || "info@ssinteriors.in",
  address: SITE.address || "Building CL-2, Huda market, 3rd Floor - JMV tower, Sector 28, Gurugram, Haryana 122009",
  mapUrl: (SITE as any).mapUrl || "https://www.google.com/maps/place/SS+Interiors+By+Vishan+Gautam/@28.4724778,77.0870977,17z/data=!4m10!1m2!2m1!1sBuilding+CL-2,+Huda+Market,+Sector+28,+Chakkarpur,+Gurugram,+Haryana+122009!3m6!1s0x390d192fc53b6915:0x8548f8a7c6a7ca35!8m2!3d28.4692894!4d77.0905569!15sCktCdWlsZGluZyBDTC0yLCBIdWRhIE1hcmtldCwgU2VjdG9yIDI4LCBDaGFra2FycHVyLCBHdXJ1Z3JhbSwgSGFyeWFuYSAxMjIwMDmSASBpbnRlcmlvcl9jb25zdHJ1Y3Rpb25fY29udHJhY3RvcuABAA!16s%2Fg%2F11z38zx3x6?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D",
};

export async function GET() {
  // 1. Try MySQL
  try {
    const rows: any = await query("SELECT setting_key, setting_value FROM site_settings");
    if (Array.isArray(rows) && rows.length > 0) {
      const dbSettings: any = { ...DEFAULT_SETTINGS };
      rows.forEach((r) => {
        dbSettings[r.setting_key] = r.setting_value;
      });
      // Sync to server storage file as cache
      writeServerData("settings.json", dbSettings);
      return NextResponse.json({ success: true, settings: dbSettings, source: "mysql" });
    }
  } catch {
    // MySQL not reachable, proceed to server file fallback
  }

  // 2. Server file fallback
  const saved = readServerData<SiteSettingsData>("settings.json", DEFAULT_SETTINGS);
  return NextResponse.json({ success: true, settings: { ...DEFAULT_SETTINGS, ...saved }, source: "file" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const current = readServerData<SiteSettingsData>("settings.json", DEFAULT_SETTINGS);
    const updated: SiteSettingsData = {
      ...current,
      ...body,
    };

    // 1. Write to server file
    writeServerData("settings.json", updated);

    // 2. Try MySQL sync if reachable
    try {
      await query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          setting_key VARCHAR(100) PRIMARY KEY,
          setting_value TEXT NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      for (const [key, value] of Object.entries(updated)) {
        if (value !== undefined) {
          await query(
            "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
            [key, String(value), String(value)]
          );
        }
      }
    } catch (dbErr) {
      console.warn("MySQL settings sync warning (saved to file successfully):", dbErr);
    }

    return NextResponse.json({
      success: true,
      settings: updated,
      message: "Site settings & social media links updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
