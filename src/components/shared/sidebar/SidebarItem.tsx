import type { Game } from '../../../interfaces/shared/Game';
import type React from 'react';

interface MenuItem {
  id: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface SidebarItemProps {
  item: Game | MenuItem;
  isExpanded: boolean;
  label: string;
  isGame?: boolean;
}

// Componente auxiliar para evitar repetición de código y mejorar el rendimiento
export function SidebarItem({ item, isExpanded, label, isGame = false }: SidebarItemProps) {
  const IconComponent = item.icon;
  const href = isGame ? `/game/${item.id}` : (item as MenuItem).href;

  return (
    <a
      href={href}
      className="flex items-center w-full py-2 rounded-xl transition-colors duration-200 hover:bg-foreground/10 text-foreground/50 hover:text-foreground group outline-none no-underline"
    >
      <div className="w-12 h-8 flex items-center justify-center shrink-0">
        <IconComponent className="w-5 h-5" />
      </div>

      <span
        className={`font-medium text-sm whitespace-nowrap transition-all duration-300 ${
          isExpanded 
            ? 'opacity-100 translate-x-0 visible' 
            : 'opacity-0 -translate-x-4 invisible'
        }`}
      >
        {label}
      </span>
    </a>
  );
}
