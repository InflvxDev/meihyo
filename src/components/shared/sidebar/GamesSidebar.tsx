import { useState } from 'react';
import { IoHome } from 'react-icons/io5';
import { GAMES } from '../../../lib/const/Games';


const menuItems = [
  {
    id: 1,
    label: 'Dashboard',
    icon: IoHome,
    href: '/dashboard',
  },
];

export default function GamesSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-12.5 h-[calc(100vh-4rem)] bg-background border-r border-foreground/10 z-25 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-48' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Añadimos px-2 para que los botones nunca toquen los bordes laterales */}
      <nav className="flex flex-col items-start py-2 px-2 gap-1">
        {/* Opciones principales */}
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`
                flex items-center w-full py-2 
                rounded-xl transition-all duration-200
                hover:bg-foreground/10 text-foreground/70 hover:text-foreground 
                group outline-none no-underline
              `}
            >
              {/* Contenedor del Icono: Ajustamos el ancho para compensar el padding del nav */}
              <div className="w-12 h-8 flex items-center justify-center shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>

              <span
                className={`
                  font-medium text-sm whitespace-nowrap transition-all duration-300
                  ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
                `}
              >
                {item.label}
              </span>
            </a>
          );
        })}

        {/* Separador */}
        <div className="w-full h-px bg-foreground/10 my-2" />

        {/* Juegos */}
        {GAMES.map((game) => {
          const IconComponent = game.icon;
          return (
            <a
              key={game.id}
              href={`/game/${game.id}`}
              className={`
                flex items-center w-full py-2 
                rounded-xl transition-all duration-200
                hover:bg-foreground/10 text-foreground/70 hover:text-foreground 
                group outline-none no-underline
              `}
            >
              {/* Contenedor del Icono */}
              <div className="w-12 h-8 flex items-center justify-center shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>

              <span
                className={`
                  font-medium text-sm whitespace-nowrap transition-all duration-300
                  ${isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
                `}
              >
                {game.name}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}