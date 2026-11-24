import "./Sidebar.css";
import logo from "../../assets/logo.png";

import { NavLink } from "react-router";

function Sidebar() {
  return (
    <aside className="menu-lateral">
      <div className="menu-lateral__marca">
        <img
          src={logo}
          alt="Logo LikeTrello"
          className="menu-lateral__logo"
        />
        <span>LikeTrello</span>
      </div>

      <nav
        className="menu-lateral__navegacao"
        aria-label="Menu principal"
      >
        <NavLink to="/dashboard" className="menu-lateral__link">
          Dashboard
        </NavLink>

        <NavLink to="/projects" className="menu-lateral__link">
          Projetos
        </NavLink>

        <NavLink to="/profile" className="menu-lateral__link">
          Perfil
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;