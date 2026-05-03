import { NextResponse } from "next/server";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  volume?: string;
  selectValue?: string;
  selectLabel?: string;
  message?: string;
  pageContext?: string;
  pageUrl?: string;
  locale?: string;
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (message.length > 8000 || name.length > 200) {
    return NextResponse.json({ error: "Field too long" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_RECIPIENT_EMAIL || "info@jinhaoxy.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Jinhao Xinyuan Website <noreply@jinhaoxy.com>";
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY");
    return NextResponse.json({ error: "Server is not configured" }, { status: 500 });
  }

  const pageContext = (body.pageContext || "Contact").trim();
  const subject = `[jinhaoxy.com] ${pageContext} — ${name}`;

  const rows: Array<[string, string | undefined]> = [
    ["Name", name],
    ["Email", email],
    ["Company", body.company?.trim()],
    ["Volume / Quantity", body.volume?.trim()],
    [body.selectLabel?.trim() || "Selection", body.selectValue?.trim()],
    ["Page", body.pageContext?.trim()],
    ["URL", body.pageUrl?.trim()],
    ["Locale", body.locale?.trim()],
  ];

  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 640px; color: #111;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">New inquiry from jinhaoxy.com</h2>
      <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding: 6px 12px 6px 0; vertical-align: top; color: #555; width: 140px; white-space: nowrap;"><strong>${escapeHtml(
              k,
            )}</strong></td>
            <td style="padding: 6px 0; vertical-align: top;">${escapeHtml(v as string)}</td>
          </tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin: 24px 0 8px; font-size: 14px; color: #555;">Message</h3>
      <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${escapeHtml(
        message,
      )}</div>
      <p style="color: #999; font-size: 12px; margin-top: 24px;">Sent via the jinhaoxy.com contact form.</p>
    </div>
  `;

  const textRows = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject,
        html,
        text: `New inquiry from jinhaoxy.com\n\n${textRows}\n\nMessage:\n${message}\n`,
      }),
    });

    const data = (await res.json().catch(() => null)) as { id?: string; message?: string } | null;

    if (!res.ok) {
      console.error("Resend error:", res.status, data);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("Resend exception:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
  }
}
