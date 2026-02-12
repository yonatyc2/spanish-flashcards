import React, { useState } from "react";
import { HomePage } from "./HomePage";
import { CategorySelectionPage } from "./CategorySelectionPage";
import { StatsPage } from "./StatsPage";
import { StudyPage } from "./StudyPage";
import { QuizSelectionPage, type QuizType } from "./QuizSelectionPage";
import { MultipleChoiceQuizPage } from "./MultipleChoiceQuizPage";
import { FillInBlankQuizPage } from "./FillInBlankQuizPage";
import { useApp } from "../context/AppContext";
import type { Category } from "../data/flashcards";

// Simple manual "router" for the single-page app.
type View =
  | "home"
  | "study-category"
  | "quiz-category"
  | "quiz-select"
  | "quiz-session"
  | "study-session"
  | "redo-session"
  | "stats";

export const App: React.FC = () => {
  const { wrongCardIds } = useApp();
  const [view, setView] = useState<View>("home");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedQuizType, setSelectedQuizType] = useState<QuizType | null>(null);

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
          setView("quiz-select");
        }}
      />
    );
  }

  if (view === "study-session" && selectedCategory) {
    return (
      <StudyPage
        category={selectedCategory}
        onBack={() => setView("study-category")}
        onGoToRedo={() => {
          setSelectedCategory(null);
          setView("redo-session");
        }}
      />
    );
  }

  if (view === "redo-session") {
    return (
      <StudyPage
        cardIds={wrongCardIds}
        onBack={() => setView("home")}
        onGoToRedo={() => setView("redo-session")}
      />
    );
  }

  if (view === "quiz-select" && selectedCategory) {
    return (
      <QuizSelectionPage
        category={selectedCategory}
        onBack={() => setView("quiz-category")}
        onSelectQuizType={(type) => {
          setSelectedQuizType(type);
          setView("quiz-session");
        }}
      />
    );
  }

  if (view === "quiz-session" && selectedCategory) {
    if (selectedQuizType === "multiple-choice") {
      return (
        <MultipleChoiceQuizPage
          category={selectedCategory}
          onBack={() => {
            setSelectedQuizType(null);
            setView("quiz-select");
          }}
        />
      );
    }
    if (selectedQuizType === "fill-in-the-blank") {
      return (
        <FillInBlankQuizPage
          category={selectedCategory}
          onBack={() => {
            setSelectedQuizType(null);
            setView("quiz-select");
          }}
        />
      );
    }
  }

  if (view === "stats") {
    return <StatsPage onBack={() => setView("home")} />;
  }

  return (
    <HomePage
      onGoToStudy={() => setView("study-category")}
      onGoToQuiz={() => setView("quiz-category")}
      onGoToStats={() => setView("stats")}
      onGoToRedo={() => setView("redo-session")}
    />
  );
};
