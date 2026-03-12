import { useAccountPreferences } from "../../hooks/account/useAccountPreferences";
import { useToast } from "../../hooks/shared/useToast";
import ToastContainer from "../shared/Toast";
import ProfileInfoCard from "./ProfileInfoCard";
import AccountIdentitiesCard from "./AccountIdentitiesCard";
import AppearanceCard from "./AppearanceCard";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangeEmailModal from "./ChangeEmailModal";

interface AccountPreferencesProps {
  userEmail: string;
  initialDisplayName: string;
}

export default function AccountPreferences({ userEmail, initialDisplayName }: AccountPreferencesProps) {
  const { toasts, addToast, dismiss } = useToast();

  const {
    email,
    displayName,
    profileLoading,
    hasProfileChanges,
    handleDisplayNameChange,
    handleProfileSave,
    handleProfileCancel,
    showPasswordModal,
    setShowPasswordModal,
    passwordForm,
    passwordLoading,
    showPasswords,
    handlePasswordFormChange,
    handlePasswordSubmit,
    handleClosePasswordModal,
    togglePasswordVisibility,
    showEmailModal,
    setShowEmailModal,
    newEmail,
    setNewEmail,
    emailLoading,
    handleEmailSubmit,
    handleCloseEmailModal,
    theme,
    handleThemeChange,
    mounted,
  } = useAccountPreferences({ initialEmail: userEmail, initialDisplayName, addToast });

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        <ProfileInfoCard
          email={email}
          displayName={displayName}
          profileLoading={profileLoading}
          hasProfileChanges={hasProfileChanges}
          handleDisplayNameChange={handleDisplayNameChange}
          handleProfileSave={handleProfileSave}
          handleProfileCancel={handleProfileCancel}
        />

        <AccountIdentitiesCard
          email={email}
          onChangePassword={() => setShowPasswordModal(true)}
          onChangeEmail={() => setShowEmailModal(true)}
        />

        <AppearanceCard
          theme={theme}
          mounted={mounted}
          handleThemeChange={handleThemeChange}
        />
      </div>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={handleClosePasswordModal}
        passwordForm={passwordForm}
        passwordLoading={passwordLoading}
        showPasswords={showPasswords}
        handlePasswordFormChange={handlePasswordFormChange}
        handlePasswordSubmit={handlePasswordSubmit}
        togglePasswordVisibility={togglePasswordVisibility}
      />

      <ChangeEmailModal
        open={showEmailModal}
        onClose={handleCloseEmailModal}
        currentEmail={email}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        emailLoading={emailLoading}
        handleEmailSubmit={handleEmailSubmit}
      />

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </>
  );
}
