import type { Project } from "../types/project";

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

export function getProjects(): Project[] {
  return projects;
}