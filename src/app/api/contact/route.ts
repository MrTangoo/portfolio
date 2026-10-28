import nodemailer from "nodemailer";

const MAX_NAME = 100;
const MAX_SUBJECT = 150;
const MAX_MESSAGE = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  /** Honeypot — must stay empty. */
  hp?: string;
  /** Time between form mount and submit — bots are instant. */
  elapsedMs?: number;
}

function sanitize(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

const mono =
  "font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; letter-spacing: 0.13em; text-transform: uppercase;";

/** Template HTML du mail reçu — reprend le langage visuel du site. */
export function buildEmailHtml(
  name: string,
  email: string,
  subject: string,
  message: string,
): string {
  const field = (label: string, value: string) => `
    <tr>
      <td style="padding: 10px 0; vertical-align: top; width: 90px; ${mono} color: #9a9a9a;">
        ${label}
      </td>
      <td style="padding: 10px 0; font-size: 15px; color: #111111;">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="fr">
  <body style="margin: 0; padding: 24px; background: #ebe9e3;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 560px; margin: 0 auto; background: #f5f4f0; border: 1px solid rgba(17,17,17,0.14); font-family: ui-sans-serif, system-ui, sans-serif;">
      <tr>
        <td style="background: #111111; padding: 20px 28px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td style="font-size: 22px; font-weight: 600; letter-spacing: -0.04em; color: #f5f4f0;">
                MD<span style="color: #e34234;">.</span>
              </td>
              <td align="right" style="${mono} color: rgba(245,244,240,0.65);">
                Contact — Formulaire
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 24px 28px 4px;">
          <p style="margin: 0 0 14px; ${mono} color: #626262;">
            <span style="display: inline-block; width: 8px; height: 8px; background: #e34234; margin-right: 10px;"></span>Nouveau message
          </p>
          <p style="margin: 0; font-size: 26px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; color: #111111;">
            ${escapeHtml(name)}
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 28px 8px;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-top: 1px solid rgba(17,17,17,0.14);">
            ${field("Email", `<a href="mailto:${escapeHtml(email)}" style="color: #c9372b; text-decoration: none;">${escapeHtml(email)}</a>`)}
            ${subject ? field("Sujet", escapeHtml(subject)) : ""}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 28px 28px;">
          <p style="margin: 0 0 8px; ${mono} color: #9a9a9a;">
            Message
          </p>
          <div style="border-left: 2px solid #e34234; padding: 4px 0 4px 16px; font-size: 15px; line-height: 1.6; color: #111111; white-space: pre-wrap;">${escapeHtml(message)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding: 14px 28px; border-top: 1px solid rgba(17,17,17,0.14); ${mono} color: #9a9a9a;">
          <a href="https://maxime-derbigny.ch" style="color: #626262; text-decoration: none;">maxime-derbigny.ch</a>
          &nbsp;·&nbsp; Réponds directement à ce mail pour écrire à ${escapeHtml(name)}.
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot filled or instant submit → silently pretend success.
  if (body.hp) {
    console.warn("[contact] Honeypot déclenché — envoi ignoré");
    return Response.json({ ok: true });
  }
  if (typeof body.elapsedMs !== "number" || body.elapsedMs < 1500) {
    console.warn(`[contact] Soumission suspecte (elapsedMs=${body.elapsedMs}) — envoi ignoré`);
    return Response.json({ ok: true });
  }

  const name = sanitize(body.name, MAX_NAME);
  const email = sanitize(body.email, MAX_NAME);
  const subject = sanitize(body.subject, MAX_SUBJECT);
  const message = sanitize(body.message, MAX_MESSAGE);

  if (!name || !EMAIL_PATTERN.test(email) || message.length < 10) {
    return Response.json(
      { ok: false, error: "Merci de vérifier les champs du formulaire." },
      { status: 400 },
    );
  }

  const { SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP_USER / SMTP_PASS manquants");
    return Response.json(
      { ok: false, error: "Le service d'envoi n'est pas configuré." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS.replaceAll(" ", "") },
  });

  const headerName = name.replaceAll(/["\r\n]/g, " ");

  try {
    await transporter.sendMail({
      from: `"Portfolio — ${headerName}" <${SMTP_USER}>`,
      to: CONTACT_EMAIL || SMTP_USER,
      replyTo: email,
      subject: subject
        ? `[Portfolio] ${subject.replaceAll(/[\r\n]/g, " ")}`
        : `[Portfolio] Message de ${headerName}`,
      text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
      html: buildEmailHtml(name, email, subject, message),
    });
    console.info(`[contact] Message envoyé de ${name} <${email}>`);
  } catch (error) {
    console.error("[contact] Échec d'envoi SMTP :", error);
    return Response.json(
      { ok: false, error: "L'envoi a échoué. Réessaie dans un instant." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
