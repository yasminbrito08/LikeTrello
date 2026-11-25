import "./MainLayout.css";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useUserStore } from "../../contexts/AuthContext";

function MainLayout() {
  const userName = useUserStore((s) => s.user?.username) ?? "Usuário";
  return (
    <div className="layout">
      <Sidebar />

      <div className="layout__principal">

        <Header
          usuario={userName}
        />

        <main className="layout__conteudo">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;