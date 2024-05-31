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
  await page.getByPlaceholder("What needs to be done?").click();
  await page.getByPlaceholder("What needs to be done?").click();
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByText("tsestw2").click();
  await page.getByRole("textbox", { name: "Edit" }).fill("edited");
  await page.getByRole("textbox", { name: "Edit" }).press("Enter");
  await page
    .getByText(
      "This is just a demo of TodoMVC for testing, not the real TodoMVC app. todosMark",
    )
    .click();
  await page.getByRole("button", { name: "Clear completed" }).click();
});
