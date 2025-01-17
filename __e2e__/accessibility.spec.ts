import { test, expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";

const testApplication =
  process.env.testApplication || "0799f739-9dff-4850-97f0-85f129c4330c";

const pages = {
  home: "/",
  detail: `/planning-applications/${testApplication}`,
  feedback: `/planning-applications/${testApplication}/feedback`,
  thankyou: `/planning-applications/${testApplication}/thank-you`,
  notFound: "/not-found",
};

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
  pageName: string,
  pagePath: string,
  level: "full" | "current",
) => {
  await page.goto(pagePath);
  await page.waitForTimeout(3000);

  const accessibilityScanResults = await new AxeBuilder({ page })
    .disableRules("region")
    .withTags(level === "full" ? fullAccessibility : currentAccessibility)
    .analyze();

  const reportPath = `test-results/reports/${level}`;
  const screenshotFilename = `screenshots/${pageName}.png`;
  const reportFilename = `${pageName}.html`;

  await page.screenshot({
    path: `${reportPath}/${screenshotFilename}`,
    fullPage: true,
  });

  createHtmlReport({
    results: accessibilityScanResults,
    options: {
      projectKey: pageName,
      reportFileName: reportFilename,
      outputDir: reportPath,
    },
  });

  expect(accessibilityScanResults.violations).toEqual([]);
};

Object.entries(pages).forEach(([pageName, pagePath]) => {
  test.describe(`Testing: ${pageName} at ${pagePath}`, () => {
    test("should not have any automatically detectable accessibility issues", async ({
      page,
    }) => {
      await testAccessibility(page, pageName, pagePath, "current");
    });

    test.fail(
      "should not pass AAA standards because we haven't done them yet",
      async ({ page }) => {
        await testAccessibility(page, pageName, pagePath, "full");
      },
    );
  });
});
