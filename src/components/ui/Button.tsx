import "./Button.css";

type ButtonProps = {
    texto: string;

    tipo?: "button" | "submit" | "reset";

    aoClicar?: () => void;
    desabilitado?: boolean;
};

function Button(props: ButtonProps) {
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