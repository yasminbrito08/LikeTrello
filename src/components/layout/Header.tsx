import "./Header.css";
// informaçoes recebidas pelo cabeçalho
type HeaderProps = {
    titulo: string;
    usuario: string;
};

function Header(props: HeaderProps) {
    return (
        <header className="cabecalho">
            <span className="cabecalho__titulo">
                {props.titulo}
            </span>

            <span className="cabecalho__usuario">
                {/*mostra a primeira letra do nome em maiusculo*/}
                <span className="cabecalho__avatar" aria-hidden="true">
                    {props.usuario.trim().charAt(0).toUpperCase()}
                </span>

                {props.usuario}
            </span>
        </header>
    );
}

export default Header;