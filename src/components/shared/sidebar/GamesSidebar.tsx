import { useState } from 'react';
import { IoHome } from 'react-icons/io5';
import { GAMES } from '../../../lib/const/Games';
import { SidebarItem } from './SidebarItem';

const menuItems = [
  { id: 1, label: 'Dashboard', icon: IoHome, href: '/dashboard' },
];

export default function GamesSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-12.5 h-[calc(100vh-4rem)] bg-background border-r border-foreground/10 z-25 transition-[width] duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'w-48' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Contenedor interno con ancho fijo para evitar que los elementos 
         "salten" o cambien de tamaño mientras la barra se expande 
      */}
      <nav className="flex flex-col items-start py-2 px-2 gap-1 w-48">
        {/* Opciones principales */}
        {menuItems.map((item) => (
          <SidebarItem key={item.id} item={item} isExpanded={isExpanded} label={item.label} />
        ))}

        {/* Separador */}
        <div className="w-full max-w-[calc(100%-1rem)] h-px bg-foreground/10 my-2" />

        {/* Juegos */}
        {GAMES.map((game) => (
          <SidebarItem key={game.id} item={game} isExpanded={isExpanded} label={game.name} isGame />
        ))}
      </nav>
    </aside>
  );
}