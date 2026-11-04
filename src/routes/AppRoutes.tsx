import { Routes, Route, Navigate } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* públicas */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* privadas — só acessa se estiver logado */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/projects" element={<h1>Projetos</h1>} />
          <Route path="/profile" element={<h1>Perfil</h1>} />
        </Route>
      </Route>

      {/* qualquer outra rota vai para login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;