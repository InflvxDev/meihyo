import type { ToastItem, ToastType } from "../../hooks/shared/useToast";
import { MdCheckCircle, MdInfo, MdError, MdClose } from "react-icons/md";

const CONFIG: Record<
  ToastType,
  { Icon: React.ComponentType<{ size: number }>; iconClass: string; borderClass: string }
> = {
  success: {
    Icon: MdCheckCircle,
    iconClass: "text-emerald-400",
    borderClass: "border-l-emerald-500",
  },
  info: {
    Icon: MdInfo,
    iconClass: "text-blue-400",
    borderClass: "border-l-blue-500",
  },
  error: {
    Icon: MdError,
    iconClass: "text-red-400",
    borderClass: "border-l-red-500",
  },
};

function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const { Icon, iconClass, borderClass } = CONFIG[toast.type];

  return (
    <div
      style={{
        animation: toast.leaving
          ? "toast-out 0.3s ease-in both"
          : "toast-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
      }}
      className={`flex items-start gap-3 px-4 py-3 rounded-xl bg-background border border-foreground/10 border-l-4 ${borderClass} shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] min-w-70 max-w-105 pointer-events-auto`}
    >
      <span className={`shrink-0 mt-0.5 flex items-center ${iconClass}`}>
        <Icon size={20} />
      </span>
      <p className="text-sm font-medium text-foreground flex-1 leading-snug">
        {toast.message}
      </p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-secondary/40 hover:text-secondary/80 transition-colors ml-1 mt-0.5"
        aria-label="Cerrar notificación"
      >
        <MdClose size={16} />
      </button>
    </div>
  );
}

export default function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center z-9999 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
