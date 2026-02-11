import React, { useMemo } from "react";
import { flashcards, Category } from "../data/flashcards";
import { Flashcard } from "../components/Flashcard";

interface StudyPageProps {
  category: Category;
  onBack: () => void;
}

export const StudyPage: React.FC<StudyPageProps> = ({ category, onBack }) => {
  const cards = useMemo(
    () => flashcards.filter((card) => card.category === category),
    [category]
  );

  const firstCard = cards[0];

  return (
    <main className="page">
      <section className="card">
        <button className="back" onClick={onBack}>
          ← Back
        </button>
        <h1 className="title">Study: {category}</h1>
        {firstCard ? (
          <>
            <p className="subtitle">
              Tap the card to flip between Spanish and English.
            </p>
            <div className="flashcard-container">
              <Flashcard
                spanish={firstCard.spanish}
                english={firstCard.english}
              />
            </div>
          </>
        ) : (
          <p className="subtitle">No cards found for this category.</p>
        )}
      </section>
    </main>
  );
};

