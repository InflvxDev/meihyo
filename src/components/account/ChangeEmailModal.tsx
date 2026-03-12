import Modal from "./Modal";

interface ChangeEmailModalProps {
  open: boolean;
  onClose: () => void;
  currentEmail: string;
  newEmail: string;
  setNewEmail: (value: string) => void;
  emailLoading: boolean;
  handleEmailSubmit: (e: React.FormEvent) => void;
}

export default function ChangeEmailModal({
  open,
  onClose,
  currentEmail,
  newEmail,
  setNewEmail,
  emailLoading,
  handleEmailSubmit,
}: ChangeEmailModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Cambiar correo electrónico">
      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
        <p className="text-secondary/70 text-sm">
          Se enviará un enlace de verificación a tu nuevo correo. El cambio será efectivo una vez
          que confirmes el enlace.
        </p>

        <div>
          <label className="block text-foreground/70 text-sm font-medium mb-2">
            Correo actual
          </label>
          <input
            type="email"
            value={currentEmail}
            readOnly
            className="w-full px-4 py-2.5 bg-secondary/5 border border-secondary/15 rounded-lg text-secondary/50 text-sm cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-foreground/70 text-sm font-medium mb-2">
            Nuevo correo electrónico
          </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
            placeholder="nuevo@email.com"
            className="w-full px-4 py-2.5 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary text-sm focus:outline-none focus:border-primary/50 focus:bg-secondary/15 transition-all"
          />
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-secondary/80 border border-secondary/20 rounded-lg hover:bg-foreground/5 hover:text-foreground transition-all"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={emailLoading}
            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {emailLoading ? "Enviando…" : "Enviar enlace"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
