import { useState, useRef, useEffect } from 'react';

interface Game {
  id: string;
  name: string;
}

const GAMES: Game[] = [
  { id: 'valorant', name: 'Valorant' },
  { id: 'lol', name: 'League of Legends' },
];

export default function GameSelector() {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar click fuera del contenedor para resetear el estado en mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setHoveredGame(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-24 border-t border-foreground/5" ref={containerRef}>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Texto principal con ancho fijo para evitar saltos de layout */}
        <div className="text-center lg:text-left min-w-75">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            Usa Meihyo en
            <br />
            <span className="relative inline-block mt-2">
              <span className={`
                transition-all duration-500 block
                ${hoveredGame ? 'text-primary' : 'text-secondary/50'}
              `}>
                {hoveredGame || 'cualquier juego'}
              </span>
              {/* Línea decorativa inferior */}
              <span className={`absolute -bottom-1 left-0 h-1 bg-primary transition-all duration-500 ${hoveredGame ? 'w-full' : 'w-0'}`} />
            </span>
          </h2>
        </div>

        {/* Lista de juegos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl">
          {GAMES.map((game) => (
            <button
              key={game.id}
              onMouseEnter={() => setHoveredGame(game.name)}
              onMouseLeave={() => setHoveredGame(null)}
              onClick={() => setHoveredGame(hoveredGame === game.name ? null : game.name)}
              className={`
                group relative px-6 py-5 rounded-xl border transition-all duration-200
                text-left overflow-hidden outline-none
                /* Solución al flicker: usamos transform sobre un contenedor que no afecta al hit-area */
                hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]
                ${
                  hoveredGame === game.name
                    ? 'border-primary bg-primary/5 -translate-y-1'
                    : 'border-foreground/10 bg-foreground/2 hover:border-foreground/20'
                }
              `}
            >
              <div className="relative z-10 flex flex-col gap-1">
                <span className={`text-xs uppercase tracking-widest font-bold transition-colors ${hoveredGame === game.name ? 'text-primary' : 'text-secondary'}`}>
                  Trackeable
                </span>
                <span className="font-bold text-sm md:text-base">
                  {game.name}
                </span>
              </div>
              
              {/* Efecto de fondo sutil al hacer hover */}
              <div className="absolute inset-0 bg-linerar-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}