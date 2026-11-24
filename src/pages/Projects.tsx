import { useState } from "react";
import "./Projects.css";

type Projeto = {
    id: number;
    nome: string;
    descricao: string;
    arquivado: boolean;
};

const projetosIniciais: Projeto[] = [
    {
        id: 1,
        nome: "Projeto Integrador",
        descricao: "Desenvolvimento do sistema acadêmico.",
        arquivado: false,
    },
    {
        id: 2,
        nome: "Site Institucional",
        descricao: "Criação de um site para uma empresa.",
        arquivado: false,
    },
    {
        id: 3,
        nome: "Aplicativo de Tarefas",
        descricao: "Sistema para organizar atividades.",
        arquivado: true,
    },
];

function Projects() {
    const [mostrarArquivados, setMostrarArquivados] = useState(false);

    const [projetos, setProjetos] = useState<Projeto[]>(projetosIniciais);

    const [mensagem, setMensagem] = useState("");

    const projetosFiltrados = projetos.filter(
        (projeto) => projeto.arquivado === mostrarArquivados
    );

    function arquivarProjeto(id: number) {
        setProjetos((listaAtual) =>
            listaAtual.map((projeto) =>
                projeto.id === id
                    ? { ...projeto, arquivado: true }
                    : projeto
            )
        );

        setMensagem("Projeto arquivado com sucesso!");
    }

    function restaurarProjeto(id: number) {
        setProjetos((listaAtual) =>
            listaAtual.map((projeto) =>
                projeto.id === id
                    ? { ...projeto, arquivado: false }
                    : projeto
            )
        );

        setMensagem("Projeto restaurado com sucesso!");
    }

    return (
        <div className="projetos">
            <div className="projetos__cabecalho">
                <h1>Meus Projetos</h1>
                <p>Visualize e gerencie seus projetos.</p>
            </div>

            {mensagem && (
                <p className="projetos__mensagem" role="status">
                    {mensagem}
                </p>
            )}

            <div className="projetos__filtros">
                <button
                    type="button"
                    className={!mostrarArquivados ? "filtro-ativo" : ""}
                    onClick={() => setMostrarArquivados(false)}
                >
                    Ativos
                </button>

                <button
                    type="button"
                    className={mostrarArquivados ? "filtro-ativo" : ""}
                    onClick={() => setMostrarArquivados(true)}
                >
                    Arquivados
                </button>
            </div>

            {projetosFiltrados.length === 0 && (
                <p className="projetos__vazio">
                    {mostrarArquivados
                        ? "Nenhum projeto arquivado."
                        : "Nenhum projeto ativo."}
                </p>
            )}

            <div className="projetos__lista">
                {projetosFiltrados.map((projeto) => (
                    <div className="projetos__card" key={projeto.id}>
                        <h2>{projeto.nome}</h2>
                        <p>{projeto.descricao}</p>

                        {projeto.arquivado ? (
                            <button
                                type="button"
                                className="projetos__botao-restaurar"
                                onClick={() => restaurarProjeto(projeto.id)}
                            >
                                Restaurar
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="projetos__botao-arquivar"
                                onClick={() => arquivarProjeto(projeto.id)}
                            >
                                Arquivar
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;