import React, { useMemo, useState } from "react";
import { flashcards, Category } from "../data/flashcards";
import { useApp } from "../context/AppContext";

interface FillInBlankQuizPageProps {
  category: Category;
  onBack: () => void;
}

export const FillInBlankQuizPage: React.FC<FillInBlankQuizPageProps> = ({
  category,
  onBack
}) => {
  const { recordQuizResult } = useApp();
  const cards = useMemo(
    () => flashcards.filter((c) => c.category === category),
    [category]
  );

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const card = cards[index];
  const isLast = index === cards.length - 1;
  const finished = index >= cards.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!card || feedback != null) return;
    const correct =
      input.trim().toLowerCase() === card.english.trim().toLowerCase();
    setFeedback(correct ? "correct" : "wrong");
    recordQuizResult(category, correct);
  };

  const handleNext = () => {
    setFeedback(null);
    setInput("");
    setIndex((i) => i + 1);
  };

  if (cards.length === 0) {
    return (
      <main className="page">
        <section className="card">
          <button className="back" onClick={onBack}>← Back</button>
          <h1 className="title">No cards</h1>
          <p className="subtitle">No cards in this category for quiz.</p>
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="page">
        <section className="card">
          <button className="back" onClick={onBack}>← Back</button>
          <h1 className="title">Quiz complete</h1>
          <p className="subtitle">You answered {cards.length} question{cards.length !== 1 ? "s" : ""}.</p>
          <button type="button" className="primary" onClick={onBack}>Done</button>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="card">
        <button className="back" onClick={onBack}>← Back</button>
        <h1 className="title">Fill in the Blank</h1>
        <p className="subtitle">Question {index + 1} of {cards.length}</p>
        <p className="quiz-prompt">Translate to English: <strong>{card.spanish}</strong></p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="quiz-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type the English translation"
            disabled={feedback != null}
            autoFocus
          />
          {feedback == null && (
            <button type="submit" className="primary" style={{ marginTop: "0.75rem" }}>
              Check
            </button>
          )}
        </form>
        {feedback === "correct" && (
          <p className="quiz-feedback quiz-feedback--correct">Correct!</p>
        )}
        {feedback === "wrong" && (
          <p className="quiz-feedback quiz-feedback--wrong">
            Wrong — the answer was: {card.english}
          </p>
        )}
        {feedback != null && (
          <button type="button" className="primary" onClick={handleNext} style={{ marginTop: "1rem" }}>
            {isLast ? "See results" : "Next →"}
          </button>
        )}
      </section>
    </main>
  );
};
