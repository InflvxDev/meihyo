import React, { useState, useRef, useEffect } from 'react';

interface UserMenuProps {
  userEmail?: string;
}

const UserMenu = ({ userEmail }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/signOut', {
        method: 'POST',
      });
      if (response.ok) {
        window.location.href = '/login';
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error de red al cerrar sesión:', error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-foreground flex items-center justify-center border border-background  overflow-hidden cursor-pointer focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 sm:w-5 sm:h-5 text-background"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-2 w-68 bg-foreground/8 border border-foreground/10 rounded-lg shadow-xl py-1 z-100 transition-all duration-300 origin-top-right ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {userEmail && (
          <>
            <div className="px-4 py-2 text-sm text-foreground font-bold truncate">
              {userEmail}
            </div>
            <div className="my-1 border-t border-foreground/10"></div>
          </>
        )}
        <a
          href="/account"
          className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/60 hover:bg-foreground/5 font-medium hover:text-foreground transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-primary/80"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 1 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          Configuración de cuenta
        </a>
        <div className="my-1 border-t border-foreground/10"></div>
        <button
          onClick={handleSignOut}
          className="w-full text-left block px-4 py-2 text-sm text-foreground/60 hover:bg-foreground/5 hover:text-foreground transition-colors cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
