import { useState, useCallback } from "react";

export type ToastType = "success" | "info" | "error";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  leaving: boolean;
}

const DISPLAY_DURATION = 4000;
const EXIT_DURATION = 300;

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, EXIT_DURATION);
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string) => {
      const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      setToasts((prev) => [...prev, { id, type, message, leaving: false }]);
      setTimeout(() => dismiss(id), DISPLAY_DURATION);
    },
    [dismiss]
  );

  return { toasts, addToast, dismiss };
}
