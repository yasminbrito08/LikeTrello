import "./Button.css";
// opçoes recebidas pelo botão
type ButtonProps = {
    texto: string;

    tipo?: "button" | "submit" | "reset";

    aoClicar?: () => void;
    desabilitado?: boolean;
};

function Button(props: ButtonProps) {
    // se o tipo nao for informado, usa um botao comum.
    return (
        <button
            type={props.tipo ?? "button"}
            onClick={props.aoClicar}
            disabled={props.desabilitado}
            className="botao"
        >
            {props.texto}
        </button>
    );
}

export default Button;