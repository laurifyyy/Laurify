import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, phone, service, notes } =
    await request.json();

  try {
    await resend.emails.send({
      from: "Laurify <onboarding@resend.dev>",
      to: "beauty@laurify.lv",
      replyTo: email,
      subject: `Rezervācijas pieprasījums — ${service || "Nav norādīts"} · ${new Date().toLocaleString("lv-LV", { timeZone: "Europe/Riga", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 2rem; color: #0A1F48;">
          <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid #E3D4BE; padding-bottom: 1rem;">
            Jauns rezervācijas pieprasījums
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 0.6rem 0; color: #605952; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; width: 140px;">Vārds</td><td style="padding: 0.6rem 0;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 0.6rem 0; color: #605952; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">E-pasts</td><td style="padding: 0.6rem 0;"><a href="mailto:${email}" style="color: #0A1F48;">${email}</a></td></tr>
            <tr><td style="padding: 0.6rem 0; color: #605952; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Tālrunis</td><td style="padding: 0.6rem 0;">${phone || "—"}</td></tr>
            <tr><td style="padding: 0.6rem 0; color: #605952; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em;">Pakalpojums</td><td style="padding: 0.6rem 0;">${service || "—"}</td></tr>
            <tr><td style="padding: 0.6rem 0; color: #605952; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Piezīmes</td><td style="padding: 0.6rem 0;">${notes || "—"}</td></tr>
          </table>
          <p style="margin-top: 2rem; font-size: 0.8rem; color: #a09890;">Šis e-pasts tika nosūtīts no laurify.lv kontaktu formas.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Neizdevās nosūtīt e-pastu" },
      { status: 500 }
    );
  }
}
