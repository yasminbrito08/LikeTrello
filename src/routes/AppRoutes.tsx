
import { Routes, Route, Navigate } from "react-router";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Projects from "../pages/projects/Projects";
import Dashboard from "../pages/dashboard/Dashboard";
import Profile from "../pages/profile/Profile";

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<Projects />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Rota não encontrada */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
