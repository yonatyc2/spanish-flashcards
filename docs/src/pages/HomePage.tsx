import React from "react";

interface HomePageProps {
  onGoToStudy: () => void;
  onGoToQuiz: () => void;
  onGoToStats: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onGoToStudy,
  onGoToQuiz,
  onGoToStats
}) => {
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
          <button className="ghost" onClick={onGoToStats}>
            Stats Page
          </button>
        </div>
      </section>
    </main>
  );
};

