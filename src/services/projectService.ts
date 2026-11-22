import type { Project } from "../types/project";

// dados simulados de projetos para exibição na tela de dashboard enquanto não há integração com backend
const projects: Project[] = [
  {
    id: 1,
    name: "Projeto Integrador",
    taskCount: 8,
  },
  {
    id: 2,
    name: "LikeTrello",
    taskCount: 12,
  },
  {
    id: 3,
    name: "Aplicativo de Tarefas",
    taskCount: 5,
  },
];

// retorna a lista de projetos simulados 
export function getProjects(): Project[] {
  return projects;
}
