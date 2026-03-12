import { useMemo, useRef, useState } from "react";
import { MdAdd, MdArrowBack } from "react-icons/md";
import { useDeathmatchTracker } from "../../hooks/valorant/useDeathmatchTracker";
import ToastContainer from "../shared/Toast";
import { kdDisplay, kdClass } from "./deathmatch/utils";
import { SkeletonRow } from "./deathmatch/SkeletonRow";
import { ReadRow } from "./deathmatch/ReadRow";
import { EditRow } from "./deathmatch/EditRow";

export default function DeathmatchTracker() {
  const {
    records, loading, editingId, editForm, savingId, deletingId,
    toasts, dismiss,
    startNew, cancelEdit, startEdit, updateField,
    saveNew, saveEdit, deleteRecord,
  } = useDeathmatchTracker();

  const [confirmId, setConfirmId] = useState<number | null>(null);
  const confirmTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestDelete = (id: number) => {
    setConfirmId(id);
    if (confirmTimer.current) clearTimeout(confirmTimer.current);
    confirmTimer.current = setTimeout(() => setConfirmId(null), 3000);
  };

  const cancelConfirm = () => {
    if (confirmTimer.current) clearTimeout(confirmTimer.current);
    setConfirmId(null);
  };

  const handleDeleteConfirm = (id: number) => {
    deleteRecord(id);
    cancelConfirm();
  };

  // aggregate stats
  const stats = useMemo(() => {
    const totalK = records.reduce((s, r) => s + (r.asesinatos ?? 0), 0);
    const totalD = records.reduce((s, r) => s + (r.muertes ?? 0), 0);
    return {
      total: records.length,
      totalK,
      totalD,
      kd: kdDisplay(totalK, totalD),
      kdCls: kdClass(totalK, totalD),
    };
  }, [records]);

  // live K/D while editing
  const liveK = editForm.asesinatos !== "" ? parseInt(editForm.asesinatos, 10) : null;
  const liveD = editForm.muertes !== "" ? parseInt(editForm.muertes, 10) : null;
  const liveKD = kdDisplay(liveK, liveD);
  const liveKDCls = kdClass(liveK, liveD);

  const isBusy = editingId !== null;

  return (
    <div className="p-4 sm:p-6 w-full min-h-screen">
      {/* ── back button ─────────────────────────────────────────────── */}
      <div className="mb-4">
        <a
          href="/game/valorant"
          className="inline-flex items-center gap-1.5 text-secondary/70 hover:text-foreground text-sm transition-colors"
        >
          <MdArrowBack size={18} className="shrink-0" />
          <span className="hidden sm:inline">Valorant</span>
        </a>
      </div>

      {/* ── content wrapper ───────────────────────────────────────── */}
      <div className="space-y-5">
      {/* ── header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-foreground font-bold text-xl sm:text-2xl">
            Tracker · Deathmatch
          </h1>

          {/* stats strip */}
          {!loading && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
              <span className="text-secondary/75 text-xs">
                {stats.total} {stats.total === 1 ? "partida" : "partidas"}
              </span>
              <span className="text-secondary/40 text-xs hidden sm:inline">·</span>
              <span className="text-secondary/75 text-xs">
                K/D global{" "}
                <span className={`font-mono font-semibold ${stats.kdCls}`}>
                  {stats.kd}
                </span>
              </span>
              <span className="text-secondary/40 text-xs hidden sm:inline">·</span>
              <span className="font-mono text-xs">
                <span className="text-emerald-400">{stats.totalK}K</span>
                <span className="text-secondary/50"> / </span>
                <span className="text-red-400">{stats.totalD}D</span>
              </span>
            </div>
          )}
        </div>

        {editingId !== "new" && (
          <button
            onClick={startNew}
            disabled={isBusy}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed self-start sm:self-auto shrink-0"
          >
            <MdAdd size={18} />
            Nueva partida
          </button>
        )}
      </div>

      {/* ── table ───────────────────────────────────────────────────── */}
      <div className="bg-background border border-foreground/10 rounded-xl overflow-hidden">
        {/* right-edge fade hint for horizontal scroll on mobile */}
        <div className="relative">
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent pointer-events-none md:hidden z-10 rounded-r-xl" />

          <div className="overflow-x-auto">
            <table className="w-full text-base min-w-250">
              <colgroup>
                <col className="w-44" />
                <col className="w-20" />
                <col className="w-20" />
                <col className="w-24" />
                <col className="w-56" />
                <col />
                <col className="w-32" />
                <col className="w-44" />
              </colgroup>

              <thead>
                <tr className="border-b border-foreground/10 bg-secondary/5">
                  <th className="px-4 py-4 text-left   text-sm font-semibold text-secondary/75 uppercase tracking-wider">Arma</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-emerald-400/80 uppercase tracking-wider">K</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-red-400/80 uppercase tracking-wider">D</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-secondary/75 uppercase tracking-wider">K/D</th>
                  <th className="px-4 py-4 text-left   text-sm font-semibold text-secondary/75 uppercase tracking-wider">Objetivo</th>
                  <th className="px-4 py-4 text-left   text-sm font-semibold text-secondary/75 uppercase tracking-wider">Observaciones</th>
                  <th className="px-4 py-4 text-left   text-sm font-semibold text-secondary/75 uppercase tracking-wider">Fecha</th>
                  <th className="px-4 py-4" />
                </tr>
              </thead>

              <tbody>
                {/* new row */}
                {editingId === "new" && (
                  <EditRow
                    isNew
                    arma={editForm.arma}
                    asesinatos={editForm.asesinatos}
                    muertes={editForm.muertes}
                    objetivo={editForm.objetivo}
                    observaciones={editForm.observaciones}
                    isSaving={savingId === "new"}
                    liveKD={liveKD}
                    liveKDClass={liveKDCls}
                    onField={updateField}
                    onSave={saveNew}
                    onCancel={cancelEdit}
                  />
                )}

                {/* loading skeleton */}
                {loading && Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

                {/* empty state */}
                {!loading && records.length === 0 && editingId !== "new" && (
                  <tr>
                    <td colSpan={8} className="px-4 py-16 text-center">
                      <p className="text-secondary/80 text-sm font-medium">Sin partidas registradas</p>
                      <p className="text-secondary/55 text-xs mt-1">
                        Pulsa "Nueva partida" para añadir tu primera sesión.
                      </p>
                    </td>
                  </tr>
                )}

                {/* records */}
                {!loading &&
                  records.map(record => {
                    const isEditing = editingId === record.id;

                    if (isEditing) {
                      return (
                        <EditRow
                          key={record.id}
                          arma={editForm.arma}
                          asesinatos={editForm.asesinatos}
                          muertes={editForm.muertes}
                          objetivo={editForm.objetivo}
                          observaciones={editForm.observaciones}
                          isSaving={savingId === record.id}
                          liveKD={liveKD}
                          liveKDClass={liveKDCls}
                          onField={updateField}
                          onSave={() => saveEdit(record.id)}
                          onCancel={cancelEdit}
                        />
                      );
                    }

                    return (
                      <ReadRow
                        key={record.id}
                        record={record}
                        isDeleting={deletingId === record.id}
                        isConfirming={confirmId === record.id}
                        isBlocked={isBusy}
                        onEdit={() => startEdit(record)}
                        onDeleteRequest={() => requestDelete(record.id)}
                        onDeleteConfirm={() => handleDeleteConfirm(record.id)}
                        onDeleteCancel={cancelConfirm}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* hint for mobile */}
      {!loading && records.length > 0 && (
        <p className="text-secondary/25 text-xs text-center md:hidden">
          Desliza la tabla para ver más columnas
        </p>
      )}

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      </div>
    </div>
  );
}
