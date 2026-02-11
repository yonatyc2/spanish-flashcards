import React, { useState } from "react";

interface FlashcardProps {
  spanish: string;
  english: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ spanish, english }) => {
  const [flipped, setFlipped] = useState(false);

  const handleToggle = () => {
    setFlipped((prev) => !prev);
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

