import React from "react";

const CATEGORIES = ["Animals", "Food", "Verbs"] as const;

interface CategorySelectionPageProps {
  title: string;
  onBack: () => void;
}

export const CategorySelectionPage: React.FC<CategorySelectionPageProps> = ({
  title,
  onBack
}) => {
  return (
    <main className="page">
      <section className="card">
        <button className="back" onClick={onBack}>
          ← Back
        </button>
        <h1 className="title">{title}</h1>
        <p className="subtitle">Choose a category to begin.</p>
        <div className="buttons-column">
          {CATEGORIES.map((category) => (
            <button key={category} className="primary">
              {category}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

