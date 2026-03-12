import { useMemo, useRef, useState } from "react";
import { MdAdd, MdArrowBack, MdGpsFixed } from "react-icons/md";
import { useDeathmatchTracker } from "../../hooks/valorant/useDeathmatchTracker";
import ToastContainer from "../shared/Toast";
import { kdDisplay, kdClass } from "./deathmatch/utils";
import { SkeletonRow } from "./deathmatch/SkeletonRow";
import { ReadRow } from "./deathmatch/ReadRow";
import { EditRow } from "./deathmatch/EditRow";
import { StatsBar } from "./deathmatch/StatsBar";
import { MobileCard } from "./deathmatch/MobileCard";
import { MobileEditCard } from "./deathmatch/MobileEditCard";

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

    // most used weapon
    const armaCounts: Record<string, number> = {};
    records.forEach(r => {
      if (r.arma) armaCounts[r.arma] = (armaCounts[r.arma] ?? 0) + 1;
    });
    const topArma = Object.entries(armaCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    return {
      total: records.length,
      totalK,
      totalD,
      kd: kdDisplay(totalK, totalD),
      kdCls: kdClass(totalK, totalD),
      topArma,
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
      {/* ── HERO BANNER ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-xl border border-foreground/10 bg-secondary/5 mb-5">
        {/* decorative top glow line */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/55 to-transparent" />
        {/* decorative bg blob */}
        <div className="absolute -top-10 left-1/3 w-96 h-44 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-12 right-10 w-64 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 px-5 sm:px-7 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {/* back link */}
            <a
              href="/game/valorant"
              className="inline-flex items-center gap-1.5 text-secondary/55 hover:text-foreground text-sm transition-colors mb-3"
            >
              <MdArrowBack size={16} className="shrink-0" />
              <span>Valorant</span>
            </a>

            <h1 className="text-foreground font-bold text-2xl sm:text-3xl tracking-tight">
              Tracker · Deathmatch
            </h1>

            {/* stats strip */}
            {!loading && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                <span className="text-secondary/65 text-sm">
                  {stats.total} {stats.total === 1 ? "partida" : "partidas"}
                </span>
                <span className="text-secondary/35 text-sm">·</span>
                <span className="text-secondary/65 text-sm">
                  K/D global{" "}
                  <span className={`font-mono font-semibold ${stats.kdCls}`}>
                    {stats.kd}
                  </span>
                </span>
                <span className="text-secondary/35 text-sm hidden sm:inline">·</span>
                <span className="font-mono text-sm hidden sm:inline">
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
              className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed self-start sm:self-auto shrink-0 shadow-lg shadow-primary/20"
            >
              <MdAdd size={19} />
              Nueva partida
            </button>
          )}
        </div>
      </div>

      {/* ── STATS CARDS ─────────────────────────────────────────────── */}
      {!loading && (
        <div className="mb-5">
          <StatsBar
            total={stats.total}
            totalK={stats.totalK}
            kd={stats.kd}
            kdCls={stats.kdCls}
            topArma={stats.topArma}
          />
        </div>
      )}

      {/* ── content wrapper ───────────────────────────────────────── */}
      <div className="space-y-5">

      {/* ══ VISTA MÓVIL: tarjetas (oculto en md+) ══════════════════════ */}
      <div className="md:hidden space-y-3">
        {/* nueva tarjeta (form) */}
        {editingId === "new" && (
          <MobileEditCard
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

        {/* skeleton */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-foreground/10 bg-secondary/5 p-4 space-y-3 animate-pulse">
              <div className="flex justify-between">
                <div className="h-4 w-28 rounded bg-secondary/15" />
                <div className="h-3 w-16 rounded bg-secondary/10" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 rounded-lg bg-secondary/10" />
                <div className="h-12 rounded-lg bg-secondary/10" />
                <div className="h-12 rounded-lg bg-secondary/10" />
              </div>
              <div className="h-3 w-3/4 rounded bg-secondary/10" />
            </div>
          ))}

        {/* empty state */}
        {!loading && records.length === 0 && editingId !== "new" && (
          <div className="rounded-xl border border-foreground/10 bg-secondary/5 px-4 py-14 flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-secondary/10 border border-foreground/10 flex items-center justify-center">
              <MdGpsFixed size={26} className="text-secondary/30" />
            </div>
            <div className="text-center">
              <p className="text-foreground/75 text-base font-semibold">Sin partidas registradas</p>
              <p className="text-secondary/50 text-sm mt-1 max-w-xs">
                Pulsa "Nueva partida" para añadir tu primera sesión.
              </p>
            </div>
          </div>
        )}

        {/* tarjetas de registros */}
        {!loading &&
          records.map(record => {
            const isEditing = editingId === record.id;

            if (isEditing) {
              return (
                <MobileEditCard
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
              <MobileCard
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
      </div>

      {/* ══ VISTA DESKTOP: tabla (oculto debajo de md) ══════════════════ */}
      {/* ── table ───────────────────────────────────────────────────── */}
      <div className="hidden md:block bg-background border border-foreground/10 rounded-xl overflow-hidden">
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
                    <td colSpan={8} className="px-4 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-secondary/10 border border-foreground/10 flex items-center justify-center">
                          <MdGpsFixed size={30} className="text-secondary/30" />
                        </div>
                        <div>
                          <p className="text-foreground/75 text-base font-semibold">
                            Sin partidas registradas
                          </p>
                          <p className="text-secondary/50 text-sm mt-1 max-w-xs mx-auto">
                            Registra tu primera sesión de Deathmatch para ver tus estadísticas.
                          </p>
                        </div>
                      </div>
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

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
      </div>
    </div>
  );
}
