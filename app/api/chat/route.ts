import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

const SYSTEM_INSTRUCTION = `
You are the AI Design Consultant for "SS Interiors", a prestigious architectural and interior design firm in Gurugram & Delhi NCR founded by Vishan Kumar Gautam (since 2016).
Studio Location: ${SITE.address}.
Google Maps Link: ${SITE.mapUrl}
Official Email: ${SITE.email}

DIRECT PAGE LINKS TO SHARE:
- Corporate & Commercial Offices: [View Corporate Projects](/services#commercial)
- Luxury Residential & Penthouses: [View Luxury Residences](/services#residential)
- Country Estates & Farmhouses: [View Country Estates](/services#farmhouses)
- Hospitality & Turnkey: [View Hospitality Projects](/services#hospitality)
- Bespoke Furniture & Lighting: [Explore Product Sourcing](/product-sourcing)

CRITICAL RULES:
1. KEEP RESPONSES SHORT & CRISP: Maximum 2 to 3 brief sentences.
2. ALWAYS provide the relevant clickable link above when the user asks about corporate, residential, farmhouses, furniture, or projects so they can view the photos.
3. DO NOT share raw phone numbers, DO NOT suggest calling, and DO NOT mention WhatsApp.
4. If the user asks about contact, studio location, address, office visit, meeting, or how to get in touch, ALWAYS end your response with: [ACTION:CONTACT_CARD]
5. DO NOT PUSH FOR EMAIL IN EARLY MESSAGES: First answer their questions thoroughly and helpfully with relevant links, and ask a relevant design follow-up (like area size, aesthetic preference, or location).
6. WHEN TO ASK FOR EMAIL: ONLY ask for their Email ID when the user explicitly asks for a quotation, pricing BOQ, catalogue, proposal, or after they have asked several detailed questions and seem ready to proceed.
7. When the user shares their email, confirm warmly that the team will email them the requested details.
`;

// Built-in intelligent fallback for instant, offline answers
function getFallbackResponse(userMessage: string): string {
  const q = userMessage.toLowerCase();

  if (
    q.includes("contact") ||
    q.includes("location") ||
    q.includes("address") ||
    q.includes("where") ||
    q.includes("kahan") ||
    q.includes("kaha") ||
    q.includes("office") ||
    q.includes("visit") ||
    q.includes("milna") ||
    q.includes("sampark") ||
    q.includes("phone") ||
    q.includes("call")
  ) {
    return `Our studio is located at **${SITE.address}**.\n\nYou can view our exact studio location on Google Maps or fill your details for our senior design team to contact you.\n[ACTION:CONTACT_CARD]`;
  }

  if (q.includes("corporate") || q.includes("office") || q.includes("commercial")) {
    return `We deliver turnkey corporate headquarters, boardrooms, and executive workspaces.\n\nYou can explore our corporate projects here: [View Corporate Projects](/services#commercial)\n\nWhat kind of office space or area are you planning?`;
  }

  if (q.includes("residential") || q.includes("penthouse") || q.includes("apartment") || q.includes("camellias") || q.includes("magnolias")) {
    return `We specialize in super-luxury penthouses and residences across DLF Camellias and Magnolias with bespoke Italian marble and fine millwork.\n\nExplore our residences here: [View Luxury Residences](/services#residential)\n\nWhich society or locality is your property in?`;
  }

  if (q.includes("farmhouse") || q.includes("estate") || q.includes("aralias")) {
    return `We craft expansive country estates and countryside villas with natural stone, double-height spaces, and Vastu alignment.\n\nTake a look here: [View Country Estates](/services#farmhouses)\n\nAre you planning a retreat in Gurgaon or Delhi NCR?`;
  }

  if (q.includes("price") || q.includes("cost") || q.includes("budget") || q.includes("rate") || q.includes("kharcha") || q.includes("kitna")) {
    return `Turnkey projects are estimated via a transparent itemized BOQ based on carpet area and luxury specifications (marble, joinery, automation).\n\nWhat is your approximate carpet area in sq. ft.?`;
  }

  if (q.includes("furniture") || q.includes("sourcing") || q.includes("yura")) {
    return `We curate and import bespoke Italian leather sofas, statuary marble tables, and Murano lighting.\n\nExplore our sourcing here: [Explore Product Sourcing](/product-sourcing)\n\nAre you looking for complete home furnishings or statement pieces?`;
  }

  if (q.includes("email") || q.includes("mail")) {
    return `You can reach our design team directly at ✉️ **${SITE.email}**.\n\nFeel free to share your requirements and **Email ID**, and our team will get back to you promptly.`;
  }

  return `Welcome to **SS Interiors**! We specialize in luxury residential, corporate offices, and country estates since 2016.\n\nHow can I help you with your project vision today?`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userMessage = String(body.message || "").trim();
    const conversationHistory: Array<{ role: "user" | "model"; text: string }> = Array.isArray(body.history)
      ? body.history
      : [];

    if (!userMessage) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // 1. If Gemini API Key is configured, call Gemini API
    if (apiKey) {
      try {
        const contents: any[] = [];

        // Add previous conversation history for multi-turn context (last 6 messages max)
        conversationHistory.slice(-6).forEach((h) => {
          contents.push({
            role: h.role === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          });
        });

        // Add current user prompt
        contents.push({
          role: "user",
          parts: [{ text: userMessage }],
        });

        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

        const geminiRes = await fetch(geminiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }],
            },
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 250,
            },
          }),
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
            getFallbackResponse(userMessage);

          return NextResponse.json({
            success: true,
            reply,
            source: "gemini-ai",
          });
        } else {
          const errText = await geminiRes.text();
          console.warn("Gemini API returned error, switching to built-in knowledge engine:", errText);
        }
      } catch (geminiErr) {
        console.warn("Gemini fetch failed, falling back to local engine:", geminiErr);
      }
    }

    // 2. Fallback to built-in intelligent knowledge engine
    const fallbackReply = getFallbackResponse(userMessage);
    return NextResponse.json({
      success: true,
      reply: fallbackReply,
      source: "knowledge-engine",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process message" },
      { status: 500 }
    );
  }
}
