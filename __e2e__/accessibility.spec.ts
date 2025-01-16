import { test, expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  "/",
  "/planning-applications/029235b5-96ff-4352-8b48-aa437ca06b5b",
  "/planning-applications/029235b5-96ff-4352-8b48-aa437ca06b5b/feedback",
  "/planning-applications/029235b5-96ff-4352-8b48-aa437ca06b5b/thank-you",
  "/not-found",
];

const currentAccessibility = [
  "best-practice",
  "wcag2a",
  "wcag2aa",
  // "wcag2aaa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
];

const fullAccessibility = [
  "best-practice",
  "wcag2a",
  "wcag2aa",
  "wcag2aaa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
];

const testAccessibility = async (
  page: Page,
  path: string,
  level: "full" | "current",
) => {
  await page.goto(path);
  await page.waitForTimeout(3000);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules("region")
    .withTags(level === "full" ? fullAccessibility : currentAccessibility)
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
};

pages.forEach((currentPage) => {
  test.describe(currentPage, () => {
    test("should not have any automatically detectable accessibility issues", async ({
      page,
    }) => {
      await testAccessibility(page, currentPage, "current");
    });

    test.fail(
      "should not pass AAA standards because we haven't done them yet",
      async ({ page }) => {
        await testAccessibility(page, currentPage, "full");
      },
    );
  });
});
