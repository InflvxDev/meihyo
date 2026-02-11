import { useState, useRef, useEffect } from "react";

export function useGameSelector() {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setHoveredGame(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return {
    hoveredGame,
    setHoveredGame,
    containerRef,
  };
}
