import { useState, type ChangeEvent } from "react";
import Icon from "../icon/icon";
import eyeIcon from "../../../Icons/eye";
import eyeClosedIcon from "../../../Icons/eyeclosed";

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
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const isPassword = props.tipo === "password";
    const tipoAtual = isPassword && mostrarSenha ? "text" : (props.tipo ?? "text");

    return (
        <div className="flex flex-col gap-1.5 w-full text-left">
            <label
                className="text-sm font-semibold text-secondary"
                htmlFor={props.id}
            >
                {props.rotulo}
            </label>

            <div className="relative w-full">
                <input
                    id={props.id}
                    type={tipoAtual}
                    value={props.valor}
                    onChange={props.aoAlterar}
                    required={props.obrigatorio}
                    disabled={props.desabilitado}
                    aria-invalid={Boolean(props.erro)}
                    aria-describedby={props.erro ? `${props.id}-erro` : undefined}
                    className={`box-border w-full min-w-0 px-3 py-2.5 border border-slate-300 rounded-md bg-foreground text-secondary font-[inherit] text-sm focus:border-primary focus:outline-2 focus:outline-primary focus:outline-offset-2 aria-invalid:border-danger disabled:bg-slate-100 disabled:text-background-color disabled:cursor-not-allowed ${
                        isPassword ? "pr-10" : ""
                    }`}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setMostrarSenha((atual) => !atual)}
                        disabled={props.desabilitado}
                        aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 text-[#536783] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Icon path={mostrarSenha ? eyeIcon : eyeClosedIcon} size={18} />
                    </button>
                )}
            </div>

            {props.erro && (
                <span className="text-danger text-xs" id={`${props.id}-erro`}>
                    {props.erro}
                </span>
            )}
        </div>
    );
}

export default Input;
