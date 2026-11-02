import "./MainLayout.css";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="layout__principal">
        <Header />

        <main className="layout__conteudo">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;