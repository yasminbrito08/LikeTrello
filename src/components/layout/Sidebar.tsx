import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router";
import Icon from "../ui/icon/icon";
import logoutIcon from "../../Icons/logout";
import houseIcon from "../../Icons/house";
import folderIcon from "../../Icons/folder";
import userIcon from "../../Icons/user";

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
          <Icon path={houseIcon} size={16} />
          Dashboard
        </NavLink>

        <NavLink to="/projects" className="menu-lateral__link">
          <Icon path={folderIcon} size={16}/>
          Projetos
        </NavLink>

        <NavLink to="/profile" className="menu-lateral__link">
          <Icon path={userIcon} size={16}/>
          Perfil
        </NavLink>
      </nav>
      <button type="button" className="menu-lateral__sair">
        <Icon path={logoutIcon} size={16} />
        Sair
      </button>
    </aside>
  );
}

export default Sidebar;