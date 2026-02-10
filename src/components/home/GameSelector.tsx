import { useState, useRef, useEffect } from "react";

interface Game {
  id: string;
  name: string;
  logo: string;
}

const GAMES: Game[] = [
  { id: "valorant", name: "Valorant", logo: "/logos/valorant.webp" },
  { id: "lol", name: "League of Legends", logo: "/logos/lol.webp" },
];

export default function GameSelector() {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar click fuera del contenedor para resetear el estado en mobile
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

 return (
    <section className="max-w-7xl mx-auto px-4 py-24 border-t border-foreground/5" ref={containerRef}>
      {/* 1. CAMBIO: justify-between -> justify-start y añadimos items-start para mejor alineación visual */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start gap-12">
        
        {/* Texto principal */}
        <div className="text-center lg:text-left min-w-75">
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight">
            Usa Meihyo en
            <br />
            <span className="relative inline-block mt-2">
              <span className={`
                transition-all duration-500 block
                ${hoveredGame ? 'text-primary' : 'text-secondary/50'}
              `}>
                {hoveredGame || 'cualquier juego'}
              </span>
              <span className={`absolute -bottom-1 left-0 h-1 bg-primary transition-all duration-500 ${hoveredGame ? 'w-full' : 'w-0'}`} />
            </span>
          </h2>
        </div>

        {/* 2. CAMBIO: Aseguramos que el contenedor de botones no tenga w-full y use justify-start */}
        <div className="flex flex-wrap gap-3 justify-start">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onMouseEnter={() => setHoveredGame(game.name)}
              onMouseLeave={() => setHoveredGame(null)}
              onClick={() => setHoveredGame(hoveredGame === game.name ? null : game.name)}
              className={`
                group relative size-20 md:size-24 rounded-xl border transition-all duration-200
                flex items-center justify-center overflow-hidden outline-none
                hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]
                ${
                  hoveredGame === game.name
                    ? 'border-primary bg-primary/5 -translate-y-1'
                    : 'border-foreground/10 bg-foreground/2 hover:border-foreground/20'
                }
              `}
            >
              <div className="relative z-10 flex items-center justify-center">
                <img
                  src={game.logo}
                  alt={game.name}
                  className="h-8 md:h-10 object-contain"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
