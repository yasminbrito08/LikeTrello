
import type { Project } from "../types/project";

// Dados simulados enquanto não há integração com o backend.
const projects: Project[] = [
  {
    id: 1,
    name: "Projeto Integrador",
    taskCount: 8,
    description: "Desenvolvimento do sistema acadêmico.",
    archived: false,
  },
  {
    id: 2,
    name: "LikeTrello",
    taskCount: 12,
    description: "Sistema de gerenciamento de projetos.",
    archived: false,
  },
  {
    id: 3,
    name: "Aplicativo de Tarefas",
    taskCount: 5,
    description: "Sistema para organizar atividades.",
    archived: true,
  },
];

// Retorna os projetos simulados.
export function getProjects(): Project[] {
  return projects;
}

// Arquiva um projeto.
export function archiveProject(id: number): void {
  const project = projects.find((project) => project.id === id);

  if (!project) {
    throw new Error("Projeto não encontrado.");
  }
    
    project.archived = true;

}

// Restaura um projeto arquivado.
export function restoreProject(id: number): void {
  const project = projects.find((project) => project.id === id);

  if (!project) {
    throw new Error("Projeto não encontrado.");
  }
    
  project.archived = false;

}

//Criar um novo projeto
export function createProject(
  name: string,
  description?: string
 ): Project {
    const newProject: Project = {
      id: Math.max(0, ...projects.map((project) => project.id)) + 1,
      name,
      description,
      taskCount: 0,
      archived: false,
    };

    projects.push(newProject);

    return newProject;
 }

//Atualizar projeto existente
export function updateProject(
  id: number,
  name: string,
  description?: string
): Project {
  const project = projects.find((project) => project.id === id);

  if (!project) {
    throw new Error("Projeto não encontrado.");
 }
  project.name = name;
  project.description = description;

  return project;
}