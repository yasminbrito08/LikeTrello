import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "./Dashboard.css";

function Dashboard() {
  // Obtém os projetos e os estados de carregamento e erro pelo hook.
  const { projects, loading, error } = useProjects();

  // Guarda o texto digitado no campo de pesquisa.
  const [pesquisa, setPesquisa] = useState("");

  // Filtra os projetos pelo nome, ignorando diferenças entre maiúsculas e minúsculas.
  const projetosFiltrados = projects.filter((project) =>
    project.name.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="dashboard__boas-vindas">
        <h1>Bem-vindo ao LikeTrello!</h1>
        <p>Organize seus projetos e acompanhe suas tarefas.</p>
      </div>

      <div className="dashboard__acoes">
        <div className="dashboard__pesquisa">
          <Input
            id="pesquisa"
            rotulo="Pesquisar projetos"
            valor={pesquisa}
            aoAlterar={(evento) => setPesquisa(evento.target.value)}
          />
        </div>

        <Button
          texto="Novo Projeto"
          aoClicar={() => alert("Funcionalidade de criação de projeto")}
        />
      </div>

      <h2 className="dashboard__titulo">Meus Projetos</h2>

      {/* Mostra uma mensagem enquanto a lista de projetos está sendo carregada. */}
      {loading && (
        <p className="dashboard__mensagem">Carregando projetos...</p>
      )}

      {/* Mostra uma mensagem caso ocorra algum erro. */}
      {error && <p className="dashboard__mensagem">{error}</p>}

      {/* Informa quando a pesquisa não encontra nenhum projetos. */}
      {!loading && !error && projetosFiltrados.length === 0 && (
        <p className="dashboard__mensagem">Nenhum projeto encontrado.</p>
      )}

      {/* Exibe um cartão para cada projeto encontrado*/}
      {!loading && !error && projetosFiltrados.length > 0 && (
        <div className="dashboard__lista">
          {projetosFiltrados.map((project) => (
            <div className="dashboard__projeto" key={project.id}>
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
