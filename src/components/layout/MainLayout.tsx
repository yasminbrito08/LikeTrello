import "./MainLayout.css";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="layout__principal">
          {/* titulo e usuario mostrados no cabeçalho*/}
        <Header
          titulo="Gerenciador de projetos"
          usuario="Usuário"
        />

        <main className="layout__conteudo">
          {/* mostra o conteudo da página atual*/}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;