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
            className="inline-flex items-center justify-center 
            px-4 py-2.5 bg-primary text-foreground border border-transparent 
            rounded-md font-[inherit] text-sm font-semibold cursor-pointer 
            transition-colors hover:brightness-90 focus-visible:outline-3 
            focus-visible:outline-offset-3 focus-visible:outline-primary 
            disabled:opacity-50 disabled:cursor-not-allowed 
            disabled:hover:brightness-100"
        >
            {props.texto}
        </button>
    );
}

export default Button;
