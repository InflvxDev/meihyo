import { useState } from "react";
import { useThemeSelector } from "../shared/navbar/useThemeSelector";
import type { ToastType } from "../shared/useToast";

interface UseAccountPreferencesProps {
  initialEmail: string;
  initialDisplayName: string;
  addToast: (type: ToastType, message: string) => void;
}

export const useAccountPreferences = ({
  initialEmail,
  initialDisplayName,
  addToast,
}: UseAccountPreferencesProps) => {
  // ── Profile ─────────────────────────────────────────────────────────────
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [savedDisplayName, setSavedDisplayName] = useState(initialDisplayName);
  const [profileLoading, setProfileLoading] = useState(false);

  // ── Password modal ───────────────────────────────────────────────────────
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // ── Email modal ──────────────────────────────────────────────────────────
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  // ── Theme ────────────────────────────────────────────────────────────────
  const { theme, handleThemeChange, mounted } = useThemeSelector();

  // ── Profile handlers ─────────────────────────────────────────────────────
  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleProfileSave = async () => {
    if (!displayName.trim()) {
      addToast("error", "El nombre de usuario no puede estar vacío");
      return;
    }
    setProfileLoading(true);
    try {
      const res = await fetch("/api/account/updateDisplayName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: displayName.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedDisplayName(displayName.trim());
        addToast("success", "Nombre actualizado correctamente");
      } else {
        addToast("error", data.error ?? "Error al actualizar el nombre");
      }
    } catch {
      addToast("error", "Error de conexión");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleProfileCancel = () => {
    setDisplayName(savedDisplayName);
  };

  // ── Password handlers ─────────────────────────────────────────────────────
  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast("error", "Las contraseñas nuevas no coinciden");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      addToast("error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch("/api/account/updatePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        addToast("success", data.message ?? "Contraseña actualizada correctamente");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowPasswordModal(false);
      } else {
        addToast("error", data.error ?? "Error al actualizar la contraseña");
      }
    } catch {
      addToast("error", "Error de conexión");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswords({ current: false, new: false, confirm: false });
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // ── Email handlers ────────────────────────────────────────────────────────
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      addToast("error", "Formato de email inválido");
      return;
    }
    setEmailLoading(true);
    try {
      const res = await fetch("/api/account/updateEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });
      const data = await res.json();
      if (data.success) {
        addToast("success", data.message ?? "Revisa tu bandeja de entrada para confirmar el cambio");
        setShowEmailModal(false);
        setNewEmail("");
      } else {
        addToast("error", data.error ?? "Error al actualizar el correo");
      }
    } catch {
      addToast("error", "Error de conexión");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setNewEmail("");
  };

  return {
    // Read-only data
    email: initialEmail,
    // Profile
    displayName,
    profileLoading,
    hasProfileChanges: displayName !== savedDisplayName,
    handleDisplayNameChange,
    handleProfileSave,
    handleProfileCancel,
    // Password
    showPasswordModal,
    setShowPasswordModal,
    passwordForm,
    passwordLoading,
    showPasswords,
    handlePasswordFormChange,
    handlePasswordSubmit,
    handleClosePasswordModal,
    togglePasswordVisibility,
    // Email
    showEmailModal,
    setShowEmailModal,
    newEmail,
    setNewEmail,
    emailLoading,
    handleEmailSubmit,
    handleCloseEmailModal,
    // Theme
    theme,
    handleThemeChange,
    mounted,
  };
};
