import { MdClose } from "react-icons/md";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-background border border-foreground/10 rounded-xl shadow-2xl p-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-foreground font-semibold text-lg">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary/60 hover:text-foreground transition-colors p-1 rounded-md hover:bg-foreground/10"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
