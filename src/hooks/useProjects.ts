import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import { getProjects } from "../services/projectService";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const data = getProjects();
      setProjects(data);
    } catch {
      setError("Não foi possível carregar os projetos.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    projects,
    loading,
    error,
  };
}