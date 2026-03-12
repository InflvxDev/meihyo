import SectionCard from "./SectionCard";

interface ProfileInfoCardProps {
  email: string;
  displayName: string;
  profileLoading: boolean;
  profileError: string | null;
  profileSuccess: string | null;
  hasProfileChanges: boolean;
  handleDisplayNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProfileSave: () => void;
  handleProfileCancel: () => void;
}

export default function ProfileInfoCard({
  email,
  displayName,
  profileLoading,
  profileError,
  profileSuccess,
  hasProfileChanges,
  handleDisplayNameChange,
  handleProfileSave,
  handleProfileCancel,
}: ProfileInfoCardProps) {
  return (
    <SectionCard>
      <h2 className="text-foreground font-semibold text-base mb-1">
        Información del perfil
      </h2>
      <p className="text-secondary/70 text-sm mb-5">
        Actualiza tu nombre de usuario visible en la plataforma.
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-foreground/70 text-sm font-medium mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full px-4 py-2.5 bg-secondary/5 border border-secondary/15 rounded-lg text-secondary/60 text-sm cursor-not-allowed select-none"
          />
        </div>

        <div>
          <label className="block text-foreground/70 text-sm font-medium mb-2">
            Nombre de usuario
          </label>
          <input
            type="text"
            value={displayName}
            onChange={handleDisplayNameChange}
            maxLength={50}
            placeholder="Tu nombre de usuario"
            className="w-full px-4 py-2.5 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary text-sm focus:outline-none focus:border-primary/50 focus:bg-secondary/15 transition-all"
          />
        </div>

        {profileError && <p className="text-red-400 text-sm">{profileError}</p>}
        {profileSuccess && <p className="text-green-400 text-sm">{profileSuccess}</p>}
      </div>

      <div
        className={`flex justify-end gap-3 mt-5 transition-all duration-200 ${
          hasProfileChanges ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={handleProfileCancel}
          disabled={profileLoading}
          className="px-4 py-2 text-sm font-medium text-secondary/80 hover:text-foreground border border-secondary/20 rounded-lg hover:bg-foreground/5 transition-all disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={handleProfileSave}
          disabled={profileLoading}
          className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {profileLoading ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </SectionCard>
  );
}
