import { useUserMenu } from "../../../hooks/shared/navbar/useUserMenu";
import { MdAccountCircle, MdAutorenew, MdSettings } from "react-icons/md";

interface UserMenuProps {
  userEmail?: string;
}

const UserMenu = ({ userEmail }: UserMenuProps) => {
  const { isOpen, setIsOpen, menuRef, handleSignOut } = useUserMenu();

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
