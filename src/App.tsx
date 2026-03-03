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
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import BuildList from "./components/BuildList";
import QuotationList from "./components/QuotationList";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import type { ReactNode } from "react";

const LegacyObraRedirect = ({ type }: { type: "allobras" | "addobra" }) => {
  const { user, isLoggedIn, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return null;
  }

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.clientId) {
    return <Navigate to="/masterdash" replace />;
  }

  return <Navigate to={`/${user.clientId}/${type}`} replace />;
};

function App() {
  const withRouteBoundary = (name: string, element: ReactNode) => (
    <RouteErrorBoundary routeName={name}>{element}</RouteErrorBoundary>
  );

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.contentArea}>
        <Header />
        <main className={styles.main}>
          <Routes>
            <Route
              path="/"
              element={withRouteBoundary("welcome", <WelcomePage />)}
            ></Route>
            <Route
              path="/login"
              element={withRouteBoundary("login", <LoginPage />)}
            ></Route>

            {/* Protected Routes - Only authenticated users */}
            <Route
              path="/dashboard/:clientId"
              element={withRouteBoundary(
                "dashboard",
                <ProtectedRoute requireClientMatch={true}>
                  <DashboardPage />
                </ProtectedRoute>,
              )}
            ></Route>

            {/* Master Admin Only Routes */}
            <Route
              path="/masterdash"
              element={withRouteBoundary(
                "masterdash",
                <ProtectedRoute requiredRoles={["masterAdmin"]}>
                  <MasterDashboard />
                </ProtectedRoute>,
              )}
            ></Route>

            <Route
              path="/allclients"
              element={withRouteBoundary(
                "allclients",
                <ProtectedRoute requiredRoles={["masterAdmin"]}>
                  <ClientList />
                </ProtectedRoute>,
              )}
            ></Route>

            <Route
              path="/addclient"
              element={withRouteBoundary(
                "addclient",
                <ProtectedRoute requiredRoles={["masterAdmin"]}>
                  <CreateClient />
                </ProtectedRoute>,
              )}
            ></Route>

            <Route
              path="/editclient/:clientId"
              element={withRouteBoundary(
                "editclient",
                <ProtectedRoute requireClientMatch={true}>
                  <EditClient />
                </ProtectedRoute>,
              )}
            ></Route>

            {/* Client-based Protected Routes */}
            <Route
              path="/builds"
              element={withRouteBoundary(
                "builds",
                <ProtectedRoute>
                  <BuildList />
                </ProtectedRoute>,
              )}
            ></Route>

            <Route
              path="/quotations"
              element={withRouteBoundary(
                "quotations",
                <ProtectedRoute>
                  <QuotationList />
                </ProtectedRoute>,
              )}
            ></Route>

            <Route
              path="/resetpassword/:userId"
              element={withRouteBoundary(
                "resetpassword",
                <ProtectedRoute>
                  <PasswordUpdatePage />
                </ProtectedRoute>,
              )}
            ></Route>
            <Route
              path="/allobras"
              element={withRouteBoundary(
                "legacy-allobras",
                <ProtectedRoute>
                  <LegacyObraRedirect type="allobras" />
                </ProtectedRoute>,
              )}
            ></Route>
            <Route
              path="/addobra"
              element={withRouteBoundary(
                "legacy-addobra",
                <ProtectedRoute>
                  <LegacyObraRedirect type="addobra" />
                </ProtectedRoute>,
              )}
            ></Route>
            <Route
              path="/:clientId/allobras"
              element={withRouteBoundary(
                "allobras",
                <ProtectedRoute requireClientMatch={true}>
                  <ObraList />
                </ProtectedRoute>,
              )}
            ></Route>
            <Route
              path="/:clientId/addobra"
              element={withRouteBoundary(
                "addobra",
                <ProtectedRoute requireClientMatch={true}>
                  <CreateObra />
                </ProtectedRoute>,
              )}
            ></Route>
            <Route
              path="/editobra/:obraId"
              element={withRouteBoundary(
                "editobra",
                <ProtectedRoute>
                  <EditObra />
                </ProtectedRoute>,
              )}
            ></Route>
            <Route
              path="/manageobra/:obraId"
              element={withRouteBoundary(
                "manageobra",
                <ProtectedRoute>
                  <ManageObra />
                </ProtectedRoute>,
              )}
            ></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
