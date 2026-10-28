import nodemailer from "nodemailer";
import { SITE } from "./site";

export interface InquiryEmailPayload {
  name: string;
  email: string;
  phone: string;
  location: string;
  message?: string;
  category?: string;
}

export async function sendInquiryNotification(payload: InquiryEmailPayload) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  const toEmail = process.env.CONTACT_RECEIVER_EMAIL || SITE.email || "info@ssinteriors.in";
  const fromEmail = process.env.SMTP_FROM || user || `SS Interiors Inquiry <${SITE.email}>`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #faf8f5; border: 1px solid #dcd7ce; border-radius: 8px; overflow: hidden;">
      <div style="background: #1c1b18; padding: 24px; text-align: center; border-bottom: 2px solid #c5a059;">
        <h2 style="color: #c5a059; margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">SS Interiors</h2>
        <p style="color: #ffffff; opacity: 0.7; margin: 6px 0 0 0; font-size: 12px; letter-spacing: 1px;">NEW CLIENT INQUIRY CAPTURED</p>
      </div>
      
      <div style="padding: 24px; background: #ffffff;">
        <p style="font-size: 14px; color: #444; line-height: 1.6; margin-top: 0;">
          A visitor has submitted their consultation and property requirements through the <strong>SS Interiors Website Assistant</strong>:
        </p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f0ede8;">
            <td style="padding: 10px 0; font-weight: bold; color: #222; width: 140px;">Client Name:</td>
            <td style="padding: 10px 0; color: #333;">${payload.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede8;">
            <td style="padding: 10px 0; font-weight: bold; color: #222;">Email Address:</td>
            <td style="padding: 10px 0; color: #c5a059; font-weight: bold;">
              <a href="mailto:${payload.email}" style="color: #9f7830; text-decoration: none;">${payload.email}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede8;">
            <td style="padding: 10px 0; font-weight: bold; color: #222;">Phone Number:</td>
            <td style="padding: 10px 0; color: #333;">
              <a href="tel:${payload.phone}" style="color: #333; text-decoration: none;">${payload.phone}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f0ede8;">
            <td style="padding: 10px 0; font-weight: bold; color: #222;">Property Location:</td>
            <td style="padding: 10px 0; color: #333;">${payload.location}</td>
          </tr>
          ${payload.category ? `
          <tr style="border-bottom: 1px solid #f0ede8;">
            <td style="padding: 10px 0; font-weight: bold; color: #222;">Category / Nature:</td>
            <td style="padding: 10px 0; color: #333;">${payload.category}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #222; vertical-align: top;">Project Scope / Query:</td>
            <td style="padding: 10px 0; color: #555; line-height: 1.5;">${payload.message || "Consultation requested."}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; text-align: center;">
          <a href="mailto:${payload.email}?subject=Regarding%20Your%20Interior%20Inquiry%20-%20SS%20Interiors" 
             style="display: inline-block; background: #c5a059; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px; letter-spacing: 1px;">
            Reply to ${payload.name}
          </a>
        </div>
      </div>

      <div style="background: #f4f0e8; padding: 16px; text-align: center; font-size: 11px; color: #888;">
        SS Interiors • Building CL-2, Huda Market, 3rd Floor - JMV Tower, Sector 28, Gurugram • Since 2016
      </div>
    </div>
  `;

  // If SMTP is configured, send the real email
  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      const info = await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        replyTo: payload.email,
        subject: `[New Inquiry] ${payload.name} - ${payload.location}`,
        html: htmlContent,
      });

      return { sent: true, messageId: info.messageId };
    } catch (err) {
      console.warn("SMTP email dispatch warning:", err);
      return { sent: false, error: err };
    }
  }

  // If SMTP not yet configured, log cleanly
  console.log(`[Inquiry Logged for ${toEmail}]:`, payload);
  return { sent: false, logged: true, note: "Configure SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local to send live emails" };
}
