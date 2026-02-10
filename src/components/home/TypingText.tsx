import { useState, useEffect } from 'react';

interface TypingTextProps {
  texts: string[];
  speed?: number;
  delayBetweenTexts?: number;
}

export default function TypingText({ 
  texts, 
  speed = 50, 
  delayBetweenTexts = 1500,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      // Borrando texto
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, speed / 2);
      }
    } else {
      // Escribiendo texto
      if (displayedText === currentText) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenTexts);
      } else {
        timer = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, speed);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTextIndex, texts, speed, delayBetweenTexts]);

  return (
    <span className="relative inline">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
