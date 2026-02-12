import { test, expect } from "@playwright/test";

test.describe("Home navigation", () => {
  test("navigates from Home to Study and Stats pages", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Spanish Flashcards" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Study Mode" }).click();
    await expect(
      page.getByRole("heading", { name: "Study Mode — Choose a Category" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Animals" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Food" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Verbs" })).toBeVisible();

    await page.getByRole("button", { name: /Back/ }).click();
    await expect(
      page.getByRole("heading", { name: "Spanish Flashcards" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Stats Page" }).click();
    await expect(
      page.getByRole("heading", { name: "Statistics" })
    ).toBeVisible();
  });
});

test.describe("Study flow and flashcard flip", () => {
  test("choosing Animals category shows a flashcard that flips to English", async ({
    page
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Study Mode" }).click();
    await page.getByRole("button", { name: "Animals" }).click();

    await expect(
      page.getByRole("heading", { name: /Study: animals/i })
    ).toBeVisible();
    await expect(page.getByText("el gato")).toBeVisible();

    await page.getByRole("button", { name: /Tap to see English/i }).click();

    await expect(page.getByText("the cat")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Tap to go back to Spanish/i })
    ).toBeVisible();
  });
});

test.describe("Study: Right/Wrong and next card", () => {
  test("flip card, mark Wrong, then see next card", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Study Mode" }).click();
    await page.getByRole("button", { name: "Animals" }).click();

    await expect(page.getByText("el gato")).toBeVisible();
    await page.getByRole("button", { name: /Tap to see English/i }).click();
    await expect(page.getByText("the cat")).toBeVisible();

    await page.getByRole("button", { name: /Wrong/ }).click();

    await expect(
      page.getByRole("heading", { name: /Study: animals/i })
    ).toBeVisible();
    await expect(page.getByText("Card 2 of")).toBeVisible();
  });
});

test.describe("Quiz flow", () => {
  test("Quiz Mode -> category -> quiz type -> Multiple Choice question", async ({
    page
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Quiz Mode" }).click();
    await page.getByRole("button", { name: "Animals" }).click();

    await expect(
      page.getByRole("heading", { name: /Quiz: Animals/i })
    ).toBeVisible();
    await page.getByRole("button", { name: "Multiple Choice" }).click();

    await expect(
      page.getByRole("heading", { name: "Multiple Choice" })
    ).toBeVisible();
    await expect(page.getByText("el gato").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "the cat" })).toBeVisible();
  });

  test("Fill in the Blank: submit answer and see feedback", async ({
    page
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Quiz Mode" }).click();
    await page.getByRole("button", { name: "Verbs" }).click();
    await page.getByRole("button", { name: "Fill in the Blank" }).click();

    await expect(
      page.getByRole("heading", { name: "Fill in the Blank" })
    ).toBeVisible();

    await page.getByPlaceholder("Type the English translation").fill("to eat");
    await page.getByRole("button", { name: "Check" }).click();

    await expect(page.getByText("Correct!")).toBeVisible();
  });
});

test.describe("Statistics page", () => {
  test("Stats page shows totals and by category", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Stats Page" }).click();

    await expect(
      page.getByRole("heading", { name: "Statistics" })
    ).toBeVisible();
    await expect(page.getByText("Total cards studied").first()).toBeVisible();
    await expect(page.getByText("Accuracy").first()).toBeVisible();
    await expect(page.getByText("By category").first()).toBeVisible();
  });
});

