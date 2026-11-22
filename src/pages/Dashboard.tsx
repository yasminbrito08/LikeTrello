import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "./Dashboard.css";

function Dashboard() {
  const { projects, loading, error } = useProjects();

  const [pesquisa, setPesquisa] = useState("");

  const projetosFiltrados = projects.filter((project) =>
    project.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div>
      <h1>Bem-vindo ao LikeTrello!</h1>

      <div>
        <Input
          id="pesquisa"
          rotulo="Pesquisar projetos"
          valor={pesquisa}
          aoAlterar={(evento) => setPesquisa(evento.target.value)}
        />

        <Button
          texto="Novo Projeto"
          aoClicar={() => alert("Funcionalidade de criação de projeto")}
        />
      </div>

      <h2>Meus Projetos</h2>

      {loading && <p>Carregando projetos...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && projetosFiltrados.length === 0 && (
        <p>Nenhum projeto encontrado.</p>
      )}

      {!loading && !error && projetosFiltrados.length > 0 && (
        <div>
          {projetosFiltrados.map((project) => (
            <div key={project.id}>
              <h3>{project.name}</h3>
              <p>{project.taskCount} tarefas</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;