// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";
import { buildEmailHtml } from "@/lib/contact-email";

const { sendMail, createTransport } = vi.hoisted(() => ({
  sendMail: vi.fn(),
  createTransport: vi.fn(),
}));
vi.mock("nodemailer", () => ({ default: { createTransport } }));

const payload = {
  name: "Maxime",
  email: "visitor@example.com",
  subject: "Contact",
  message: "Bonjour, voici mon message.",
  elapsedMs: 2000,
};
function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://portfolio.test/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("SMTP_USER", "sender@example.com");
  vi.stubEnv("SMTP_PASS", "test password");
  vi.stubEnv("CONTACT_EMAIL", "recipient@example.com");
  createTransport.mockReturnValue({ sendMail });
  sendMail.mockResolvedValue({});
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("contact API", () => {
  it.each([
    null,
    [],
    "text",
    42,
    {},
    { ...payload, name: 12 },
    { ...payload, email: 'a"onclick="alert(1)@example.com' },
    { ...payload, email: "one@example.com,two@example.com" },
    { ...payload, message: "short" },
    { ...payload, name: "x".repeat(101) },
    { ...payload, subject: "x".repeat(151) },
    { ...payload, message: "x".repeat(5001) },
    { ...payload, elapsedMs: null },
  ])("rejects malformed or invalid payloads (%#)", async (body) => {
    expect((await POST(request(body))).status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(
      new Request("https://portfolio.test/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{",
      }),
    );
    expect(response.status).toBe(400);
  });

  it("bounds the actual body even without Content-Length", async () => {
    expect((await POST(request({ message: "x".repeat(70_000) }))).status).toBe(413);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("rejects cross-origin and non-JSON submissions", async () => {
    expect((await POST(request(payload, { origin: "https://other.test" }))).status).toBe(403);
    expect((await POST(request(payload, { "content-type": "text/plain" }))).status).toBe(415);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it.each([{ hp: "bot" }, { elapsedMs: 50 }])("silently discards spam (%#)", async (fields) => {
    expect(await (await POST(request({ ...payload, ...fields }))).json()).toEqual({ ok: true });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("sends validated text with structured addresses and bounded SMTP timeouts", async () => {
    const response = await POST(
      request({ ...payload, name: 'Maxime "M"\r\nTest' }, { origin: "https://portfolio.test" }),
    );
    expect(response.status).toBe(200);
    expect(sendMail).toHaveBeenCalledOnce();
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: { name: 'Portfolio - Maxime "M"  Test', address: "sender@example.com" },
        replyTo: { name: 'Maxime "M"  Test', address: payload.email },
        to: "recipient@example.com",
        text: expect.stringContaining(payload.message),
      }),
    );
    expect(createTransport).toHaveBeenCalledWith(
      expect.objectContaining({ connectionTimeout: 10_000, socketTimeout: 10_000 }),
    );
  });

  it("reports missing configuration and delivery failures", async () => {
    vi.stubEnv("SMTP_PASS", "");
    expect((await POST(request(payload))).status).toBe(500);
    expect(sendMail).not.toHaveBeenCalled();
    vi.stubEnv("SMTP_PASS", "test");
    sendMail.mockRejectedValueOnce(new Error("SMTP unavailable"));
    const response = await POST(request(payload));
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ ok: false, error: "send_failed" });
  });
});

it("escapes both HTML text and attribute quotes in the email template", () => {
  const html = buildEmailHtml(
    '<b>"Name"</b>',
    'a" data-test="bad@example.com',
    "<subject>",
    "<script>alert(1)</script>",
  );
  expect(html).not.toContain("<script>");
  expect(html).not.toContain('data-test="bad');
  expect(html).toContain("&lt;b&gt;&quot;Name&quot;&lt;/b&gt;");
  expect(html).toContain("&lt;subject&gt;");
});
