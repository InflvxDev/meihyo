import { MdCheck, MdClose } from "react-icons/md";
import { INPUT, NUM_INPUT, SELECT_INPUT } from "./utils";
import { weapons } from "../../../lib/data/weapons";
import type { DeathmatchFormState } from "../../../hooks/valorant/useDeathmatchTracker";

export interface EditRowProps {
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

export function EditRow({
  isNew = false,
  arma, asesinatos, muertes, objetivo, observaciones,
  isSaving,
  liveKD,
  liveKDClass,
  onField,
  onSave,
  onCancel,
}: EditRowProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSave();
    if (e.key === "Escape") onCancel();
  };

  return (
    <tr
      className={`border-b border-primary/20 ${
        isNew ? "bg-primary/5" : "bg-primary/5 border-l-2 border-l-primary/40"
      }`}
    >
      {/* Arma */}
      <td className="px-3 py-3">
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
      </td>

      {/* K */}
      <td className="px-3 py-3">
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
      </td>

      {/* D */}
      <td className="px-3 py-3">
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
      </td>

      {/* K/D live preview */}
      <td className={`px-3 py-3 text-center font-mono text-sm font-semibold ${liveKDClass}`}>
        {liveKD}
      </td>

      {/* Objetivo */}
      <td className="px-3 py-3">
        <input
          type="text"
          value={objetivo}
          onChange={e => onField("objetivo", e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ej. 40 kills"
          className={INPUT}
          maxLength={100}
        />
      </td>

      {/* Observaciones */}
      <td className="px-3 py-3">
        <input
          type="text"
          value={observaciones}
          onChange={e => onField("observaciones", e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Notas..."
          className={INPUT}
          maxLength={200}
        />
      </td>

      {/* Fecha */}
      <td className="px-4 py-3">
        <span className="text-secondary/50 text-sm">Hoy</span>
      </td>

      {/* Acciones */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            <MdCheck size={15} />
            {isSaving ? "…" : "Guardar"}
          </button>
          <button
            onClick={onCancel}
            className="p-2 text-secondary/40 hover:text-foreground transition-colors rounded-md hover:bg-foreground/5"
            title="Cancelar (Esc)"
          >
            <MdClose size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}
