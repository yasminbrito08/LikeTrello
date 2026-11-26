import type { Project } from "../types/project";
import { httpService } from "./httpService";

class ProjectService extends httpService {

  // Busca os projetos ativos
  async getProjects(): Promise<Project[]> {
    const response = await this.axios.get("/projects");

    return response.data.map((project: any) => ({
      id: project.id,
      name: project.name,
      taskCount: 0,
      archived: false,
    }));
  }

  // Busca os projetos arquivados
  async getArchivedProjects(): Promise<Project[]> {
    const response = await this.axios.get("/projects/archived");

    return response.data.map((project: any) => ({
      id: project.id,
      name: project.name,
      taskCount: 0,
      archived: true,
    }));
  }

  // Cria um projeto enviando apenas o nome
  async createProject(name: string): Promise<void> {
    await this.axios.post("/projects", { name });
  }

  // Atualiza o nome de um projeto
  async updateProject(id: string, name: string): Promise<void> {
    await this.axios.put(`/projects/${id}`, { name });
  }

  // Arquiva um projeto
  async archiveProject(id: string): Promise<void> {
    await this.axios.patch(`/projects/${id}/archive`);
  }

  // Restaura um projeto arquivado
  async restoreProject(id: string): Promise<void> {
    await this.axios.patch(`/projects/${id}/restore`);
  }
}

// Instancia o serviço para utilizar as operações
const projectService = new ProjectService();

export const getProjects = () => projectService.getProjects();
export const getArchivedProjects = () => projectService.getArchivedProjects();
export const createProject = (name: string) => projectService.createProject(name);
export const updateProject = (id: string, name: string) => projectService.updateProject(id, name);
export const archiveProject = (id: string) => projectService.archiveProject(id);
export const restoreProject = (id: string) => projectService.restoreProject(id);