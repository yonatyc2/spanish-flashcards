export type Category = "animals" | "food" | "verbs";

export type QuizConfig =
  | {
      type: "multiple-choice";
      options: string[];
    }
  | {
      type: "fill-in-the-blank";
    };

export interface Flashcard {
  category: Category;
  spanish: string;
  english: string;
  quiz: QuizConfig;
}

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
  }
];

