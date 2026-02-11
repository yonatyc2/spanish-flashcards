import React, { useState } from "react";
import { HomePage } from "./HomePage";
import { CategorySelectionPage } from "./CategorySelectionPage";
import { StatsPage } from "./StatsPage";
import { StudyPage } from "./StudyPage";
import { QuizPlaceholderPage } from "./QuizPlaceholderPage";
import type { Category } from "../data/flashcards";

type View =
  | "home"
  | "study-category"
  | "quiz-category"
  | "study-session"
  | "quiz-session"
  | "stats";

export const App: React.FC = () => {
  const [view, setView] = useState<View>("home");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  if (view === "study-category") {
    return (
      <CategorySelectionPage
        title="Study Mode — Choose a Category"
        mode="study"
        onBack={() => setView("home")}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setView("study-session");
        }}
      />
    );
  }

  if (view === "quiz-category") {
    return (
      <CategorySelectionPage
        title="Quiz Mode — Choose a Category"
        mode="quiz"
        onBack={() => setView("home")}
        onSelectCategory={(category) => {
          setSelectedCategory(category);
          setView("quiz-session");
        }}
      />
    );
  }

  if (view === "study-session" && selectedCategory) {
    return (
      <StudyPage
        category={selectedCategory}
        onBack={() => setView("study-category")}
      />
    );
  }

  if (view === "quiz-session" && selectedCategory) {
    return (
      <QuizPlaceholderPage
        category={selectedCategory}
        onBack={() => setView("quiz-category")}
      />
    );
  }

  if (view === "stats") {
    return <StatsPage onBack={() => setView("home")} />;
  }

  return (
    <HomePage
      onGoToStudy={() => setView("study-category")}
      onGoToQuiz={() => setView("quiz-category")}
      onGoToStats={() => setView("stats")}
    />
  );
};

