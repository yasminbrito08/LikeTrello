import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import { getProjects, createProject, updateProject, archiveProject, restoreProject } from "../services/projectService";

export function useProjects() {
  // Guarda a lista de projetos que vai ser exibida na tela.
  const [projects, setProjects] = useState<Project[]>([]);

  // Indica se os projetos que ainda estão sendo carregados.
  const [loading, setLoading] = useState(true);

  // Guarda uma mensagem caso ocorra um erro quando conseguir obter os projetos.
  const [error, setError] = useState("");

  // Guarda uma mensagem quando uma operação é realizada com sucesso.
  const [success, setSuccess] = useState("");

  // Executa a obtenção dos projetos quando o componente é carregado.
  useEffect(() => {
    try {
      const data = getProjects();
      setProjects(data);
    } catch {
      setError("Não foi possível carregar os projetos.");
    } finally {
      // Encerra o estado de carregamento, com ou sem erro.
      setLoading(false);
    }
  }, []);

  // Cria um projeto e atualiza a lista de projetos.
  function handleCreateProject(name: string, description?: string,): boolean {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      createProject(name, description);
      setProjects([...getProjects()]);
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
  function handleUpdateProject(id: number, name: string, description?: string): boolean {
    setLoading(true);
    setError("");
    setSuccess("");
    
    try { 
      updateProject(id, name, description);
      setProjects([...getProjects()]);
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
  function handleArchiveProject(id: number): void {
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      archiveProject(id);
      setProjects([...getProjects()]);
      setSuccess("Projeto arquivado com sucesso!");
    } catch {
      setError("Não foi possível arquivar o projeto.");
    } finally {
      setLoading(false);
    }
  }

  // Restaura um projeto arquivado e atualiza a lista de projetos.
  function handleRestoreProject(id: number): void {
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      restoreProject(id);
      setProjects([...getProjects()]);
      setSuccess("Projeto restaurado com sucesso!");
    } catch {
      setError("Não foi possível restaurar o projeto.");
    } finally {
      setLoading(false);
    }
  }
  
  // Entrega os dados e estados para a página que utiliza o hook.
  return { projects, loading, error, success, handleCreateProject, handleUpdateProject, handleArchiveProject, handleRestoreProject };
}
