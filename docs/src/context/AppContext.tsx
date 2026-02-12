import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Category } from "../data/flashcards";

const STATS_STORAGE_KEY = "spanish-flashcards-stats";
const WRONG_CARDS_STORAGE_KEY = "spanish-flashcards-wrong-cards";

export type CategoryStats = {
  studied: number;
  correct: number;
  incorrect: number;
};

export type StatsState = {
  byCategory: Record<Category, CategoryStats>;
  totalStudied: number;
  totalCorrect: number;
  totalIncorrect: number;
};

const defaultCategoryStats = (): CategoryStats => ({
  studied: 0,
  correct: 0,
  incorrect: 0
});

const defaultStats = (): StatsState => ({
  byCategory: {
    animals: defaultCategoryStats(),
    food: defaultCategoryStats(),
    verbs: defaultCategoryStats()
  },
  totalStudied: 0,
  totalCorrect: 0,
  totalIncorrect: 0
});

function loadStats(): StatsState {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return defaultStats();
    const parsed = JSON.parse(raw) as StatsState;
    return {
      ...defaultStats(),
      ...parsed,
      byCategory: { ...defaultStats().byCategory, ...parsed.byCategory }
    };
  } catch {
    return defaultStats();
  }
}

function loadWrongCardIds(): string[] {
  try {
    const raw = localStorage.getItem(WRONG_CARDS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveStats(stats: StatsState) {
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
}

function saveWrongCardIds(ids: string[]) {
  localStorage.setItem(WRONG_CARDS_STORAGE_KEY, JSON.stringify(ids));
}

/** Unique id for a card: category + spanish (unique in our data). */
export function getCardId(category: Category, spanish: string): string {
  return `${category}|${spanish}`;
}

type AppContextValue = {
  stats: StatsState;
  wrongCardIds: string[];
  recordStudyResult: (category: Category, correct: boolean) => void;
  recordQuizResult: (category: Category, correct: boolean) => void;
  addWrongCard: (category: Category, spanish: string) => void;
  clearWrongCards: () => void;
  hasWrongCards: boolean;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<StatsState>(loadStats);
  const [wrongCardIds, setWrongCardIds] = useState<string[]>(loadWrongCardIds);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  useEffect(() => {
    saveWrongCardIds(wrongCardIds);
  }, [wrongCardIds]);

  const recordStudyResult = useCallback((category: Category, correct: boolean) => {
    setStats((prev) => {
      const cat = prev.byCategory[category];
      return {
        ...prev,
        byCategory: {
          ...prev.byCategory,
          [category]: {
            studied: cat.studied + 1,
            correct: cat.correct + (correct ? 1 : 0),
            incorrect: cat.incorrect + (correct ? 0 : 1)
          }
        },
        totalStudied: prev.totalStudied + 1,
        totalCorrect: prev.totalCorrect + (correct ? 1 : 0),
        totalIncorrect: prev.totalIncorrect + (correct ? 0 : 1)
      };
    });
  }, []);

  const recordQuizResult = useCallback((category: Category, correct: boolean) => {
    setStats((prev) => {
      const cat = prev.byCategory[category];
      return {
        ...prev,
        byCategory: {
          ...prev.byCategory,
          [category]: {
            studied: cat.studied + 1,
            correct: cat.correct + (correct ? 1 : 0),
            incorrect: cat.incorrect + (correct ? 0 : 1)
          }
        },
        totalStudied: prev.totalStudied + 1,
        totalCorrect: prev.totalCorrect + (correct ? 1 : 0),
        totalIncorrect: prev.totalIncorrect + (correct ? 0 : 1)
      };
    });
  }, []);

  const addWrongCard = useCallback((category: Category, spanish: string) => {
    const id = getCardId(category, spanish);
    setWrongCardIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const clearWrongCards = useCallback(() => {
    setWrongCardIds([]);
  }, []);

  const value: AppContextValue = {
    stats,
    wrongCardIds,
    recordStudyResult,
    recordQuizResult,
    addWrongCard,
    clearWrongCards,
    hasWrongCards: wrongCardIds.length > 0
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
