import { useState, useEffect } from "react";

type Theme = "dark" | "light" | "system";

export const useThemeSelector = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  // Cargar tema guardado al montar
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) {
      setTheme(saved);
    }
    setMounted(true);
  }, []);

  // Aplicar tema al documento
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (theme === "system") {
      root.classList.remove("dark", "light");
      localStorage.removeItem("theme");
    } else {
      root.classList.remove("dark", "light");
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    handleThemeChange,
    mounted,
  };
};
