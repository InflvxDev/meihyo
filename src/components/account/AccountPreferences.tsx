import { useAccountPreferences } from "../../hooks/account/useAccountPreferences";
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
  const {
    email,
    displayName,
    profileLoading,
    profileError,
    profileSuccess,
    hasProfileChanges,
    handleDisplayNameChange,
    handleProfileSave,
    handleProfileCancel,
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
    showEmailModal,
    setShowEmailModal,
    newEmail,
    setNewEmail,
    emailLoading,
    emailError,
    emailSuccess,
    handleEmailSubmit,
    handleCloseEmailModal,
    theme,
    handleThemeChange,
    mounted,
  } = useAccountPreferences({ initialEmail: userEmail, initialDisplayName });

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        <ProfileInfoCard
          email={email}
          displayName={displayName}
          profileLoading={profileLoading}
          profileError={profileError}
          profileSuccess={profileSuccess}
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
        passwordError={passwordError}
        passwordSuccess={passwordSuccess}
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
        emailError={emailError}
        emailSuccess={emailSuccess}
        handleEmailSubmit={handleEmailSubmit}
      />
    </>
  );
}
