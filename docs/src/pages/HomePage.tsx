import React from "react";
import { useApp } from "../context/AppContext";

interface HomePageProps {
  onGoToStudy: () => void;
  onGoToQuiz: () => void;
  onGoToStats: () => void;
  onGoToRedo: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onGoToStudy,
  onGoToQuiz,
  onGoToStats,
  onGoToRedo
}) => {
  const { hasWrongCards, clearWrongCards } = useApp();

  return (
    <main className="page">
      <section className="card">
        <h1 className="title">Spanish Flashcards</h1>
        <p className="subtitle">
          Practice Spanish vocabulary with study and quiz modes.
        </p>
        <div className="buttons-column">
          <button className="primary" onClick={onGoToStudy}>
            Study Mode
          </button>
          <button className="secondary" onClick={onGoToQuiz}>
            Quiz Mode
          </button>
          {hasWrongCards && (
            <button className="primary" onClick={onGoToRedo}>
              Redo Wrong Cards
            </button>
          )}
          <button className="ghost" onClick={onGoToStats}>
            Stats Page
          </button>
          {hasWrongCards && (
            <button
              type="button"
              className="ghost"
              onClick={clearWrongCards}
            >
              Clear wrong cards list
            </button>
          )}
        </div>
      </section>
    </main>
  );
};
