import React, { useMemo, useState } from "react";
import { flashcards, Category } from "../data/flashcards";
import { Flashcard } from "../components/Flashcard";
import { useApp, getCardId } from "../context/AppContext";

interface StudyPageProps {
  /** Omit when in redo mode (cards come from cardIds only). */
  category?: Category | null;
  onBack: () => void;
  onGoToRedo?: () => void;
  /** If set, only show these cards (redo mode = wrong cards from any category). */
  cardIds?: string[] | null;
}

export const StudyPage: React.FC<StudyPageProps> = ({
  category: categoryProp = null,
  onBack,
  onGoToRedo,
  cardIds: restrictedCardIds = null
}) => {
  const { recordStudyResult, addWrongCard, hasWrongCards } = useApp();
  const isRedoMode = restrictedCardIds != null && restrictedCardIds.length > 0;

  // Redo: filter by card ids only. Normal: filter by category, then optionally by ids.
  const cards = useMemo(() => {
    if (isRedoMode) {
      const idSet = new Set(restrictedCardIds);
      return flashcards.filter((c) => idSet.has(getCardId(c.category, c.spanish)));
    }
    const category = categoryProp ?? "animals";
    return flashcards.filter((c) => c.category === category);
  }, [categoryProp, isRedoMode, restrictedCardIds]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const currentCard = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;
  const canGoPrevious = currentIndex > 0;

  const handleRight = () => {
    if (!currentCard) return;
    recordStudyResult(currentCard.category, true);
    setCurrentIndex((i) => i + 1);
    setFlipped(false);
  };

  const handleWrong = () => {
    if (!currentCard) return;
    recordStudyResult(currentCard.category, false);
    addWrongCard(currentCard.category, currentCard.spanish);
    setCurrentIndex((i) => i + 1);
    setFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((i) => i - 1);
    setFlipped(false);
  };

  // End of session: all cards reviewed
  if (cards.length > 0 && currentIndex >= cards.length) {
    return (
      <main className="page">
        <section className="card">
          <button className="back" onClick={onBack}>
            ← Back
          </button>
          <h1 className="title">Session complete</h1>
          <p className="subtitle">
            You reviewed {cards.length} card{cards.length !== 1 ? "s" : ""}.
          </p>
          <div className="buttons-column">
            {hasWrongCards && onGoToRedo && (
              <button
                type="button"
                className="primary"
                onClick={onGoToRedo}
              >
                Redo Wrong Cards
              </button>
            )}
            <button type="button" className="secondary" onClick={onBack}>
              Done
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!currentCard) {
    return (
      <main className="page">
        <section className="card">
          <button className="back" onClick={onBack}>
            ← Back
          </button>
          <h1 className="title">Study: {categoryProp ?? "category"}</h1>
          <p className="subtitle">No cards found for this category.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="card">
        <button className="back" onClick={onBack}>
          ← Back
        </button>
        <h1 className="title">
          Study: {isRedoMode ? "Redo wrong" : categoryProp}
        </h1>
        <p className="subtitle">
          Tap the card to flip. Card {currentIndex + 1} of {cards.length}.
        </p>
        <div className="flashcard-container">
          <Flashcard
            key={`${currentCard.category}-${currentCard.spanish}-${currentIndex}`}
            spanish={currentCard.spanish}
            english={currentCard.english}
            flipped={flipped}
            onFlipChange={setFlipped}
          />
        </div>
        {flipped ? (
          <div className="study-right-wrong">
            <button
              type="button"
              className="primary"
              onClick={handleRight}
              aria-label="I got it right"
            >
              ✅ Right
            </button>
            <button
              type="button"
              className="secondary"
              onClick={handleWrong}
              aria-label="I got it wrong"
            >
              ❌ Wrong
            </button>
          </div>
        ) : (
          <div className="study-nav">
            <button
              type="button"
              className="secondary"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
            >
              ← Previous
            </button>
          </div>
        )}
      </section>
    </main>
  );
};
