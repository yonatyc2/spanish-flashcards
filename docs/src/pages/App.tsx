import React, { useState } from "react";
import { HomePage } from "./HomePage";
import { CategorySelectionPage } from "./CategorySelectionPage";
import { StatsPage } from "./StatsPage";

export type Mode = "home" | "study-category" | "quiz-category" | "stats";

export const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>("home");

  if (mode === "study-category") {
    return (
      <CategorySelectionPage
        title="Study Mode — Choose a Category"
        onBack={() => setMode("home")}
      />
    );
  }

  if (mode === "quiz-category") {
    return (
      <CategorySelectionPage
        title="Quiz Mode — Choose a Category"
        onBack={() => setMode("home")}
      />
    );
  }

  if (mode === "stats") {
    return <StatsPage onBack={() => setMode("home")} />;
  }

  return (
    <HomePage
      onGoToStudy={() => setMode("study-category")}
      onGoToQuiz={() => setMode("quiz-category")}
      onGoToStats={() => setMode("stats")}
    />
  );
};

