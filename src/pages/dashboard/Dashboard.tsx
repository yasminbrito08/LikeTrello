import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useProjects } from "../../hooks/useProjects";
import type { Project } from "../../types/project";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input/Input";
import Modal from "../../components/ui/modal/Modal";
import Icon from "../../components/ui/icon/icon";
import searchIcon from "../../Icons/search";
import plusIcon from "../../Icons/plus";
import pencilIcon from "../../Icons/pencil";
import folderIcon from "../../Icons/folder";
import "./Dashboard.css";

const CORES_PROJETO = [
  "#3b82f6",
  "#eab308",
  "#a855f7",
  "#ef4444",
  "#14b8a6",
  "#f97316",
];

function Dashboard() {
  // Permite que o usuário navegue para outras rotas da aplicação.
  const navigate = useNavigate();

  // Obtém os projetos e os estados de carregamento e erro pelo hook.
  const {
    projects,
    loading,
    error,
    handleCreateProject: criarProjeto,
    handleUpdateProject: atualizarProjeto,
    handleArchiveProject: arquivarProjeto,
    handleRestoreProject: restaurarProjeto,
  } = useProjects();

  // Guarda o texto digitado no campo de pesquisa.
  const [pesquisa, setPesquisa] = useState("");

  // Alterna a listagem entre projetos ativos e arquivados.
  const [mostrarArquivados, setMostrarArquivados] = useState(false);

  const [modalAberto, setModalAberto] = useState(false);
  const [editarProjeto, setEditarProjeto] = useState<Project | null>(null);
  const [nome, setNome] = useState("");
  const [errorNome, setErrorNome] = useState("");
  const [popoverAbertoId, setPopoverAbertoId] = useState<string | null>(null);

  const popoverRef = useRef<HTMLDivElement | null>(null);

  // Filtra os projetos ativos ou arquivados pelo nome, ignorando diferenças entre maiúsculas e minúsculas.
  const projetosFiltrados = projects.filter(
    (project) =>
      project.archived === mostrarArquivados &&
      project.name.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  useEffect(() => {
    if (!popoverAbertoId) return;

    function fecharPopover(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setPopoverAbertoId(null);
      }
    }

    document.addEventListener("mousedown", fecharPopover);
    return () => document.removeEventListener("mousedown", fecharPopover);
  }, [popoverAbertoId]);

  function abrirModalCriacao() {
    setEditarProjeto(null);
    setNome("");
    setErrorNome("");
    setPopoverAbertoId(null);
    setModalAberto(true);
  }

  // Preenche o formulário com os dados do projeto que será editado.
  function abrirModalEdicao(project: Project) {
    setEditarProjeto(project);
    setNome(project.name);
    setErrorNome("");
    setPopoverAbertoId(null);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setEditarProjeto(null);
    setNome("");
    setErrorNome("");
  }

  // Valida os dados do formulário e cria ou atualiza um projeto.
  async function handleSubmitProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome.trim()) {
      setErrorNome("O nome do projeto é obrigatório.");
      return;
    }

    const success = editarProjeto
      ? await atualizarProjeto(editarProjeto.id, nome.trim())
      : await criarProjeto(nome.trim());

    if (success) {
      fecharModal();
      setMostrarArquivados(false);
    }
  }

  async function handleArquivarProjeto(projectId: string) {
    setPopoverAbertoId(null);
    await arquivarProjeto(projectId);
  }

  async function handleRestaurarProjeto(projectId: string) {
    setPopoverAbertoId(null);
    await restaurarProjeto(projectId);
  }

  return (
    <div className="dashboard">
      <div className="dashboard__boas-vindas">
        <h1 className="font-bold">Bem-vindo ao LikeTrello!</h1>
      </div>

      <div className="dashboard__acoes">
        <div className="dashboard__pesquisa">
          <span className="dashboard__pesquisa-icone" aria-hidden="true">
            <Icon path={searchIcon} size={18} />
          </span>
          <Input
            id="pesquisa"
            valor={pesquisa}
            placeholder="Buscar projetos..."
            aoAlterar={(evento) => setPesquisa(evento.target.value)}
          />
        </div>
      </div>

      <div className="dashboard__abas">
        <button
          type="button"
          onClick={() => {
            setMostrarArquivados(false);
            setPopoverAbertoId(null);
          }}
          className={
            !mostrarArquivados
              ? "dashboard__aba dashboard__aba--ativa"
              : "dashboard__aba"
          }
        >
          Meus Projetos
        </button>

        <button
          type="button"
          onClick={() => {
            setMostrarArquivados(true);
            setPopoverAbertoId(null);
          }}
          className={
            mostrarArquivados
              ? "dashboard__aba dashboard__aba--ativa"
              : "dashboard__aba"
          }
        >
          Meus Arquivados
        </button>
      </div>

      {/* Mostra uma mensagem enquanto a lista de projetos está sendo carregada. */}
      {loading && (
        <p className="dashboard__mensagem">Carregando projetos...</p>
      )}

      {/* Mostra uma mensagem caso ocorra algum erro. */}
      {error && <p className="dashboard__mensagem">{error}</p>}

      {/* Informa quando a pesquisa não encontra nenhum projetos. */}
      {!loading && !error && pesquisa && projetosFiltrados.length === 0 && (
        <p className="dashboard__mensagem">Nenhum projeto encontrado.</p>
      )}

      {!loading &&
        !error &&
        !pesquisa &&
        projetosFiltrados.length === 0 &&
        mostrarArquivados && (
          <p className="dashboard__mensagem">Nenhum projeto arquivado.</p>
        )}

      {/* Exibe um cartão para cada projeto encontrado*/}
      {!loading &&
        !error &&
        !(pesquisa && projetosFiltrados.length === 0) &&
        !(mostrarArquivados && projetosFiltrados.length === 0 && !pesquisa) && (
          <div className="dashboard__lista">
            {projetosFiltrados.map((project, index) => (
              <article
                className="dashboard__projeto"
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                onKeyDown={(evento) => {
                  if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    navigate(`/projects/${project.id}`);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="dashboard__projeto-topo">
                  <span
                    className="dashboard__projeto-cor"
                    style={{
                      backgroundColor:
                        CORES_PROJETO[index % CORES_PROJETO.length],
                    }}
                    aria-hidden="true"
                  />

                  <div
                    className="dashboard__projeto-acoes"
                    ref={popoverAbertoId === project.id ? popoverRef : null}
                    onClick={(evento) => evento.stopPropagation()}
                    onKeyDown={(evento) => evento.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="dashboard__projeto-menu"
                      aria-label={`Opções de ${project.name}`}
                      aria-expanded={popoverAbertoId === project.id}
                      onClick={() =>
                        setPopoverAbertoId((atual) =>
                          atual === project.id ? null : project.id,
                        )
                      }
                    >
                      <span />
                      <span />
                      <span />
                    </button>

                    {popoverAbertoId === project.id && (
                      <div className="dashboard__popover" role="menu">
                        {!project.archived && (
                          <>
                            <button
                              type="button"
                              className="dashboard__popover-item"
                              role="menuitem"
                              onClick={() => abrirModalEdicao(project)}
                            >
                              <Icon path={pencilIcon} size={14} />
                              Editar
                            </button>

                            <button
                              type="button"
                              className="dashboard__popover-item dashboard__popover-item--perigo"
                              role="menuitem"
                              onClick={() =>
                                handleArquivarProjeto(project.id)
                              }
                              disabled={loading}
                            >
                              <Icon path={folderIcon} size={14} />
                              Arquivar
                            </button>
                          </>
                        )}

                        {project.archived && (
                          <button
                            type="button"
                            className="dashboard__popover-item"
                            role="menuitem"
                            onClick={() =>
                              handleRestaurarProjeto(project.id)
                            }
                            disabled={loading}
                          >
                            <Icon path={folderIcon} size={14} />
                            Restaurar
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="dashboard__projeto-nome">{project.name}</h3>
              </article>
            ))}

            {!mostrarArquivados && (
              <button
                type="button"
                className="dashboard__projeto-novo"
                onClick={abrirModalCriacao}
              >
                <Icon path={plusIcon} size={22} />
                Novo Projeto
              </button>
            )}
          </div>
        )}

      <Modal
        aberto={modalAberto}
        titulo={editarProjeto ? "Editar Projeto" : "Novo Projeto"}
        aoFechar={fecharModal}
      >
        <form
          className="dashboard__formulario"
          onSubmit={handleSubmitProject}
          noValidate
        >
          <Input
            id="nomeProjeto"
            rotulo="Nome do projeto"
            tipo="text"
            valor={nome}
            aoAlterar={(event) => {
              setNome(event.target.value);
              setErrorNome("");
            }}
            erro={errorNome}
          />
          <div className="dashboard__formulario-acoes">
            <Button
              texto={editarProjeto ? "Salvar Alterações" : "Criar Projeto"}
              tipo="submit"
              desabilitado={loading}
            />

            <Button
              texto="Cancelar"
              tipo="button"
              aoClicar={fecharModal}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;