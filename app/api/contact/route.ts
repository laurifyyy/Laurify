import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(value: unknown, maxLength = 500): string {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, "") // strip angle brackets (XSS)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ""); // strip control chars
}

function isValidContact(value: string): boolean {
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRe = /^[+\d][\d\s\-().]{6,19}$/;
  return emailRe.test(value) || phoneRe.test(value);
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Nepareizs pieprasījums" }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  const name = sanitize(raw.firstName, 120);
  const contact = sanitize(raw.email || raw.phone, 200);
  const message = sanitize(raw.notes, 2000);

  if (!name || !contact || !message) {
    return NextResponse.json({ error: "Aizpildi visus laukus" }, { status: 400 });
  }

  if (!isValidContact(contact)) {
    return NextResponse.json({ error: "Nepareizs kontakts" }, { status: 400 });
  }

  const isEmail = contact.includes("@");
  const sentAt = new Date().toLocaleString("lv-LV", {
    timeZone: "Europe/Riga",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  try {
    await resend.emails.send({
      from: "Laurify <onboarding@resend.dev>",
      to: "beauty@laurify.lv",
      ...(isEmail ? { replyTo: contact } : {}),
      subject: `Jauns ziņojums no ${name} · ${sentAt}`,
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
          <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#E3D4BE;opacity:0.7;margin-bottom:8px;">Jauns ziņojums</div>
          <div style="font-family:Georgia,serif;font-size:22px;color:#F5F4E4;font-weight:400;font-style:italic;">Sveiki, tev rakstīja</div>
        </td></tr>

        <!-- BODY -->
        <tr><td style="background:#ffffff;padding:40px 48px;">

          <!-- Sender name -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-bottom:24px;border-bottom:1px solid #E3D4BE;">
                <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#605952;margin-bottom:6px;">Sūtītājs</div>
                <div style="font-size:22px;color:#0A1F48;font-family:Georgia,serif;font-weight:400;">${name}</div>
              </td>
            </tr>
          </table>

          <!-- Contact -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
            <tr>
              <td style="padding:14px 0;border-bottom:1px solid #f0ede4;vertical-align:top;width:130px;">
                <span style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#605952;">${isEmail ? "E-pasts" : "Tālrunis"}</span>
              </td>
              <td style="padding:14px 0;border-bottom:1px solid #f0ede4;vertical-align:top;">
                ${isEmail
                  ? `<a href="mailto:${contact}" style="color:#0A1F48;text-decoration:none;font-size:15px;">${contact}</a>`
                  : `<a href="tel:${contact}" style="color:#0A1F48;text-decoration:none;font-size:15px;">${contact}</a>`
                }
              </td>
            </tr>
          </table>

          <!-- Message -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
            <tr>
              <td>
                <div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#605952;margin-bottom:12px;">Ziņojums</div>
                <div style="font-size:15px;color:#0A1F48;line-height:1.8;white-space:pre-wrap;padding:20px 24px;background:#F9F8F4;border-left:3px solid #E3D4BE;border-radius:4px;">${message}</div>
              </td>
            </tr>
          </table>

          <!-- Reply hint -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
            <tr>
              <td style="background:#F5F4E4;padding:16px 20px;border-radius:6px;">
                <div style="font-size:12px;color:#605952;line-height:1.7;">
                  ${isEmail
                    ? `Atbildi tieši uz šo e-pastu, lai sazinātos ar klientu —<br><strong style="color:#0A1F48;">${contact}</strong>`
                    : `Sazinies ar klientu pa tālruni —<br><strong style="color:#0A1F48;">${contact}</strong>`
                  }
                </div>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#0A1F48;padding:24px 48px;text-align:center;">
          <div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(245,244,228,0.4);">
            Saņemts ${sentAt} &nbsp;·&nbsp; <a href="https://laurify.lv" style="color:rgba(245,244,228,0.4);text-decoration:none;">laurify.lv</a>
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Neizdevās nosūtīt e-pastu" }, { status: 500 });
  }
}
