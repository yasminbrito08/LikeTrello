import type { ChangeEvent } from "react";
import "./Input.css";
// opçoes recebidas pelo campo
type InputProps = {
    id: string;
    rotulo: string;
    tipo?: "text" | "email" | "password" | "date";
    valor: string;
    aoAlterar: (evento: ChangeEvent<HTMLInputElement>) => void;
    obrigatorio?: boolean;
    desabilitado?: boolean;
    erro?: string;
};

function Input(props: InputProps) {
    return (

        <div className="campo">
            {/*liga o rotulo ao campo pelo id*/}
            <label className="campo__rotulo" htmlFor={props.id}>
                {props.rotulo}
            </label>

            <input
                id={props.id}
                type={props.tipo ?? "text"}
                value={props.valor}
                onChange={props.aoAlterar}
                required={props.obrigatorio}
                disabled={props.desabilitado}
                aria-invalid={Boolean(props.erro)}
                aria-describedby={props.erro ? `${props.id}-erro` : undefined}
                className="campo__input"
            />
            {/*mostra a mensagem de erro quando ela e recebida*/}
            {props.erro && (
                <span className="campo__erro" id={`${props.id}-erro`}>

                    {props.erro}
                </span>
            )}
        </div>
    );
}

export default Input;