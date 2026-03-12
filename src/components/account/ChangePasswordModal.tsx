import Modal from "./Modal";
import PasswordField from "./PasswordField";

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ShowPasswords {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  passwordForm: PasswordForm;
  passwordLoading: boolean;
  passwordError: string | null;
  passwordSuccess: string | null;
  showPasswords: ShowPasswords;
  handlePasswordFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordSubmit: (e: React.FormEvent) => void;
  togglePasswordVisibility: (field: "current" | "new" | "confirm") => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
  passwordForm,
  passwordLoading,
  passwordError,
  passwordSuccess,
  showPasswords,
  handlePasswordFormChange,
  handlePasswordSubmit,
  togglePasswordVisibility,
}: ChangePasswordModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Cambiar contraseña">
      <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
        <PasswordField
          label="Contraseña actual"
          name="currentPassword"
          value={passwordForm.currentPassword}
          visible={showPasswords.current}
          onChange={handlePasswordFormChange}
          onToggle={() => togglePasswordVisibility("current")}
        />
        <PasswordField
          label="Nueva contraseña"
          name="newPassword"
          value={passwordForm.newPassword}
          visible={showPasswords.new}
          onChange={handlePasswordFormChange}
          onToggle={() => togglePasswordVisibility("new")}
          placeholder="Mínimo 8 caracteres"
        />
        <PasswordField
          label="Confirmar nueva contraseña"
          name="confirmPassword"
          value={passwordForm.confirmPassword}
          visible={showPasswords.confirm}
          onChange={handlePasswordFormChange}
          onToggle={() => togglePasswordVisibility("confirm")}
        />

        {passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
        {passwordSuccess && <p className="text-green-400 text-sm">{passwordSuccess}</p>}

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
            disabled={passwordLoading}
            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {passwordLoading ? "Guardando…" : "Actualizar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
