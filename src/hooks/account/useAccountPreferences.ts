import { useState } from "react";
import { useThemeSelector } from "../shared/navbar/useThemeSelector";

interface UseAccountPreferencesProps {
  initialEmail: string;
  initialDisplayName: string;
}

export const useAccountPreferences = ({
  initialEmail,
  initialDisplayName,
}: UseAccountPreferencesProps) => {
  // ── Profile ─────────────────────────────────────────────────────────────
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [savedDisplayName, setSavedDisplayName] = useState(initialDisplayName);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  // ── Password modal ───────────────────────────────────────────────────────
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // ── Email modal ──────────────────────────────────────────────────────────
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);

  // ── Theme ────────────────────────────────────────────────────────────────
  const { theme, handleThemeChange, mounted } = useThemeSelector();

  // ── Profile handlers ─────────────────────────────────────────────────────
  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
    setProfileError(null);
    setProfileSuccess(null);
  };

  const handleProfileSave = async () => {
    if (!displayName.trim()) {
      setProfileError("El nombre de usuario no puede estar vacío");
      return;
    }
    setProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(null);
    try {
      const res = await fetch("/api/account/updateDisplayName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: displayName.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setSavedDisplayName(displayName.trim());
        setProfileSuccess("Nombre actualizado correctamente");
        setTimeout(() => setProfileSuccess(null), 3000);
      } else {
        setProfileError(data.error ?? "Error al actualizar el nombre");
      }
    } catch {
      setProfileError("Error de conexión");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleProfileCancel = () => {
    setDisplayName(savedDisplayName);
    setProfileError(null);
    setProfileSuccess(null);
  };

  // ── Password handlers ─────────────────────────────────────────────────────
  const handlePasswordFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Las contraseñas nuevas no coinciden");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    setPasswordLoading(true);
    setPasswordError(null);
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
        setPasswordSuccess(data.message ?? "Contraseña actualizada");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => {
          setShowPasswordModal(false);
          setPasswordSuccess(null);
        }, 2000);
      } else {
        setPasswordError(data.error ?? "Error al actualizar la contraseña");
      }
    } catch {
      setPasswordError("Error de conexión");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordError(null);
    setPasswordSuccess(null);
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
      setEmailError("Formato de email inválido");
      return;
    }
    setEmailLoading(true);
    setEmailError(null);
    try {
      const res = await fetch("/api/account/updateEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailSuccess(data.message ?? "Correo actualizado");
        setTimeout(() => {
          setShowEmailModal(false);
          setEmailSuccess(null);
          setNewEmail("");
        }, 3500);
      } else {
        setEmailError(data.error ?? "Error al actualizar el correo");
      }
    } catch {
      setEmailError("Error de conexión");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setNewEmail("");
    setEmailError(null);
    setEmailSuccess(null);
  };

  return {
    // Read-only data
    email: initialEmail,
    // Profile
    displayName,
    profileLoading,
    profileError,
    profileSuccess,
    hasProfileChanges: displayName !== savedDisplayName,
    handleDisplayNameChange,
    handleProfileSave,
    handleProfileCancel,
    // Password
    showPasswordModal,
    setShowPasswordModal,
    passwordForm,
    passwordLoading,
    passwordError,
    passwordSuccess,
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
    emailError,
    emailSuccess,
    handleEmailSubmit,
    handleCloseEmailModal,
    // Theme
    theme,
    handleThemeChange,
    mounted,
  };
};
