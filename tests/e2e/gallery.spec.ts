import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("gallery", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has a title, a description and the standard Open Graph image", async ({
    page,
  }) => {
    await expect(page).toHaveTitle("Photos | trueberryless");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "Some photos I want to share online."
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://photos.felixs.dev/og-image.png"
    );
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
      "href",
      "/favicon.svg"
    );
  });

  test("shows every photo with a description", async ({ page }) => {
    const images = page.locator(".justified-gallery img");

    expect(await images.count()).toBeGreaterThan(30);

    for (const alt of await images.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("alt"))
    )) {
      expect(alt).toBeTruthy();
      expect(alt).not.toMatch(/[_.]/);
    }
  });

  test("opens a photo in the lightbox and closes it with Escape", async ({
    page,
  }) => {
    await page.locator(".justified-gallery a").first().click();

    const lightbox = page.locator(".fancybox__container");

    await expect(lightbox).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
  });

  test("does not scroll horizontally", async ({ page }) => {
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    );

    expect(overflow).toBeLessThanOrEqual(0);
  });

  for (const colorScheme of ["dark", "light"] as const) {
    test(`has no accessibility violations in ${colorScheme} mode`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });

      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();

      expect(
        violations.map(
          ({ id, nodes }) =>
            `${id}: ${nodes.map(({ target }) => target.join(" ")).join(", ")}`
        )
      ).toEqual([]);
    });
  }
});
