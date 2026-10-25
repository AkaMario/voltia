import { DashboardProvider } from "./context/DashboardProvider";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { DashboardRoutes } from "./routes/DashboardRoutes";
import { useSession } from "./hooks/useSession";
import Login from "./views/Login";

export default function App() {
  const { user, login, logout } = useSession();
  if (!user) return <Login onLogin={login} />;
  return (
    <DashboardProvider user={user} onLogin={login} onLogout={logout}>
      <DashboardLayout>
        <DashboardRoutes />
      </DashboardLayout>
    </DashboardProvider>
  );
}
