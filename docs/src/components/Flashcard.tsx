import React, { useState } from "react";

interface FlashcardProps {
  spanish: string;
  english: string;
  /** Controlled mode: parent tracks flip state (e.g. for showing Right/Wrong). */
  flipped?: boolean;
  onFlipChange?: (flipped: boolean) => void;
}

// Single flashcard that toggles between Spanish (front) and English (back)
// when the user clicks or taps it.
export const Flashcard: React.FC<FlashcardProps> = ({
  spanish,
  english,
  flipped: controlledFlipped,
  onFlipChange
}) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isControlled = controlledFlipped !== undefined && onFlipChange != null;
  const flipped = isControlled ? controlledFlipped : internalFlipped;

  const handleToggle = () => {
    if (isControlled) {
      onFlipChange(!flipped);
    } else {
      setInternalFlipped((prev) => !prev);
    }
  };

  const isFront = !flipped;

  return (
    <button type="button" className="flashcard" onClick={handleToggle}>
      <div className="flashcard__inner">
        <p className="flashcard__label">{isFront ? "Spanish" : "English"}</p>
        <p className="flashcard__text">{isFront ? spanish : english}</p>
        <p className="flashcard__hint">
          {isFront ? "Tap to see English" : "Tap to go back to Spanish"}
        </p>
      </div>
    </button>
  );
};
