// High-level category for a card. These keys are shared across data and UI.
export type Category = "animals" | "food" | "verbs";

// Minimal quiz config used by later phases (multiple-choice or fill-in).
export type QuizConfig =
  | {
      type: "multiple-choice";
      options: string[];
    }
  | {
      type: "fill-in-the-blank";
    };

// Core shape of a single flashcard in the app.
export interface Flashcard {
  category: Category;
  spanish: string;
  english: string;
  quiz: QuizConfig;
}

// Static flashcard dataset used by both Study and Quiz flows.
export const flashcards: Flashcard[] = [
  // Animals
  {
    category: "animals",
    spanish: "el gato",
    english: "the cat",
    quiz: {
      type: "multiple-choice",
      options: ["the dog", "the house", "the cat", "the bird"]
    }
  },
  {
    category: "animals",
    spanish: "el perro",
    english: "the dog",
    quiz: {
      type: "multiple-choice",
      options: ["the dog", "the cat", "the horse", "the bird"]
    }
  },
  {
    category: "animals",
    spanish: "el pájaro",
    english: "the bird",
    quiz: {
      type: "multiple-choice",
      options: ["the fish", "the bird", "the cat", "the cow"]
    }
  },
  {
    category: "animals",
    spanish: "el caballo",
    english: "the horse",
    quiz: {
      type: "multiple-choice",
      options: ["the cow", "the horse", "the dog", "the cat"]
    }
  },
  {
    category: "animals",
    spanish: "la vaca",
    english: "the cow",
    quiz: {
      type: "multiple-choice",
      options: ["the pig", "the cow", "the horse", "the bird"]
    }
  },
  {
    category: "animals",
    spanish: "el pez",
    english: "the fish",
    quiz: {
      type: "multiple-choice",
      options: ["the fish", "the bird", "the dog", "the cat"]
    }
  },
  // Food
  {
    category: "food",
    spanish: "la manzana",
    english: "the apple",
    quiz: {
      type: "multiple-choice",
      options: ["the banana", "the bread", "the apple", "the cheese"]
    }
  },
  {
    category: "food",
    spanish: "el pan",
    english: "the bread",
    quiz: {
      type: "multiple-choice",
      options: ["the bread", "the milk", "the soup", "the rice"]
    }
  },
  {
    category: "food",
    spanish: "el queso",
    english: "the cheese",
    quiz: {
      type: "multiple-choice",
      options: ["the meat", "the egg", "the cheese", "the salad"]
    }
  },
  {
    category: "food",
    spanish: "la leche",
    english: "the milk",
    quiz: {
      type: "multiple-choice",
      options: ["the water", "the milk", "the bread", "the cheese"]
    }
  },
  {
    category: "food",
    spanish: "el arroz",
    english: "the rice",
    quiz: {
      type: "multiple-choice",
      options: ["the rice", "the bread", "the soup", "the egg"]
    }
  },
  {
    category: "food",
    spanish: "el huevo",
    english: "the egg",
    quiz: {
      type: "multiple-choice",
      options: ["the meat", "the egg", "the cheese", "the apple"]
    }
  },
  {
    category: "food",
    spanish: "la sopa",
    english: "the soup",
    quiz: {
      type: "multiple-choice",
      options: ["the soup", "the rice", "the bread", "the milk"]
    }
  },
  // Verbs
  {
    category: "verbs",
    spanish: "comer",
    english: "to eat",
    quiz: {
      type: "fill-in-the-blank"
    }
  },
  {
    category: "verbs",
    spanish: "beber",
    english: "to drink",
    quiz: {
      type: "fill-in-the-blank"
    }
  },
  {
    category: "verbs",
    spanish: "hablar",
    english: "to speak",
    quiz: {
      type: "fill-in-the-blank"
    }
  },
  {
    category: "verbs",
    spanish: "escribir",
    english: "to write",
    quiz: {
      type: "fill-in-the-blank"
    }
  },
  {
    category: "verbs",
    spanish: "leer",
    english: "to read",
    quiz: {
      type: "fill-in-the-blank"
    }
  },
  {
    category: "verbs",
    spanish: "caminar",
    english: "to walk",
    quiz: {
      type: "fill-in-the-blank"
    }
  },
  {
    category: "verbs",
    spanish: "dormir",
    english: "to sleep",
    quiz: {
      type: "fill-in-the-blank"
    }
  }
];

/** Get 4 options for multiple-choice (deterministic per card so UI is stable). */
export function getQuizOptions(card: Flashcard): string[] {
  if (card.quiz.type === "multiple-choice" && card.quiz.options.length >= 4) {
    return [...card.quiz.options];
  }
  const others = flashcards
    .filter((c) => c.category === card.category && c.english !== card.english)
    .map((c) => c.english);
  const unique = Array.from(new Set(others));
  const three = unique.slice(0, 3);
  const four = [card.english, ...three].sort((a, b) => a.localeCompare(b));
  return four;
}

