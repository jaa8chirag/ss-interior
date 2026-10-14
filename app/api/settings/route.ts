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
}

const DEFAULT_SETTINGS: SiteSettingsData = {
  instagram: SITE.instagram || "https://instagram.com/ssinteriors",
  facebook: SITE.facebook || "https://facebook.com/ssinteriors",
  linkedin: SITE.linkedin || "https://linkedin.com/company/ss-interiors",
  youtube: SITE.youtube || "https://youtube.com/@ssinteriors",
  whatsapp: SITE.whatsapp || "+91 9205784061",
  pinterest: SITE.pinterest || "https://pinterest.com/ssinteriors",
  phone: SITE.phone || "+91 9205784061",
  altPhone: SITE.altPhone || "+91 9891800510",
  email: SITE.email || "info@ssinteriors.in",
  address: SITE.address || "DLF Cross Point, 5th Floor, DLF City Phase IV, Sector 28, Gurgaon, Delhi NCR, 122002 India",
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
