import React from "react";
import { useApp } from "../context/AppContext";
import type { Category } from "../data/flashcards";

const CATEGORY_LABELS: Record<Category, string> = {
  animals: "Animals",
  food: "Food",
  verbs: "Verbs"
};

interface StatsPageProps {
  onBack: () => void;
}

export const StatsPage: React.FC<StatsPageProps> = ({ onBack }) => {
  const { stats } = useApp();
  const { totalStudied, totalCorrect, totalIncorrect, byCategory } = stats;
  const accuracy =
    totalStudied > 0
      ? Math.round((totalCorrect / totalStudied) * 100)
      : 0;

  return (
    <main className="page">
      <section className="card">
        <button className="back" onClick={onBack}>
          ← Back
        </button>
        <h1 className="title">Statistics</h1>
        <p className="subtitle">Your progress (saved in this browser).</p>

        <div className="stats-block">
          <p className="stats-row">
            <span>Total cards studied</span>
            <strong>{totalStudied}</strong>
          </p>
          <p className="stats-row">
            <span>Correct</span>
            <strong>{totalCorrect}</strong>
          </p>
          <p className="stats-row">
            <span>Incorrect</span>
            <strong>{totalIncorrect}</strong>
          </p>
          <p className="stats-row">
            <span>Accuracy</span>
            <strong>{accuracy}%</strong>
          </p>
        </div>

        <h2 className="stats-heading">By category</h2>
        {(Object.entries(byCategory) as [Category, typeof byCategory.animals][]).map(
          ([cat, s]) => {
            const catAccuracy =
              s.studied > 0 ? Math.round((s.correct / s.studied) * 100) : 0;
            return (
              <div key={cat} className="stats-block stats-block--small">
                <p className="stats-category-label">{CATEGORY_LABELS[cat]}</p>
                <p className="stats-row">
                  <span>Studied</span>
                  <strong>{s.studied}</strong>
                </p>
                <p className="stats-row">
                  <span>Correct / Incorrect</span>
                  <strong>{s.correct} / {s.incorrect}</strong>
                </p>
                <p className="stats-row">
                  <span>Accuracy</span>
                  <strong>{catAccuracy}%</strong>
                </p>
              </div>
            );
          }
        )}
      </section>
    </main>
  );
};
