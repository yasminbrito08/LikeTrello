// cada informação de um projeto que será exibida no dashboard 
export interface Project {
  id: string;
  name: string;
  taskCount: number;
  description?: string;
  archived: boolean;
}
