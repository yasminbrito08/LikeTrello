import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Projects.css";

import { useProjects } from "../../hooks/useProjects";
import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";
import Icon from "../../components/ui/icon/icon";
import chevronLIcon from "../../Icons/chevronL";

type AbaProjeto = "visao-geral" | "membros" | "quadros" | "configuracoes";

function Projects() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const {
    projects: projetos,
    loading,
    error,
    handleUpdateProject: atualizarProjeto,
    handleArchiveProject: arquivarProjeto,
    handleRestoreProject: restaurarProjeto,
  } = useProjects();

  const [abaAtiva, setAbaAtiva] = useState<AbaProjeto>("visao-geral");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [errorNome, setErrorNome] = useState("");

  const projeto = projetos.find((item) => item.id === projectId);

  useEffect(() => {
    if (!projeto) return;
    setNome(projeto.name);
    setDescricao(projeto.description ?? "");
    setErrorNome("");
  }, [projeto]);

  // Valida e salva as alterações do projeto.
  async function handleSalvarAlteracoes(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!projeto) return;

    if (!nome.trim()) {
      setErrorNome("O nome do projeto é obrigatório.");
      return;
    }

    const success = await atualizarProjeto(
      projeto.id,
      nome.trim(),
      descricao.trim(),
    );

    if (success) {
      setErrorNome("");
    }
  }

  // Arquiva o projeto e volta para o dashboard.
  async function handleArquivarProjeto() {
    if (!projeto) return;
    await arquivarProjeto(projeto.id);
    navigate("/dashboard");
  }

  // Restaura o projeto arquivado.
  async function handleRestaurarProjeto() {
    if (!projeto) return;
    await restaurarProjeto(projeto.id);
  }

  if (!projectId) {
    return (
      <div className="projetos">
        <p className="projetos__vazio">
          Selecione um projeto no dashboard para ver os detalhes.
        </p>
      </div>
    );
  }

  if (loading && !projeto) {
    return (
      <div className="projetos">
        <p className="projetos__carregando" role="status">
          Carregando projeto...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projetos">
        <p className="projetos__erro" role="alert">
          {error}
        </p>
      </div>
    );
  }

  if (!projeto) {
    return (
      <div className="projetos">
        <p className="projetos__vazio">Projeto não encontrado.</p>
        <button
          type="button"
          className="projetos__voltar"
          onClick={() => navigate("/dashboard")}
        >
          <Icon path={chevronLIcon} size={18} />
          Voltar ao dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="projetos">
      <div className="projetos__detalhe">
        <header className="projetos__detalhe-cabecalho">
          <button
            type="button"
            className="projetos__voltar"
            onClick={() => navigate("/dashboard")}
            aria-label="Voltar ao dashboard"
          >
            <Icon path={chevronLIcon} size={20} />
          </button>
          <h1 className="projetos__detalhe-titulo">{projeto.name}</h1>
        </header>

        <nav className="projetos__abas" aria-label="Seções do projeto">
          <button
            type="button"
            className={
              abaAtiva === "visao-geral"
                ? "projetos__aba projetos__aba--ativa"
                : "projetos__aba"
            }
            onClick={() => setAbaAtiva("visao-geral")}
          >
            Visão geral
          </button>

          <button
            type="button"
            className={
              abaAtiva === "membros"
                ? "projetos__aba projetos__aba--ativa"
                : "projetos__aba"
            }
            onClick={() => setAbaAtiva("membros")}
          >
            Membros
          </button>

          <button
            type="button"
            className={
              abaAtiva === "quadros"
                ? "projetos__aba projetos__aba--ativa"
                : "projetos__aba"
            }
            onClick={() => setAbaAtiva("quadros")}
          >
            Quadros
          </button>

          <button
            type="button"
            className={
              abaAtiva === "configuracoes"
                ? "projetos__aba projetos__aba--ativa"
                : "projetos__aba"
            }
            onClick={() => setAbaAtiva("configuracoes")}
          >
            Configurações
          </button>
        </nav>

        <div className="projetos__conteudo">
          {abaAtiva === "visao-geral" && null}
          {abaAtiva === "membros" && null}
          {abaAtiva === "quadros" && null}

          {abaAtiva === "configuracoes" && (
            <div className="projetos__configuracoes">
              <section className="projetos__config-info">
                <h2>Informações do projeto</h2>

                <form onSubmit={handleSalvarAlteracoes} noValidate>
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

                  <div className="projetos__campo-descricao">
                    <label htmlFor="descricaoProjeto">Descrição</label>
                    <textarea
                      id="descricaoProjeto"
                      value={descricao}
                      onChange={(event) => setDescricao(event.target.value)}
                      rows={4}
                      placeholder="Descreva o projeto..."
                    />
                  </div>

                  <Button
                    texto="Salvar alterações"
                    tipo="submit"
                    desabilitado={loading}
                  />
                </form>
              </section>

              <section className="projetos__config-acoes">
                <h2>Ações do projeto</h2>

                {projeto.archived ? (
                  <>
                    <button
                      type="button"
                      className="projetos__botao-restaurar-acao"
                      onClick={handleRestaurarProjeto}
                      disabled={loading}
                    >
                      Restaurar projeto
                    </button>
                    <p className="projetos__acao-ajuda">
                      O projeto voltará para a lista de projetos ativos.
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="projetos__botao-arquivar-acao"
                      onClick={handleArquivarProjeto}
                      disabled={loading}
                    >
                      Arquivar projeto
                    </button>
                    <p className="projetos__acao-ajuda">
                      O projeto será movido para a lista de projetos
                      arquivados.
                    </p>
                  </>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;