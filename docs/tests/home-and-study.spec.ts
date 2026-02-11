import { test, expect } from "@playwright/test";

test.describe("Home navigation", () => {
  test("navigates from Home to Study and Stats pages", async ({ page }) => {
    await page.goto("/");

    // Home content
    await expect(page.getByRole("heading", { name: "Spanish Flashcards" })).toBeVisible();

    // Study Mode -> Category selection
    await page.getByRole("button", { name: "Study Mode" }).click();
    await expect(
      page.getByRole("heading", { name: "Study Mode — Choose a Category" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Animals" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Food" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Verbs" })).toBeVisible();

    // Back to Home
    await page.getByRole("button", { name: "Back" }).click();
    await expect(page.getByRole("heading", { name: "Spanish Flashcards" })).toBeVisible();

    // Stats Page
    await page.getByRole("button", { name: "Stats Page" }).click();
    await expect(page.getByRole("heading", { name: "Statistics" })).toBeVisible();
  });
});

test.describe("Study flow and flashcard flip", () => {
  test("choosing Animals category shows a flashcard that flips to English", async ({
    page
  }) => {
    await page.goto("/");

    // Go to Study mode
    await page.getByRole("button", { name: "Study Mode" }).click();

    // Choose Animals category
    await page.getByRole("button", { name: "Animals" }).click();

    // Study page heading
    await expect(page.getByRole("heading", { name: /Study: animals/i })).toBeVisible();

    // By default, should show Spanish text (e.g. "el gato")
    const spanishText = page.getByText("el gato");
    await expect(spanishText).toBeVisible();

    // Click flashcard to flip to English
    await page.getByRole("button", { name: /Tap to see English/i }).click();

    // Now English translation should be visible
    await expect(page.getByText("the cat")).toBeVisible();

    // And hint should change
    await expect(
      page.getByRole("button", { name: /Tap to go back to Spanish/i })
    ).toBeVisible();
  });
}
);

