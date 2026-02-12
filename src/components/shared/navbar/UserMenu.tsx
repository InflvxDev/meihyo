import { useUserMenu } from "../../../hooks/shared/navbar/useUserMenu";
import { useThemeSelector } from "../../../hooks/shared/navbar/useThemeSelector";
import { MdAccountCircle, MdAutorenew, MdSettings, MdDarkMode, MdLightMode, MdSettingsBrightness } from "react-icons/md";

interface UserMenuProps {
  userEmail?: string;
}

const UserMenu = ({ userEmail }: UserMenuProps) => {
  const { isOpen, setIsOpen, menuRef, handleSignOut } = useUserMenu();
  const { theme, handleThemeChange } = useThemeSelector();

  const handleThemeSelect = (newTheme: 'dark' | 'light' | 'system') => {
    handleThemeChange(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border border-background  overflow-hidden cursor-pointer focus:outline-none"
      >
        <MdAccountCircle className="w-8 h-8"/>
      </button>

      <div
        className={`absolute right-0 mt-2 w-68  bg-background lg:bg-foreground/8 border border-foreground/10 rounded-lg shadow-xl py-1 z-100 transition-all duration-300 origin-top-right ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
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
          <MdSettings />
          Configuración de cuenta
        </a>
        <a
          href="/dashboard"
          className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/60 hover:bg-foreground/5 font-medium hover:text-foreground transition-colors"
        >
          <MdAutorenew />
          Mi Progreso
        </a>
        <div className="my-1 border-t border-foreground/10"></div>
        <div className="px-2 py-2">
          <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider px-2 mb-2">Tema</p>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => handleThemeSelect('dark')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-all ${
                theme === 'dark'
                  ? 'text-primary'
                  : 'text-foreground/60 hover:bg-foreground/10'
              }`}
            >
              <MdDarkMode className="w-4 h-4" />
              Oscuro
            </button>
            <button
              onClick={() => handleThemeSelect('light')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-all ${
                theme === 'light'
                  ? 'text-primary'
                  : 'text-foreground/60 hover:bg-foreground/10'
              }`}
            >
              <MdLightMode className="w-4 h-4" />
              Claro
            </button>
            <button
              onClick={() => handleThemeSelect('system')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-medium transition-all ${
                theme === 'system'
                  ? 'text-primary'
                  : 'text-foreground/60 hover:bg-foreground/10'
              }`}
            >
              <MdSettingsBrightness className="w-4 h-4" />
              Sistema
            </button>
          </div>
        </div>
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
