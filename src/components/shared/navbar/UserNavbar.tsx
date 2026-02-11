import UserMenu from './UserMenu';

interface UserNavbarProps {
  userEmail?: string;
}

const UserNavbar = ({ userEmail }: UserNavbarProps) => {
  return (
    <nav className="relative bg-background border-b border-foreground/10">
      <div className="flex items-center justify-between w-full px-0 py-0">
        <div className="flex items-center gap-2">
          <a
            href="/dashboard"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <img
              src="/favicon.webp"
              alt="Meihyo"
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
            />
          </a>
          <span className="hidden sm:inline text-foreground/40 text-xl">/</span>
          {userEmail ? (
            <span className="hidden sm:inline text-foreground text-xs sm:text-sm md:text-sm truncate font-bold max-w-70">
              {userEmail}
            </span>
          ) : (
            <span className="hidden sm:inline text-foreground text-xs sm:text-sm md:text-sm">Usuario</span>
          )}
        </div>

        <div className="flex items-center justify-end pr-2">
          <UserMenu userEmail={userEmail} />
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
