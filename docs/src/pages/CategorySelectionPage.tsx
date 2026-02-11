import React from "react";
import type { Category } from "../data/flashcards";

const CATEGORIES: { label: string; value: Category }[] = [
  { label: "Animals", value: "animals" },
  { label: "Food", value: "food" },
  { label: "Verbs", value: "verbs" }
];

interface CategorySelectionPageProps {
  title: string;
  mode: "study" | "quiz";
  onBack: () => void;
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

