import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/loginpage.module.css";
import commonStyles from "../styles/common.module.css";

import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import type { User } from "../types/auth";

export const resolvePostLoginPath = (user: User | null): string | null => {
  if (!user) {
    return null;
  }

  if (user.resetPassword === true) {
    return `/resetpassword/${user.userId}`;
  }

  if (user.role === "masterAdmin") {
    return "/masterdash";
  }

  if (user.role === "Admin") {
    return `/dashboard/${user.clientId}`;
  }

  return null;
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { login, user } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error: unknown) {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      // Error handling is done in authProvider, but we catch here to prevent unhandled rejection
      // Toast notification is already shown by authProvider
    }
  }
  useEffect(() => {
    const targetPath = resolvePostLoginPath(user);

    if (targetPath) {
      nav(targetPath);
    }
  }, [user, nav]);

  return (
    <div className={styles.loginpage}>
      <h1 className={styles.h1}>Login</h1>
      <form onSubmit={handleSubmit} className={commonStyles.form}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className={commonStyles.button}>
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
