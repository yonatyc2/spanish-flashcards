import React from "react";
import type { Category } from "../data/flashcards";

interface QuizPlaceholderPageProps {
  category: Category;
  onBack: () => void;
}

export const QuizPlaceholderPage: React.FC<QuizPlaceholderPageProps> = ({
  category,
  onBack
}) => {
  return (
    <main className="page">
      <section className="card">
        <button className="back" onClick={onBack}>
          ← Back
        </button>
        <h1 className="title">Quiz: {category}</h1>
        <p className="subtitle">
          Quiz mode for this category will be implemented in a later phase.
        </p>
      </section>
    </main>
  );
};

