import nodemailer from "nodemailer";
import { CONTACT_LIMITS, EMAIL_PATTERN } from "@/lib/contact";
import { buildEmailHtml } from "@/lib/contact-email";

// Enough for escaped Unicode in all fields, without buffering arbitrary bodies.
const MAX_BODY_BYTES = 64 * 1024;
const SMTP_TIMEOUT_MS = 10_000;

function readText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length <= max ? text : null;
}

async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError("Contact payload too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ ok: false, error: "invalid" }, { status: 403 });
  }
  if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") {
    return Response.json({ ok: false, error: "invalid" }, { status: 415 });
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "invalid" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await readBody(request);
  } catch (error) {
    return Response.json(
      { ok: false, error: "invalid" },
      {
        status: error instanceof RangeError ? 413 : 400,
      },
    );
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const fields = body as Record<string, unknown>;

  // Honeypot filled or instant submit: acknowledge without sending email.
  if (fields.hp || (typeof fields.elapsedMs === "number" && fields.elapsedMs < 1500)) {
    return Response.json({ ok: true });
  }
  if (typeof fields.elapsedMs !== "number" || !Number.isFinite(fields.elapsedMs)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const name = readText(fields.name, CONTACT_LIMITS.name);
  const email = readText(fields.email, CONTACT_LIMITS.email);
  const subject = readText(fields.subject ?? "", CONTACT_LIMITS.subject);
  const message = readText(fields.message, CONTACT_LIMITS.message);
  if (
    !name ||
    !email ||
    !EMAIL_PATTERN.test(email) ||
    subject === null ||
    !message ||
    message.length < CONTACT_LIMITS.minMessage
  ) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP configuration is missing");
    return Response.json({ ok: false, error: "unconfigured" }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS.replaceAll(" ", "") },
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  });
  const headerName = name.replaceAll(/[\r\n]/g, " ");

  try {
    await transporter.sendMail({
      from: { name: `Portfolio - ${headerName}`, address: SMTP_USER },
      to: CONTACT_EMAIL || SMTP_USER,
      replyTo: { name: headerName, address: email },
      subject: subject
        ? `[Portfolio] ${subject.replaceAll(/[\r\n]/g, " ")}`
        : `[Portfolio] Message de ${headerName}`,
      text: `Nom : ${name}\nEmail : ${email}\nSujet : ${subject}\n\n${message}`,
      html: buildEmailHtml(name, email, subject, message),
    });
  } catch {
    console.error("[contact] SMTP delivery failed");
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
