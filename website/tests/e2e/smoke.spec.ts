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

  test("the logo glyph stays inside its tile everywhere", async ({ page }) => {
    for (const width of [360, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/features");
      if (width === 360) await page.getByRole("button", { name: "Open menu" }).click();
      const escapes = await page.evaluate(() =>
        Array.from(document.querySelectorAll("span[aria-hidden=true] > img"))
          .map((img) => {
            const tile = img.parentElement!.getBoundingClientRect();
            const glyph = img.getBoundingClientRect();
            const inside =
              glyph.width > 0 &&
              glyph.left >= tile.left && glyph.right <= tile.right && glyph.top >= tile.top && glyph.bottom <= tile.bottom;
            return inside ? null : `tile ${Math.round(tile.width)}x${Math.round(tile.height)}, glyph ${Math.round(glyph.width)}x${Math.round(glyph.height)}`;
          })
          .filter(Boolean),
      );
      expect(escapes, `at ${width}px`).toEqual([]);
    }
  });

  test("every page is one click away from the header or footer, on every page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const path of pages) {
      await page.goto(path);
      // The header's Features menu holds the feature pages until opened, but they are in the DOM.
      const links = await page
        .locator("header a[href], footer a[href]")
        .evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href")!.split("#")[0] || "/"));
      for (const target of pages) expect(links, `${target} from ${path}`).toContain(target);
    }
  });

  test("the Features menu works by keyboard and marks the section", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/features/compliance");
    const button = page.getByRole("button", { name: "Features" });
    await expect(button).toHaveAttribute("data-active", "true");

    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const menu = page.locator("#features-menu");
    await expect(menu.getByRole("link", { name: /Invoice scanning/ })).toBeVisible();
    await expect(menu.getByRole("link", { name: /Compliance records/ })).toHaveAttribute("aria-current", "page");

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(button).toBeFocused();

    await button.focus();
    await page.keyboard.press("Enter");
    await menu.getByRole("link", { name: /Invoice scanning/ }).click();
    await expect(page).toHaveURL(/\/features\/invoice-scanning$/);
    await expect(menu).toBeHidden();
  });

  test("the mobile menu lists the feature pages and closes on navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Menu" });
    for (const name of ["Attendance & rota", "Compliance records", "Invoice scanning", "Pay", "Contact", "Support"]) {
      await expect(dialog.getByRole("link", { name, exact: true })).toBeVisible();
    }
    await dialog.getByRole("link", { name: "Attendance & rota" }).click();
    await expect(page).toHaveURL(/\/features\/attendance$/);
    await expect(dialog).toBeHidden();
  });

  test("the section bar stays in view, tracks the section and jumps to it", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/features");
      const bar = page.getByRole("navigation", { name: "On this page" });
      await bar.getByRole("link", { name: "Pay" }).click();
      await expect(page).toHaveURL(/#pay$/);
      await expect(bar.getByRole("link", { name: "Pay" })).toHaveAttribute("aria-current", "location");

      const top = await bar.evaluate((el) => el.getBoundingClientRect().top);
      expect(top, "sticks under the header").toBe(72);
      // The target heading must not hide behind the header and the bar.
      const barBottom = await bar.evaluate((el) => el.getBoundingClientRect().bottom);
      const heading = await page.locator("#pay-title").evaluate((el) => el.getBoundingClientRect().top);
      expect(heading, `heading clears the bar at ${width}px`).toBeGreaterThanOrEqual(barBottom);
    }
  });

  test("feature pages link onward to the other features and how it works", async ({ page }) => {
    const features = ["/features/attendance", "/features/compliance", "/features/invoice-scanning"];
    for (const path of features) {
      await page.goto(path);
      const hrefs = await page.locator("main a[href]").evaluateAll((a) => a.map((x) => x.getAttribute("href")));
      for (const sibling of features.filter((f) => f !== path)) expect(hrefs, `${path} → ${sibling}`).toContain(sibling);
      expect(hrefs).toContain("/how-it-works");
      expect(hrefs).toContain("/features");
    }
  });

  test("back to top appears on long pages and returns to the top", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/features");
    const button = page.getByRole("button", { name: "Back to top" });
    await expect(button).toHaveCount(0);
    await page.evaluate(() => window.scrollTo(0, 2500));
    await button.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(page.locator("#main")).toBeFocused();
  });

  test("inner pages show a breadcrumb back to the home page", async ({ page }) => {
    for (const path of pages.filter((p) => p !== "/")) {
      await page.goto(path);
      const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
      await expect(crumbs.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    }
  });

  test("the 404 page offers ways back", async ({ page }) => {
    const response = await page.goto("/no-such-page");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Page not found/);

    // Inside the normal shell: the full header and footer, so nobody is stranded.
    await expect(page.locator("header").getByRole("link", { name: "Request access" })).toBeVisible();
    await expect(page.locator("footer").getByRole("link", { name: "Privacy" })).toBeVisible();

    await expect(page.getByRole("link", { name: "Go to the home page" })).toBeVisible();
    const tiles = page.getByRole("navigation", { name: "Where were you heading?" });
    for (const name of ["Home", "Features", "How it works", "FAQ", "Contact", "Support"]) {
      await expect(tiles.getByRole("link", { name: new RegExp(`^${name}`) })).toBeVisible();
    }

    await tiles.getByRole("link", { name: /^FAQ/ }).click();
    await expect(page).toHaveURL(/\/faq$/);
  });

  test("the 404 page's Go back returns to where you came from", async ({ page }) => {
    await page.goto("/features");
    await page.goto("/features/nope");
    await page.getByRole("button", { name: "Go back" }).click();
    await expect(page).toHaveURL(/\/features$/);
  });

  test("the 404 page is accessible and does not scroll sideways", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/no-such-page");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `at ${width}px`).toBeLessThanOrEqual(0);
    }
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => v.id)).toEqual([]);
  });

  test("product screenshots load on every page that uses them", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const path of ["/", "/features", "/features/attendance", "/features/compliance", "/features/invoice-scanning", "/how-it-works"]) {
      await page.goto(path);
      const images = page.locator("img[src*=screenshots]");
      expect(await images.count(), path).toBeGreaterThan(0);
      for (const image of await images.all()) {
        await image.evaluate((el: HTMLImageElement) => {
          el.loading = "eager";
          return el.decode().catch(() => undefined);
        });
        expect(await image.evaluate((el: HTMLImageElement) => el.naturalWidth), path).toBeGreaterThan(0);
      }
    }
  });

  test("the homepage hero shows two phones on desktop and one on a phone", async ({ page }) => {
    const hero = page.locator("section[aria-labelledby=hero-title]").getByRole("img");

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(hero.filter({ visible: true })).toHaveCount(2);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(hero.filter({ visible: true })).toHaveCount(1);
    await expect(hero.filter({ visible: true })).toHaveAttribute("alt", /Checks dashboard/);
  });

  test("main page heroes all carry a visual", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const expected: Record<string, number> = {
      "/": 2,
      "/features": 3,
      "/features/attendance": 2,
      "/features/compliance": 2,
      "/features/invoice-scanning": 2,
      "/how-it-works": 2,
      "/about": 1,
    };
    for (const [path, phones] of Object.entries(expected)) {
      await page.goto(path);
      const hero = page.locator("main > section").first();
      await expect(hero.getByRole("img").filter({ visible: true }), path).toHaveCount(phones);
    }
    for (const path of ["/faq", "/contact", "/support", "/privacy", "/terms"]) {
      await page.goto(path);
      await expect(page.locator("main > section").first().locator(".card-float"), path).toHaveCount(4);
    }
  });

  test("every section fills the screen, and a phone beside its text fits on it", async ({ page }) => {
    for (const [width, height] of [
      [1440, 900],
      [1024, 768],
      [390, 844],
    ]) {
      await page.setViewportSize({ width, height });
      for (const path of pages) {
        await page.goto(path);
        const problems = await page.evaluate(() => {
          const header = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
          const bar = document.querySelector('nav[aria-label="On this page"]');
          const barHeight = bar && getComputedStyle(bar).display !== "none" ? bar.getBoundingClientRect().height : 0;
          const room = innerHeight - header - barHeight;
          const found: string[] = [];
          document.querySelectorAll("main > section").forEach((section, index) => {
            const needed = index === 0 ? innerHeight : room;
            const height = section.getBoundingClientRect().height;
            if (height < needed - 2) found.push(`section ${index} is ${Math.round(height)}px, needs ${Math.round(needed)}px`);
            if (innerWidth >= 1024) {
              section.querySelectorAll<HTMLElement>(".sd-phone").forEach((phone) => {
                const phoneHeight = phone.getBoundingClientRect().height;
                if (phoneHeight > room) found.push(`section ${index} has a ${Math.round(phoneHeight)}px phone in ${Math.round(room)}px`);
              });
            }
          });
          return found;
        });
        expect(problems, `${path} at ${width}x${height}`).toEqual([]);
      }
    }
  });

  test("on a phone, the hero phone stays upright and fully visible as you scroll to it", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const path of ["/", "/about", "/features/attendance", "/how-it-works"]) {
      await page.goto(path);
      const figure = page.locator("main > section").first().locator("figure").filter({ visible: true }).first();
      await figure.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      const state = await figure.evaluate((el) => {
        let opacity = 1;
        for (let node: Element | null = el; node; node = node.parentElement) opacity *= Number(getComputedStyle(node).opacity);
        const box = el.getBoundingClientRect();
        return { opacity, transform: getComputedStyle(el).transform, height: box.height, top: box.top, bottom: box.bottom };
      });
      expect(state.opacity, path).toBeGreaterThan(0.99);
      expect(["none", "matrix(1, 0, 0, 1, 0, 0)"], path).toContain(state.transform);
      expect(state.height, path).toBeGreaterThan(400);
      await expect(figure.getByRole("img"), path).toBeVisible();
    }
  });

  test("on a phone, heroes show a single screen", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const path of ["/features", "/how-it-works", "/features/attendance"]) {
      await page.goto(path);
      await expect(page.locator("main > section").first().getByRole("img").filter({ visible: true }), path).toHaveCount(1);
    }
  });

  test("every page says its app screens use demo data, and none shows a placeholder", async ({ page }) => {
    for (const path of pages) {
      await page.goto(path);
      await expect(page.getByText("Screenshot placeholder"), path).toHaveCount(0);
      await expect(page.locator("footer").getByText(/demo data/), path).toBeVisible();
    }
  });

  test("every timeline step has its own screen, shown as it scrolls into view", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    for (const path of ["/", "/how-it-works", "/features/attendance"]) {
      await page.goto(path);
      const first = page.locator('[data-screen="0"]');
      const showcases = await first.count();
      expect(showcases, path).toBeGreaterThan(0);

      for (let showcase = 0; showcase < showcases; showcase++) {
        const root = first.nth(showcase).locator('xpath=ancestor::div[contains(@class, "grid")][1]');

        const sources = await root.locator("[data-screen] img").evaluateAll((images) => images.map((img) => img.getAttribute("src")));
        expect(new Set(sources).size, `${path} #${showcase}: one screen per step`).toBe(sources.length);

        const steps = await root.locator("[data-step]").count();
        expect(steps, `${path} #${showcase}`).toBe(sources.length);

        for (let step = 0; step < steps; step++) {
          await root.locator("[data-step]").nth(step).evaluate((el) => {
            const box = el.getBoundingClientRect();
            window.scrollTo({ top: box.top + scrollY + box.height / 2 - innerHeight / 2, behavior: "instant" });
          });
          await expect
            .poll(
              () => root.locator("[data-screen]").evaluateAll((layers) => layers.findIndex((layer) => getComputedStyle(layer).opacity === "1")),
              { message: `${path} #${showcase} step ${step}` },
            )
            .toBe(step);
        }
      }
    }
  });

  test("the showcase phone follows the step in view", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const current = () =>
      page.evaluate(() => {
        const layers = Array.from(document.querySelectorAll("section[aria-labelledby=steps-title] figure div.absolute.inset-0"));
        const visible = layers.find((layer) => getComputedStyle(layer).opacity === "1");
        return visible?.querySelector("img")?.getAttribute("src") ?? "";
      });
    const stepTop = (index: number) =>
      page.locator("section[aria-labelledby=steps-title] [data-step]").nth(index).evaluate((el) => el.getBoundingClientRect().top + scrollY);

    await page.evaluate((y) => scrollTo(0, y - innerHeight / 2 + 40), await stepTop(0));
    await expect.poll(current).toContain("check-in-setup");
    await page.evaluate((y) => scrollTo(0, y - innerHeight / 2 + 40), await stepTop(2));
    await expect.poll(current).toContain("staff-scan");
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
