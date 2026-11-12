import { useState } from "react";
import Input from "../components/ui/input/Input.tsx";
import Button from "../components/ui/button/Button.tsx";
import type { SubmitEvent } from "react";
import { useUserStore } from "../contexts/AuthContext";
import logo from "../assets/logo.png";

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
      <div className="flex flex-col items-center justify-center mt-10 mb-8">
        <img src={logo} alt="logo do sistema" width={250} />
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold mb-0">LikeTrello</h1>
          <p className="mt-1 text-lg font-medium opacity-80">Gerenciador de Projetos</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <form
          onSubmit={processarLogin}
          noValidate
          className="flex flex-col space-y-5 w-full max-w-80 px-4 sm:max-w-100"
        >
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
      <div className="flex flex-col items-center justify-center mt-6 space-y-2">
        <p>Não tem uma conta? <a href="/register" className="underline text-primary">Cadastre-se</a></p>
        <a href="" className="text-primary">Esqueceu a senha?</a>
      </div>    
    </div>
  );
}

export default Login;