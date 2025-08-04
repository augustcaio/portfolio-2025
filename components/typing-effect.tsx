"use client";

import { useState, useEffect } from "react";

interface TypingEffectProps {
  phrases: string[];
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function TypingEffect({
  phrases,
  speed = 100,
  className = "",
  style,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isTyping && currentIndex < currentPhrase.length) {
      // Digitando
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (isTyping && currentIndex >= currentPhrase.length) {
      // Terminou de digitar, aguarda e começa a deletar
      const pauseTimeout = setTimeout(() => {
        setIsTyping(false);
        setIsDeleting(true);
      }, 1500); // 1.5 segundos de pausa

      return () => clearTimeout(pauseTimeout);
    } else if (isDeleting && currentIndex > 0) {
      // Deletando
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, currentIndex - 1));
        setCurrentIndex((prev) => prev - 1);
      }, speed / 2); // Deleta mais rápido que digita

      return () => clearTimeout(timeout);
    } else if (isDeleting && currentIndex === 0) {
      // Terminou de deletar, vai para próxima frase
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      setIsTyping(true);
    }
  }, [currentIndex, currentPhraseIndex, isTyping, isDeleting, phrases, speed]);

  return (
    <span className={className} style={style}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
