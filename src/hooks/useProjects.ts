import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import { getProjects } from "../services/projectService";

export function useProjects() {
  // Guarda a lista de projetos que vai ser exibida na tela.
  const [projects, setProjects] = useState<Project[]>([]);

  // Indica se os projetos que ainda estão sendo carregados.
  const [loading, setLoading] = useState(true);

  // Guarda uma mensagem caso ocorra um erro quando conseguir obter os projetos.
  const [error, setError] = useState("");

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

  // Entrega os dados e estados para a página que utiliza o hook.
  return { projects, loading, error };
}
