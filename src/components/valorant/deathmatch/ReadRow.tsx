import { MdEdit, MdDelete } from "react-icons/md";
import { kdDisplay, kdClass, fmtDate } from "./utils";
import type { ValorantDeathmatch } from "../../../interfaces/valorant/ValorantDeathmatch";

export interface ReadRowProps {
  record: ValorantDeathmatch;
  isDeleting: boolean;
  isConfirming: boolean;
  isBlocked: boolean;
  onEdit: () => void;
  onDeleteRequest: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

export function ReadRow({
  record,
  isDeleting,
  isConfirming,
  isBlocked,
  onEdit,
  onDeleteRequest,
  onDeleteConfirm,
  onDeleteCancel,
}: ReadRowProps) {
  return (
    <tr
      className={`border-b border-foreground/5 last:border-0 transition-colors ${
        isDeleting ? "opacity-40" : "hover:bg-secondary/5"
      }`}
    >
      {/* Arma */}
      <td className="px-4 py-4">
        <span className="text-foreground text-base font-medium">
          {record.arma ?? <span className="text-secondary/40">—</span>}
        </span>
      </td>

      {/* K */}
      <td className="px-4 py-4 text-center">
        <span className="text-emerald-400 font-mono font-bold text-base">
          {record.asesinatos ?? <span className="text-secondary/40 text-sm font-normal">—</span>}
        </span>
      </td>

      {/* D */}
      <td className="px-4 py-4 text-center">
        <span className="text-red-400 font-mono font-bold text-base">
          {record.muertes ?? <span className="text-secondary/40 text-sm font-normal">—</span>}
        </span>
      </td>

      {/* K/D */}
      <td className={`px-4 py-4 text-center font-mono font-bold text-base ${kdClass(record.asesinatos, record.muertes)}`}>
        {kdDisplay(record.asesinatos, record.muertes)}
      </td>

      {/* Objetivo */}
      <td className="px-4 py-4">
        <span className="text-secondary/85 text-sm">
          {record.objetivo ?? <span className="text-secondary/40">—</span>}
        </span>
      </td>

      {/* Observaciones */}
      <td className="px-4 py-4 max-w-0">
        <span
          className="text-secondary/75 text-sm line-clamp-1 block"
          title={record.observaciones ?? ""}
        >
          {record.observaciones ?? <span className="text-secondary/40">—</span>}
        </span>
      </td>

      {/* Fecha */}
      <td className="px-4 py-4">
        <span className="text-secondary/65 text-sm whitespace-nowrap">{fmtDate(record.created_at)}</span>
      </td>

      {/* Acciones */}
      <td className="px-4 py-4">
        <div className="flex items-center justify-end gap-1.5">
          {isConfirming ? (
            <>
              <span className="text-red-400 text-sm whitespace-nowrap">¿Eliminar?</span>
              <button
                onClick={onDeleteConfirm}
                disabled={isDeleting}
                className="px-2.5 py-1.5 text-sm bg-red-500/15 text-red-400 rounded-md hover:bg-red-500/25 transition-colors disabled:opacity-50"
              >
                Sí
              </button>
              <button
                onClick={onDeleteCancel}
                className="px-2.5 py-1.5 text-sm text-secondary/50 hover:text-foreground rounded-md hover:bg-foreground/5 transition-colors"
              >
                No
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onEdit}
                disabled={isBlocked || isDeleting}
                className="p-2 text-secondary/60 hover:text-primary transition-colors rounded-md hover:bg-primary/10 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Editar"
              >
                <MdEdit size={17} />
              </button>
              <button
                onClick={onDeleteRequest}
                disabled={isBlocked || isDeleting}
                className="p-2 text-secondary/60 hover:text-red-400 transition-colors rounded-md hover:bg-red-400/10 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Eliminar"
              >
                {isDeleting ? <span className="text-sm">…</span> : <MdDelete size={17} />}
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
