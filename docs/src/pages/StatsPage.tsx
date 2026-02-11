import React from "react";

interface StatsPageProps {
  onBack: () => void;
}

export const StatsPage: React.FC<StatsPageProps> = ({ onBack }) => {
  return (
    <main className="page">
      <section className="card">
        <button className="back" onClick={onBack}>
          ← Back
        </button>
        <h1 className="title">Statistics</h1>
        <p className="subtitle">
          Stats tracking will be implemented in a later phase.
        </p>
      </section>
    </main>
  );
};

