import { expect, test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/");
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.getByPlaceholder("What needs to be done?").click();
  await page.getByPlaceholder("What needs to be done?").click();
  await page.getByPlaceholder("What needs to be done?").fill("test");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByPlaceholder("What needs to be done?").fill("tsestw2");
  await page.getByTestId("todo-title").click();
  await page.getByLabel("Toggle Todo").check();
});
