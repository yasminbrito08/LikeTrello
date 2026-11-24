import { useState } from "react";
import "./Projects.css";

import type { Project } from "../types/project";
import {
    getProjects,
    archiveProject,
    restoreProject,
} from "../services/projectService";

function Projects() {
    const [mostrarArquivados, setMostrarArquivados] = useState(false);

    const [projetos, setProjetos] = useState<Project[]>(() => getProjects());

    const [mensagem, setMensagem] = useState("");

    // Filtra os projetos ativos ou arquivados.
    const projetosFiltrados = projetos.filter(
        (projeto) => projeto.archived === mostrarArquivados
    );

    // Arquiva um projeto e atualiza a lista exibida.
    function arquivarProjeto(id: number) {
        archiveProject(id);
        setProjetos([...getProjects()]);
        setMensagem("Projeto arquivado com sucesso!");
    }

    // Restaura um projeto e atualiza a lista exibida.
    function restaurarProjeto(id: number) {
        restoreProject(id);
        setProjetos([...getProjects()]);
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
                        <h2>{projeto.name}</h2>
                        <p>{projeto.description ?? "Sem descrição."}</p>

                        {projeto.archived ? (
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
