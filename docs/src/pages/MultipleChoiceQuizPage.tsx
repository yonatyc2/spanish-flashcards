import React, { useMemo, useState } from "react";
import { flashcards, Category, getQuizOptions } from "../data/flashcards";
import { useApp } from "../context/AppContext";

interface MultipleChoiceQuizPageProps {
  category: Category;
  onBack: () => void;
}

export const MultipleChoiceQuizPage: React.FC<MultipleChoiceQuizPageProps> = ({
  category,
  onBack
}) => {
  const { recordQuizResult } = useApp();
  const cards = useMemo(
    () => flashcards.filter((c) => c.category === category),
    [category]
  );

  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const card = cards[index];
  const options = useMemo(() => (card ? getQuizOptions(card) : []), [card]);
  const isLast = index === cards.length - 1;
  const finished = index >= cards.length;

  const handleChoice = (option: string) => {
    if (feedback != null) return;
    setSelectedAnswer(option);
    const correct = option.trim().toLowerCase() === card.english.trim().toLowerCase();
    setFeedback(correct ? "correct" : "wrong");
    recordQuizResult(category, correct);
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedAnswer(null);
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
        <h1 className="title">Multiple Choice</h1>
        <p className="subtitle">Question {index + 1} of {cards.length}</p>
        <p className="quiz-prompt">{card.spanish}</p>
        <div className="buttons-column">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={
                feedback == null
                  ? "secondary"
                  : opt === card.english
                    ? "primary"
                    : opt === selectedAnswer
                      ? "wrong-choice"
                      : "secondary"
              }
              onClick={() => handleChoice(opt)}
              disabled={feedback != null}
            >
              {opt}
            </button>
          ))}
        </div>
        {feedback === "correct" && (
          <p className="quiz-feedback quiz-feedback--correct">Correct!</p>
        )}
        {feedback === "wrong" && (
          <p className="quiz-feedback quiz-feedback--wrong">
            Wrong — the answer was: {card.english}
          </p>
        )}
        {feedback != null && !isLast && (
          <button type="button" className="primary" onClick={handleNext} style={{ marginTop: "1rem" }}>
            Next →
          </button>
        )}
        {feedback != null && isLast && (
          <button type="button" className="primary" onClick={handleNext} style={{ marginTop: "1rem" }}>
            See results
          </button>
        )}
      </section>
    </main>
  );
};
