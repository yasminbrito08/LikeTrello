import type { ChangeEvent } from "react";

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
        <div className="flex flex-col gap-1.5 w-full text-left">
            <label
                className="text-sm font-semibold text-secondary"
                htmlFor={props.id}
            >
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
                className="box-border w-full min-w-0 px-3 py-2.5 border border-slate-300 rounded-md bg-foreground text-secondary font-[inherit] text-sm focus:border-primary focus:outline-2 focus:outline-primary focus:outline-offset-2 aria-invalid:border-danger disabled:bg-slate-100 disabled:text-background-color disabled:cursor-not-allowed"
            />
            {props.erro && (
                <span className="text-danger text-xs" id={`${props.id}-erro`}>
                    {props.erro}
                </span>
            )}
        </div>
    );
}

export default Input;
