import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import { kdDisplay, kdClass, fmtDate } from "./utils";
import type { ValorantDeathmatch } from "../../../interfaces/valorant/ValorantDeathmatch";

export interface MobileCardProps {
  record: ValorantDeathmatch;
  isDeleting: boolean;
  isConfirming: boolean;
  isBlocked: boolean;
  onEdit: () => void;
  onDeleteRequest: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

export function MobileCard({
  record,
  isDeleting,
  isConfirming,
  isBlocked,
  onEdit,
  onDeleteRequest,
  onDeleteConfirm,
  onDeleteCancel,
}: MobileCardProps) {
  const kd = kdDisplay(record.asesinatos, record.muertes);
  const kdCls = kdClass(record.asesinatos, record.muertes);

  return (
    <div
      className={`rounded-xl border border-foreground/12 bg-secondary/10 transition-opacity ${
        isDeleting ? "opacity-40" : ""
      }`}
    >
      <div className="px-4 py-3">
        {/* header row: arma + date */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="text-foreground font-semibold text-base leading-tight">
            {record.arma ?? <span className="text-secondary/40 font-normal">Sin arma</span>}
          </span>
          <span className="text-secondary/50 text-xs whitespace-nowrap shrink-0 mt-0.5">
            {fmtDate(record.created_at)}
          </span>
        </div>

        {/* stats row: K / D / K·D */}
        <div className="flex items-center gap-0 mb-3 rounded-lg bg-secondary/8 border border-foreground/12 overflow-hidden">
          <div className="flex-1 text-center py-2 border-r border-foreground/12">
            <p className="text-secondary/60 text-xs uppercase tracking-wider mb-0.5">K</p>
            <p className="text-emerald-500 font-mono font-bold text-lg leading-none">
              {record.asesinatos ?? <span className="text-secondary/40 text-sm font-normal">—</span>}
            </p>
          </div>
          <div className="flex-1 text-center py-2 border-r border-foreground/12">
            <p className="text-secondary/60 text-xs uppercase tracking-wider mb-0.5">D</p>
            <p className="text-red-500 font-mono font-bold text-lg leading-none">
              {record.muertes ?? <span className="text-secondary/40 text-sm font-normal">—</span>}
            </p>
          </div>
          <div className="flex-1 text-center py-2">
            <p className="text-secondary/60 text-xs uppercase tracking-wider mb-0.5">K/D</p>
            <p className={`font-mono font-bold text-lg leading-none ${kdCls}`}>{kd}</p>
          </div>
        </div>

        {/* objetivo */}
        {record.objetivo && (
          <div className="flex items-start gap-1.5 mb-2">
            <span className="text-secondary/45 text-xs uppercase tracking-wide shrink-0 mt-0.5">
              Objetivo
            </span>
            <span className="text-secondary/80 text-sm">{record.objetivo}</span>
          </div>
        )}

        {/* observaciones */}
        {record.observaciones && (
          <div className="flex items-start gap-1.5 mb-3">
            <span className="text-secondary/45 text-xs uppercase tracking-wide shrink-0 mt-0.5">
              Obs.
            </span>
            <span className="text-secondary/70 text-sm line-clamp-2">{record.observaciones}</span>
          </div>
        )}

        {/* action row */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-foreground/8">
          {isConfirming ? (
            <>
              <span className="text-secondary/60 text-xs mr-auto">¿Eliminar?</span>
              <button
                onClick={onDeleteConfirm}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-500/25 transition-all"
              >
                <MdCheck size={14} />
                Sí
              </button>
              <button
                onClick={onDeleteCancel}
                className="flex items-center gap-1 px-3 py-1.5 bg-secondary/10 border border-foreground/10 text-secondary/75 text-xs font-semibold rounded-lg hover:bg-secondary/20 transition-all"
              >
                <MdClose size={14} />
                No
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onEdit}
                disabled={isBlocked}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 border border-foreground/10 text-secondary/75 text-xs font-medium rounded-lg hover:bg-secondary/20 hover:text-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <MdEdit size={14} />
                Editar
              </button>
              <button
                onClick={onDeleteRequest}
                disabled={isBlocked || isDeleting}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 border border-foreground/10 text-secondary/75 text-xs font-medium rounded-lg hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <MdDelete size={14} />
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
