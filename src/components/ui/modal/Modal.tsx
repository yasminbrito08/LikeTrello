import { useEffect, type ReactNode } from "react";
import "./Modal.css";

type ModalProps = {
  aberto: boolean;
  titulo: string;
  aoFechar: () => void;
  children: ReactNode;
};

function Modal({ aberto, titulo, aoFechar, children }: ModalProps) {
  useEffect(() => {
    if (!aberto) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        aoFechar();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  return (
    <div className="modal-overlay" role="presentation" onClick={aoFechar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__cabecalho">
          <h2 id="modal-titulo" className="modal__titulo">
            {titulo}
          </h2>
          <button
            type="button"
            className="modal__fechar"
            aria-label="Fechar"
            onClick={aoFechar}
          >
            ×
          </button>
        </div>

        <div className="modal__conteudo">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
