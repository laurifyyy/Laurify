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
<!DOCTYPE html>
<html lang="lv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ede4;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ede4;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr><td style="background:#0A1F48;padding:40px 48px 32px;text-align:center;">
          <div style="font-family:Georgia,serif;font-size:28px;letter-spacing:10px;color:#F5F4E4;font-weight:400;">LAURIFY</div>
          <div style="width:40px;height:1px;background:#E3D4BE;margin:16px auto 0;opacity:0.5;"></div>
        </td></tr>

        <!-- BANNER -->
        <tr><td style="background:#0D2454;padding:24px 48px 28px;text-align:center;">
          <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#E3D4BE;opacity:0.7;margin-bottom:8px;">Jauns pieprasījums</div>
          <div style="font-family:Georgia,serif;font-size:22px;color:#F5F4E4;font-weight:400;">Rezervācijas pieprasījums</div>
        </td></tr>

        <!-- BODY -->
        <tr><td style="background:#ffffff;padding:40px 48px;">

          <!-- Client info -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td colspan="2" style="padding-bottom:24px;border-bottom:1px solid #E3D4BE;">
                <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#605952;margin-bottom:6px;">Klients</div>
                <div style="font-size:20px;color:#0A1F48;font-weight:400;">${firstName} ${lastName}</div>
              </td>
            </tr>
          </table>

          <!-- Details -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
            ${[
              ["E-pasts", `<a href="mailto:${email}" style="color:#0A1F48;text-decoration:none;">${email}</a>`],
              ["Tālrunis", `<a href="tel:${phone}" style="color:#0A1F48;text-decoration:none;">${phone || "—"}</a>`],
              ["Pakalpojums", service || "—"],
              ["Piezīmes", notes || "—"],
            ].map(([label, value]) => `
            <tr>
              <td style="padding:14px 0;border-bottom:1px solid #f0ede4;vertical-align:top;width:130px;">
                <span style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#605952;">${label}</span>
              </td>
              <td style="padding:14px 0;border-bottom:1px solid #f0ede4;vertical-align:top;">
                <span style="font-size:15px;color:#0A1F48;line-height:1.5;">${value}</span>
              </td>
            </tr>`).join("")}
          </table>

          <!-- CTA hint -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
            <tr>
              <td style="background:#F5F4E4;padding:20px 24px;border-left:3px solid #E3D4BE;">
                <div style="font-size:12px;color:#605952;line-height:1.7;">
                  Atbildi tieši uz šo e-pastu, lai sazinātos ar klientu —<br>
                  <strong style="color:#0A1F48;">${email}</strong>
                </div>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#0A1F48;padding:24px 48px;text-align:center;">
          <div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(245,244,228,0.4);">
            Nosūtīts no <a href="https://laurify.lv" style="color:rgba(245,244,228,0.4);text-decoration:none;">laurify.lv</a> kontaktu formas
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
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
