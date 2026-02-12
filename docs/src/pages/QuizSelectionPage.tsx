import React from "react";
import type { Category } from "../data/flashcards";

export type QuizType = "multiple-choice" | "fill-in-the-blank";

const QUIZ_TYPES: { type: QuizType; label: string }[] = [
  { type: "multiple-choice", label: "Multiple Choice" },
  { type: "fill-in-the-blank", label: "Fill in the Blank" }
];

interface QuizSelectionPageProps {
  category: Category;
  onBack: () => void;
  onSelectQuizType: (type: QuizType) => void;
}

export const QuizSelectionPage: React.FC<QuizSelectionPageProps> = ({
  category,
  onBack,
  onSelectQuizType
}) => {
  const categoryLabel =
    category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <main className="page">
      <section className="card">
        <button className="back" onClick={onBack}>
          ← Back
        </button>
        <h1 className="title">Quiz: {categoryLabel}</h1>
        <p className="subtitle">Choose a quiz type.</p>
        <div className="buttons-column">
          {QUIZ_TYPES.map(({ type, label }) => (
            <button
              key={type}
              type="button"
              className="primary"
              onClick={() => onSelectQuizType(type)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};
