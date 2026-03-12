import { MdEmail, MdLock, MdEdit } from "react-icons/md";
import SectionCard from "./SectionCard";

interface AccountIdentitiesCardProps {
  email: string;
  onChangePassword: () => void;
  onChangeEmail: () => void;
}

export default function AccountIdentitiesCard({
  email,
  onChangePassword,
  onChangeEmail,
}: AccountIdentitiesCardProps) {
  return (
    <SectionCard>
      <h2 className="text-foreground font-semibold text-base mb-1">
        Identidades de cuenta
      </h2>
      <p className="text-secondary/90 text-sm mb-5">
        Gestiona y actualiza los datos de tu cuenta.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 bg-secondary/5 border border-secondary/15 rounded-lg">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="text-secondary/60 shrink-0">
            <MdEmail className="w-5 h-5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs text-secondary/50 font-medium uppercase tracking-wider mb-0.5">
              Correo electrónico
            </p>
            <p className="text-secondary text-sm font-medium truncate">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={onChangePassword}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-secondary/80 border border-secondary/20 rounded-lg hover:bg-foreground/5 hover:text-foreground transition-all whitespace-nowrap"
          >
            <MdLock className="w-3.5 h-3.5" />
            Cambiar contraseña
          </button>
          <button
            type="button"
            onClick={onChangeEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-secondary/80 border border-secondary/20 rounded-lg hover:bg-foreground/5 hover:text-foreground transition-all whitespace-nowrap"
          >
            <MdEdit className="w-3.5 h-3.5" />
            Cambiar correo
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
