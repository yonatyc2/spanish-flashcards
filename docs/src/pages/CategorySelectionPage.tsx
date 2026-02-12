import React from "react";
import type { Category } from "../data/flashcards";

// Human-readable labels mapped to the internal category keys used in the data file.
const CATEGORIES: { label: string; value: Category }[] = [
  { label: "Animals", value: "animals" },
  { label: "Food", value: "food" },
  { label: "Verbs", value: "verbs" }
];

interface CategorySelectionPageProps {
  title: string;
  // Whether the user is starting a Study or Quiz flow.
  mode: "study" | "quiz";
  onBack: () => void;
  // Bubble the chosen category + mode up to App so it can route correctly.
  onSelectCategory: (category: Category, mode: "study" | "quiz") => void;
}

export const CategorySelectionPage: React.FC<CategorySelectionPageProps> = ({
  title,
  mode,
  onBack,
  onSelectCategory
}) => {
  return (
    <main className="page">
      <section className="card">
        <button className="back" onClick={onBack}>
          ← Back
        </button>
        <h1 className="title">{title}</h1>
        <p className="subtitle">Choose a category to begin.</p>
        <div className="buttons-column">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              className="primary"
              onClick={() => onSelectCategory(category.value, mode)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

