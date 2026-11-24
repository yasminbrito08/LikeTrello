import { useState } from "react";
import "./Projects.css";

import type { Project } from "../types/project";
import { useProjects } from "../hooks/useProjects";

import Input from "../components/ui/input/Input";
import Button from "../components/ui/button/Button";

function Projects() {
  const [mostrarArquivados, setMostrarArquivados] = useState(false);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editarProjeto, setEditarProjeto] = useState<Project | null>(null);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const [errorNome, setErrorNome] = useState("");

  const {
    projects: projetos,
    loading,
    error,
    success: mensagem,
    handleCreateProject: criarProjeto,
    handleUpdateProject: atualizarProjeto,
    handleArchiveProject: arquivarProjeto,
    handleRestoreProject: restaurarProjeto,
  } = useProjects();

  // Filtra os projetos ativos ou arquivados.
  const projetosFiltrados = projetos.filter(
    (projeto) => projeto.archived === mostrarArquivados,
  );

  // Valida os dados do formulario e cria um novo projeto.
  function handleSubmitProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome.trim()) {
      setErrorNome("O nome do projeto é obrigatório.");
      return;
    }

    const success = editarProjeto
      ? atualizarProjeto(editarProjeto.id, nome.trim(), descricao.trim())
      : criarProjeto(nome.trim(), descricao.trim());

    if (success) {
      setNome("");
      setDescricao("");
      setErrorNome("");
      setEditarProjeto(null);
      setMostrarFormulario(false);
      setMostrarArquivados(false);
    }
  }

  function handleUpdateProject(project: Project): void {
    setEditarProjeto(project);
    setNome(project.name);
    setDescricao(project.description ?? "");
    setErrorNome("");
    setMostrarFormulario(true);
  }

  return (
    <div className="projetos">
      <div className="projetos__cabecalho">
        <div>
          <h1>Meus Projetos</h1>
          <p>Visualize e gerencie seus projetos.</p>
        </div>

        <Button
          texto="Novo Projeto"
          tipo="button"
          aoClicar={() => {
            setEditarProjeto(null);
            setNome("");
            setDescricao("");
            setErrorNome("");
            setMostrarFormulario(true);
          }}
        />
      </div>

      {mostrarFormulario && (
        <form
          className="projetos__formulario"
          onSubmit={handleSubmitProject}
          noValidate
        >
          <h2>{editarProjeto ? "Editar Projeto" : "Novo Projeto"}</h2>

          <Input
            id="nomeProjeto"
            rotulo="Nome do projeto"
            tipo="text"
            valor={nome}
            aoAlterar={(event) => {
              setNome(event.target.value);
              setErrorNome("");
            }}
            erro={errorNome}
          />

          <Input
            id="descricaoProjeto"
            rotulo="Descrição (opcional)"
            tipo="text"
            valor={descricao}
            aoAlterar={(event) => setDescricao(event.target.value)}
          />

          <div className="projetos__formulario-acoes">
            <Button
              texto={editarProjeto ? "Salvar Alterações" : "Criar Projeto"}
              tipo="submit"
              desabilitado={loading}
            />

            <Button
              texto="Cancelar"
              tipo="button"
              aoClicar={() => {
                setMostrarFormulario(false);
                setEditarProjeto(null);
                setNome("");
                setDescricao("");
                setErrorNome("");
              }}
            />
          </div>
        </form>
      )}

      {mensagem && (
        <p className="projetos__mensagem" role="status">
          {mensagem}
        </p>
      )}

      {error && (
        <p className="projetos__erro" role="alert">
          {error}
        </p>
      )}

      {loading && (
        <p className="projetos__carregando" role="status">
          Carregando projetos...
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

      {!loading && !error && projetosFiltrados.length === 0 && (
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

            {!projeto.archived && (
              <button
                type="button"
                className="projetos__botao-editar"
                onClick={() => handleUpdateProject(projeto)}
                disabled={loading}
              >
                Editar
              </button>
            )}

            {projeto.archived ? (
              <button
                type="button"
                className="projetos__botao-restaurar"
                onClick={() => restaurarProjeto(projeto.id)}
                disabled={loading}
              >
                Restaurar
              </button>
            ) : (
              <button
                type="button"
                className="projetos__botao-arquivar"
                onClick={() => arquivarProjeto(projeto.id)}
                disabled={loading}
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
