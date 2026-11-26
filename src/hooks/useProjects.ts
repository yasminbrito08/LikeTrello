import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import {
  getProjects,
  getArchivedProjects,
  createProject,
  updateProject,
  archiveProject,
  restoreProject,
} from "../services/projectService";

export function useProjects() {
  // Guarda a lista de projetos que vai ser exibida na tela.
  const [projects, setProjects] = useState<Project[]>([]);

  // Indica se os projetos ainda estão sendo carregados.
  const [loading, setLoading] = useState(true);

  // Guarda uma mensagem caso ocorra um erro.
  const [error, setError] = useState("");

  // Guarda uma mensagem quando uma operação é realizada com sucesso.
  const [success, setSuccess] = useState("");

  // Busca os projetos ativos e arquivados.
  async function loadProjects() {
    const ativos = await getProjects();
    const arquivados = await getArchivedProjects();
    setProjects([...ativos, ...arquivados]);
  }

  // Executa a obtenção dos projetos quando o componente é carregado.
  useEffect(() => {
    async function carregarProjetos() {
      try {
        await loadProjects();
      } catch {
        setError("Não foi possível carregar os projetos.");
      } finally {
        setLoading(false);
      }
    }

    carregarProjetos();
  }, []);

  // Cria um projeto e atualiza a lista de projetos.
  async function handleCreateProject(name: string, _description?: string): Promise<boolean> {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createProject(name);
      await loadProjects();
      setSuccess("Projeto criado com sucesso!");
      return true;
    } catch {
      setError("Não foi possível criar um projeto.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Atualiza um projeto e atualiza a lista de projetos.
  async function handleUpdateProject(id: string, name: string, _description?: string): Promise<boolean> {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await updateProject(id, name);
      await loadProjects();
      setSuccess("Projeto atualizado com sucesso!");
      return true;
    } catch {
      setError("Não foi possível atualizar o projeto.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Arquiva um projeto e atualiza a lista de projetos.
  async function handleArchiveProject(id: string): Promise<void> {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await archiveProject(id);
      await loadProjects();
      setSuccess("Projeto arquivado com sucesso!");
    } catch {
      setError("Não foi possível arquivar o projeto.");
    } finally {
      setLoading(false);
    }
  }

  // Restaura um projeto arquivado e atualiza a lista de projetos.
  async function handleRestoreProject(id: string): Promise<void> {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await restoreProject(id);
      await loadProjects();
      setSuccess("Projeto restaurado com sucesso!");
    } catch {
      setError("Não foi possível restaurar o projeto.");
    } finally {
      setLoading(false);
    }
  }

  // Entrega os dados e estados para a página que utiliza o hook.
  return {
    projects,
    loading,
    error,
    success,
    handleCreateProject,
    handleUpdateProject,
    handleArchiveProject,
    handleRestoreProject,
  };
}