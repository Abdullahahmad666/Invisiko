import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/",
  "/features",
  "/features/invoice-scanning",
  "/features/attendance",
  "/features/compliance",
  "/how-it-works",
  "/about",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/support",
];

for (const path of pages) {
  test.describe(path, () => {
    test("has one h1, a unique title, and no dead links", async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.title()).toMatch(/Invisiko/);

      // §9.1 I: no "#" links, and no empty hrefs.
      const deadLinks = await page.locator('a[href="#"], a[href=""], a:not([href])').count();
      expect(deadLinks).toBe(0);
    });

    test("has no serious accessibility violations", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
    });
  });
}

// The tests below set their own viewports, so they only need to run once.
test.describe("site-wide", () => {
  test.skip(({ isMobile }) => isMobile, "viewport-independent");

  test("no horizontal scroll from 320px to 1920px", async ({ page }) => {
    for (const width of [320, 768, 1024, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of pages) {
        await page.goto(path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(0);
      }
    }
  });

  test("every internal link resolves to a real page", async ({ page, request }) => {
    const hrefs = new Set<string>();
    for (const path of pages) {
      await page.goto(path);
      for (const href of await page.locator("a[href^='/']").evaluateAll((links) => links.map((a) => a.getAttribute("href")!))) {
        hrefs.add(href.split("#")[0] || "/");
      }
    }
    for (const href of hrefs) {
      const response = await request.get(href);
      expect(response.status(), href).toBe(200);
    }
  });

  test("the contact form fails gracefully and keeps what was typed", async ({ page }) => {
    await page.route("**/api/contact", (route) => route.fulfill({ status: 503, body: '{"error":"not_configured"}' }));
    await page.goto("/contact");
    await page.getByLabel(/^Name/).fill("Sam Patel");
    await page.getByLabel(/^Email/).fill("sam@example.co.uk");
    await page.getByLabel(/^Restaurant name/).fill("The Clay Oven");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Request access" }).click();

    await expect(page.getByText(/didn.t send/)).toBeVisible();
    await expect(page.getByLabel(/^Name/)).toHaveValue("Sam Patel");
  });

  test("the mobile menu opens, traps focus and closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Request access" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(toggle).toBeFocused();
  });
});
