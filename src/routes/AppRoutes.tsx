import { Routes, Route, Navigate } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../components/layout/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<MainLayout />}>

        <Route
          path="/dashboard"
          element={<h1>Dashboard</h1>}
        />

        <Route
          path="/projects"
          element={<h1>Projetos</h1>}
        />

        <Route
          path="/profile"
          element={<h1>Perfil</h1>}
        />

      </Route>
    </Routes>
  );
}

export default AppRoutes;