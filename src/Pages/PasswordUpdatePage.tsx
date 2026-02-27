import styles from "../styles/passwordupdatepage.module.css";
import commonStyles from "../styles/common.module.css";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";

const PasswordUpdatePage = () => {
  const { userId } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { user } = useAuth();
  const nav = useNavigate();

  async function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      // Validate password length
      if (newPassword.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }

      const passwordsMatch = newPassword === confirmNewPassword;
      if (!passwordsMatch) {
        toast.error("Passwords do not match");
        return;
      }

      await axios.patch(`${BACKEND_URL}/users/resetpassword/${userId}`, {
        newPassword,
      });

      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmNewPassword("");

      // Navigate after a short delay to show success message
      setTimeout(() => {
        if (user?.role === "masterAdmin") {
          nav("/masterdash");
        } else if (user?.role === "Admin") {
          nav(`/dashboard/${user.clientId}`);
        }
      }, 1500);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to update password. Please try again.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className={styles.passwordUpdatePage}>
      <h1>Password Update Page</h1>

      <form onSubmit={handlePasswordChange} className={commonStyles.form}>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </label>
        <label>
          Confirm new password:
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </label>
        <button type="submit" className={commonStyles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default PasswordUpdatePage;
