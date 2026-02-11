import { useState, useRef, useEffect } from 'react';

export const useUserMenu = () => {
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

  return {
    isOpen,
    setIsOpen,
    menuRef,
    handleSignOut,
  };
};
