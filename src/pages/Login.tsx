import { useState } from "react";
import Input from "../components/ui/Input.tsx";
import Button from "../components/ui/Button.tsx";
import type { SubmitEvent } from "react";
import { useUserStore } from "../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const login = useUserStore((state) => state.login);

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function processarLogin(evento: SubmitEvent<HTMLFormElement>) {
  evento.preventDefault();
  
  setErroEmail("");
  setErroSenha("");

  let formularioValido = true;

  if (email.trim() === "") {
    setErroEmail("Campo obrigatório");
    formularioValido = false;
  } else if (!regexEmail.test(email)) {
    setErroEmail("Insira um e-mail válido");
    formularioValido = false;
  }
  if (senha.trim() === "") {
    setErroSenha("Campo obrigatório");
    formularioValido = false;
  }

  if (formularioValido) {

    try {
      await login({
        login: email,
        password: senha
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);
        }
      }
    }

  return (
    <div> 
      <h1>Login</h1>

        <form onSubmit={processarLogin} noValidate>
          <Input
          id="email"
          rotulo="E-mail"
          tipo="email"
          valor={email}
          aoAlterar={(evento) => setEmail(evento.target.value)}
          erro={erroEmail}
          />

          <Input 
          id="senha"
          rotulo="Senha"
          tipo="password"
          valor={senha}
          aoAlterar={(evento) => setSenha(evento.target.value)}
          erro={erroSenha}
          />

          <Button
          texto="Entrar"
          tipo="submit"
          />
        </form>
    </div>
  );
}

export default Login;