import { expect, test, type Page } from "@playwright/test";

const SECTION_IDS = [
  "a-propos",
  "expertise",
  "stack",
  "parcours",
  "certifications",
  "approche",
  "contact",
];

async function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test.describe("Home page", () => {
  test("loads with the hero and no runtime errors", async ({ page }) => {
    const errors = await collectConsoleErrors(page);
    const response = await page.goto("/fr");
    expect(response?.ok()).toBe(true);

    await expect(page).toHaveTitle(/Maxime Derbigny/);
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toContainText("Concevoir avec précision.");
    await expect(heading).toContainText("Développer avec intention.");
    await expect(page.getByText("Je suis Maxime Derbigny", { exact: false })).toBeVisible();

    const portrait = page.getByRole("img", { name: /Portrait.*Maxime Derbigny/ });
    await expect(portrait).toBeVisible();

    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("renders every section with an accessible heading", async ({ page }) => {
    await page.goto("/fr");
    for (const id of SECTION_IDS) {
      const section = page.locator(`section#${id}`);
      await expect(section).toHaveCount(1);
      await expect(section.locator(`#${id}-title`)).toHaveCount(1);
    }
    expect(await page.getByRole("heading", { level: 1 }).count()).toBe(1);
  });

  test("shows skills, experiences and certifications from the profile", async ({ page }) => {
    await page.goto("/fr");

    const stack = page.locator("section#stack");
    await stack.scrollIntoViewIfNeeded();
    await expect(stack.getByRole("tabpanel")).toContainText("React");
    await expect(stack.getByRole("tabpanel")).toContainText("Next.js");
    await expect(stack.getByRole("tabpanel")).toContainText("TypeScript");

    // Retry the click: on a cold page it can land before hydration wires up
    // the tab's event handlers.
    await expect(async () => {
      await stack.getByRole("tab", { name: /Database & ORM/ }).click();
      await expect(stack.getByRole("tab", { name: /Database & ORM/ })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    }).toPass({ timeout: 10_000 });
    await expect(stack.getByRole("tabpanel")).toContainText("PostgreSQL");
    await expect(stack.getByRole("tabpanel")).toContainText("Prisma ORM");

    const journey = page.locator("section#parcours");
    await journey.scrollIntoViewIfNeeded();
    await expect(journey).toContainText("MICRO Informatic Systems SA");
    await expect(journey).toContainText("Groupement Romand de l'Informatique");
    await expect(journey).toContainText("SBB CFF FFS");
    await expect(journey).toContainText("ISEIG");
    await expect(journey).toContainText("EPSIC");

    const certifications = page.locator("section#certifications");
    await certifications.scrollIntoViewIfNeeded();
    await expect(certifications).toContainText("Professional Scrum Master I");
    await expect(certifications).toContainText("97,5 %");
  });

  test("exposes working contact links", async ({ page }) => {
    await page.goto("/fr");
    const contact = page.locator("section#contact");
    await contact.scrollIntoViewIfNeeded();

    await expect(contact.locator('a[href="mailto:maxime.derbigny@gmail.com"]')).toBeVisible();

    const github = contact.locator('a[href="https://github.com/MrTangoo"]');
    await expect(github).toBeVisible();
    await expect(github).toHaveAttribute("target", "_blank");
    await expect(github).toHaveAttribute("rel", /noopener/);

    await expect(
      contact.locator('a[href="https://www.linkedin.com/in/maxime-derbigny"]'),
    ).toBeVisible();
  });

  test("never shows a projects section", async ({ page }) => {
    await page.goto("/fr");
    const headings = await page.getByRole("heading").allInnerTexts();
    for (const heading of headings) {
      expect(heading.toLowerCase()).not.toMatch(/projets?|projects?|case stud|réalisations?/);
    }
    expect(await page.locator("section#projects, section#projets, section#work").count()).toBe(0);
  });

  test("has no unintended horizontal overflow", async ({ page }) => {
    await page.goto("/fr");
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test("serves SEO metadata, structured data, sitemap and robots", async ({ page, request }) => {
    await page.goto("/fr");

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Maxime Derbigny/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(jsonLd ?? "{}");
    const nodes = Array.isArray(data["@graph"]) ? data["@graph"] : [data];
    const person = nodes.find((node: { "@type"?: string }) => node["@type"] === "Person");
    expect(person?.name).toBe("Maxime Derbigny");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain("<urlset");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBe(true);
    expect(await robots.text()).toContain("Sitemap:");

    const og = await request.get("/fr/opengraph-image");
    expect(og.ok()).toBe(true);
    expect(og.headers()["content-type"]).toContain("image/png");
  });
});
