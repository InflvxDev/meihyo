import { MdCheck, MdClose } from "react-icons/md";
import { INPUT, NUM_INPUT, SELECT_INPUT } from "./utils";
import { weapons } from "../../../lib/data/weapons";
import type { DeathmatchFormState } from "../../../hooks/valorant/useDeathmatchTracker";

export interface MobileEditCardProps {
  isNew?: boolean;
  arma: string;
  asesinatos: string;
  muertes: string;
  objetivo: string;
  observaciones: string;
  isSaving: boolean;
  liveKD: string;
  liveKDClass: string;
  onField: (field: keyof DeathmatchFormState, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function MobileEditCard({
  isNew = false,
  arma,
  asesinatos,
  muertes,
  objetivo,
  observaciones,
  isSaving,
  liveKD,
  liveKDClass,
  onField,
  onSave,
  onCancel,
}: MobileEditCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSave();
    if (e.key === "Escape") onCancel();
  };

  return (
    <div className="rounded-xl border border-primary/35 bg-primary/8">
      <div className="px-4 py-4 space-y-3">
        {/* title */}
        <p className="text-foreground/80 text-sm font-semibold">
          {isNew ? "Nueva partida" : "Editando partida"}
        </p>

        {/* arma */}
        <div>
          <label className="text-secondary/55 text-xs uppercase tracking-wide block mb-1">
            Arma
          </label>
          <select
            value={arma}
            onChange={e => onField("arma", e.target.value)}
            className={SELECT_INPUT}
            autoFocus={isNew}
          >
            <option value="">— seleccionar —</option>
            {weapons.map(w => (
              <option key={w.nombre} value={w.nombre}>
                {w.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* K / D / live KD */}
        <div className="grid grid-cols-3 gap-2 items-end">
          <div>
            <label className="text-emerald-400/70 text-xs uppercase tracking-wide block mb-1">K</label>
            <input
              type="number"
              min="0"
              max="99"
              step="1"
              value={asesinatos}
              onChange={e => onField("asesinatos", e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="0"
              className={NUM_INPUT}
            />
          </div>
          <div>
            <label className="text-red-400/70 text-xs uppercase tracking-wide block mb-1">D</label>
            <input
              type="number"
              min="0"
              max="99"
              step="1"
              value={muertes}
              onChange={e => onField("muertes", e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="0"
              className={NUM_INPUT}
            />
          </div>
          <div>
            <label className="text-secondary/55 text-xs uppercase tracking-wide block mb-1">K/D</label>
            <div className="w-full px-3 py-2 bg-secondary/10 border border-secondary/20 rounded-md text-center">
              <span className={`font-mono font-semibold text-sm ${liveKDClass}`}>{liveKD}</span>
            </div>
          </div>
        </div>

        {/* objetivo */}
        <div>
          <label className="text-secondary/55 text-xs uppercase tracking-wide block mb-1">
            Objetivo
          </label>
          <input
            type="text"
            value={objetivo}
            onChange={e => onField("objetivo", e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ej. Top frag, consistencia..."
            className={INPUT}
          />
        </div>

        {/* observaciones */}
        <div>
          <label className="text-secondary/55 text-xs uppercase tracking-wide block mb-1">
            Observaciones
          </label>
          <textarea
            value={observaciones}
            onChange={e => onField("observaciones", e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Notas de la partida..."
            rows={3}
            className={INPUT + " resize-none"}
          />
        </div>

        {/* actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdCheck size={16} />
            {isSaving ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-2 bg-secondary/10 border border-foreground/10 text-secondary/75 text-sm rounded-lg hover:bg-secondary/20 transition-all disabled:opacity-50"
          >
            <MdClose size={16} />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
