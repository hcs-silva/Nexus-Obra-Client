import DashboardPage from "./Pages/DashboardPage";
import LoginPage from "./Pages/LoginPage";
import MasterDashboard from "./Pages/MasterDashboard";
import PasswordUpdatePage from "./Pages/PasswordUpdatePage";
import WelcomePage from "./Pages/WelcomePage";
import ClientList from "./components/ClientList";
import CreateClient from "./components/CreateClient";
import EditClient from "./components/EditClient";
import ObraList from "./components/ObraList";
import CreateObra from "./components/CreateObra";
import EditObra from "./components/EditObra";
import ManageObra from "./components/ManageObra";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import styles from "./styles/common.module.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import BuildList from "./components/BuildList";
import QuotationList from "./components/QuotationList";

function App() {
  const { logout } = useAuth();

  // Logout on window close
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Only logout if user is logged in
      const token = localStorage.getItem("token");
      if (token) {
        logout();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, [logout]);

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.contentArea}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<WelcomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>

            {/* Protected Routes - Only authenticated users */}
            <Route
              path="/dashboard/:clientId"
              element={
                <ProtectedRoute requireClientMatch={true}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            ></Route>

            {/* Master Admin Only Routes */}
            <Route
              path="/masterdash"
              element={
                <ProtectedRoute requiredRoles={["masterAdmin"]}>
                  <MasterDashboard />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/allclients"
              element={
                <ProtectedRoute requiredRoles={["masterAdmin"]}>
                  <ClientList />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/addclient"
              element={
                <ProtectedRoute requiredRoles={["masterAdmin"]}>
                  <CreateClient />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/editclient/:clientId"
              element={
                <ProtectedRoute requireClientMatch={true}>
                  <EditClient />
                </ProtectedRoute>
              }
            ></Route>

            {/* Client-based Protected Routes */}
            <Route
              path="/builds"
              element={
                <ProtectedRoute>
                  <BuildList />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/quotations"
              element={
                <ProtectedRoute>
                  <QuotationList />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/resetpassword/:userId"
              element={
                <ProtectedRoute>
                  <PasswordUpdatePage />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/:clientId/allobras" element={<ProtectedRoute><ObraList /></ProtectedRoute>}></Route>
            <Route path="/:clientId/addobra" element={<ProtectedRoute><CreateObra /></ProtectedRoute>}></Route>
            <Route path="/editobra/:obraId" element={<ProtectedRoute><EditObra /></ProtectedRoute>}></Route>
            <Route path="/manageobra/:obraId" element={<ProtectedRoute><ManageObra /></ProtectedRoute>}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
