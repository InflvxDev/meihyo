import { useTypingEffect } from '../../hooks/home/useTypingEffect';

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
  const displayedText = useTypingEffect({ texts, speed, delayBetweenTexts });

  return (
    <span className="relative inline">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
