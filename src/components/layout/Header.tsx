import "./Header.css";

function Header() {
    return (
        <header className="cabecalho">
            <span className="cabecalho__titulo">
                Gerenciador de projetos
            </span>

            <span className="cabecalho__usuario">
                Usuário
            </span>
        </header>
    );
}

export default Header;