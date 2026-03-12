import SectionCard from "./SectionCard";
import { LightPreview, DarkPreview, SystemPreview } from "./ThemePreviews";

type Theme = "dark" | "light" | "system";

interface AppearanceCardProps {
  theme: Theme;
  mounted: boolean;
  handleThemeChange: (theme: Theme) => void;
}

const themeOptions: { id: Theme; label: string; Preview: () => React.ReactElement }[] = [
  { id: "light", label: "Claro", Preview: LightPreview },
  { id: "dark", label: "Oscuro", Preview: DarkPreview },
  { id: "system", label: "Sistema", Preview: SystemPreview },
];

export default function AppearanceCard({ theme, mounted, handleThemeChange }: AppearanceCardProps) {
  return (
    <SectionCard>
      <h2 className="text-foreground font-semibold text-base mb-1">Apariencia</h2>
      <p className="text-secondary/70 text-sm mb-5">
        Elija cómo se ve y se comporta Meihyo en el panel.
      </p>

      <div>
        <p className="text-foreground/80 text-sm font-medium mb-1">Modo tema</p>
        <p className="text-secondary/60 text-xs mb-4">
          Elige cómo te parece Meihyo. Selecciona un solo tema o sincronízalo con tu sistema.
        </p>

        {mounted && (
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {themeOptions.map(({ id, label, Preview }) => {
              const isActive = theme === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleThemeChange(id)}
                  className={`flex flex-col items-center gap-2.5 p-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-secondary/15 hover:border-secondary/40 hover:bg-foreground/3"
                  }`}
                >
                  <div className="w-full aspect-3/2 rounded-lg overflow-hidden ring-1 ring-foreground/10">
                    <Preview />
                  </div>
                  <span
                    className={`text-xs font-medium transition-colors ${
                      isActive ? "text-primary" : "text-secondary/70"
                    }`}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
