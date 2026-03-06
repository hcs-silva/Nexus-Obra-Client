import styles from "../styles/navbar.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { roleConfig } from "../config/roleConfig";
import type { UserRole } from "../config/roleConfig";
import apiClient from "../api/httpClient";

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const nav = useNavigate();
  const [logoToDisplay, setLogoToDisplay] = useState<string>();
  const role: UserRole = (isLoggedIn ? user?.role : "guest") ?? "guest";
  const items = role ? roleConfig.actions[role] : [];

  const handlers: Record<string, () => void> = {
    login: () => nav("/login"),
    logout: () => {
      logout();
      nav("/");
    },
  };

  const visibleItems = isLoggedIn
    ? items
    : items.filter((it) => !("onClick" in it && it.onClick === "login"));

  const resolvePath = (to: string) => {
    if (to.includes(":clientId")) {
      if (user?.clientId) {
        return to.replace(":clientId", user.clientId);
      }

      return "/masterdash";
    }

    return to;
  };

  useEffect(() => {
    if (!isLoggedIn || !user || !user.clientId) {
      setLogoToDisplay(undefined);
      return;
    }

    apiClient
      .get(`/clients/${user?.clientId}`)
      .then((response) => {
        const logoUrl = response.data.clientLogo;

        setLogoToDisplay(logoUrl);
      })
      .catch((error) => {
        console.error("Error fetching client logo:", error);
      });
  }, [user, isLoggedIn]);

  // Determine if image should be hidden
  const shouldHideImage = !isLoggedIn || user?.role === "masterAdmin";
  const isMasterAdmin = !isLoggedIn || user?.role === "masterAdmin";

  return (
    <div className={`${styles.navbar} ${isLoggedIn ? styles.loggedIn : ""}`}>
      <img
        src={logoToDisplay}
        alt="Client Logo"
        className={`${styles.logo} ${shouldHideImage ? styles.hidden : ""}`}
      />
      {isMasterAdmin ? null : (
        <span className={styles.clientId}>Client ID: {user?.clientId}</span>
      )}
      <div className={styles.navActions}>
        {visibleItems.map((it) =>
          "to" in it ? (
            <button
              key={it.label}
              className={styles.navButton}
              onClick={() => nav(resolvePath(it.to))}
            >
              {it.label}
            </button>
          ) : (
            <button
              key={it.label}
              className={
                it.onClick === "logout" ? styles.logoutButton : styles.navButton
              }
              onClick={handlers[it.onClick] ?? (() => {})}
            >
              {it.label}
            </button>
          ),
        )}
      </div>
    </div>
  );
};
export default Navbar;
