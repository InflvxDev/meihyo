import { useState, useEffect, useCallback } from "react";
import { useToast } from "../shared/useToast";
import type { ValorantDeathmatch } from "../../interfaces/valorant/ValorantDeathmatch";

export type DeathmatchFormState = {
  arma: string;
  asesinatos: string;
  muertes: string;
  objetivo: string;
  observaciones: string;
};

const EMPTY_FORM: DeathmatchFormState = {
  arma: "",
  asesinatos: "",
  muertes: "",
  objetivo: "",
  observaciones: "",
};

export function useDeathmatchTracker() {
  const [records, setRecords] = useState<ValorantDeathmatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [editForm, setEditForm] = useState<DeathmatchFormState>(EMPTY_FORM);
  const [savingId, setSavingId] = useState<number | "new" | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { toasts, addToast, dismiss } = useToast();

  const fetchRecords = useCallback(async () => {
    try {
      const res = await fetch("/api/valorant/deathmatch");
      if (!res.ok) throw new Error("Network error");
      const json = await res.json();
      if (json.success) {
        setRecords(json.data ?? []);
      } else {
        addToast("error", json.error ?? "Error al cargar las partidas");
      }
    } catch {
      addToast("error", "Error al cargar las partidas");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const startNew = useCallback(() => {
    setEditingId("new");
    setEditForm(EMPTY_FORM);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setEditForm(EMPTY_FORM);
  }, []);

  const startEdit = useCallback((record: ValorantDeathmatch) => {
    setEditingId(record.id);
    setEditForm({
      arma: record.arma ?? "",
      asesinatos: record.asesinatos?.toString() ?? "",
      muertes: record.muertes?.toString() ?? "",
      objetivo: record.objetivo ?? "",
      observaciones: record.observaciones ?? "",
    });
  }, []);

  const updateField = useCallback((field: keyof DeathmatchFormState, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const parseNum = (v: string) => (v !== "" ? parseInt(v, 10) : null);

  const saveNew = useCallback(async () => {
    setSavingId("new");
    try {
      const res = await fetch("/api/valorant/deathmatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          arma: editForm.arma || null,
          asesinatos: parseNum(editForm.asesinatos),
          muertes: parseNum(editForm.muertes),
          objetivo: editForm.objetivo || null,
          observaciones: editForm.observaciones || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setRecords(prev => [json.data, ...prev]);
        setEditingId(null);
        setEditForm(EMPTY_FORM);
        addToast("success", "Partida registrada correctamente");
      } else {
        addToast("error", json.error ?? "Error al guardar la partida");
      }
    } catch {
      addToast("error", "Error al guardar la partida");
    } finally {
      setSavingId(null);
    }
  }, [editForm, addToast]);

  const saveEdit = useCallback(async (id: number) => {
    setSavingId(id);
    try {
      const res = await fetch("/api/valorant/deathmatch", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          arma: editForm.arma || null,
          asesinatos: parseNum(editForm.asesinatos),
          muertes: parseNum(editForm.muertes),
          objetivo: editForm.objetivo || null,
          observaciones: editForm.observaciones || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setRecords(prev => prev.map(r => (r.id === id ? json.data : r)));
        setEditingId(null);
        setEditForm(EMPTY_FORM);
        addToast("success", "Partida actualizada correctamente");
      } else {
        addToast("error", json.error ?? "Error al actualizar la partida");
      }
    } catch {
      addToast("error", "Error al actualizar la partida");
    } finally {
      setSavingId(null);
    }
  }, [editForm, addToast]);

  const deleteRecord = useCallback(async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch("/api/valorant/deathmatch", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (json.success) {
        setRecords(prev => prev.filter(r => r.id !== id));
        addToast("success", "Partida eliminada correctamente");
      } else {
        addToast("error", json.error ?? "Error al eliminar la partida");
      }
    } catch {
      addToast("error", "Error al eliminar la partida");
    } finally {
      setDeletingId(null);
    }
  }, [addToast]);

  return {
    records,
    loading,
    editingId,
    editForm,
    savingId,
    deletingId,
    toasts,
    dismiss,
    startNew,
    cancelEdit,
    startEdit,
    updateField,
    saveNew,
    saveEdit,
    deleteRecord,
  };
}
