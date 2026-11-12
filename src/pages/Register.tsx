import { useState } from "react";
import Input from "../components/ui/input/Input";
import Button from "../components/ui/button/Button";
import type { FormEvent } from "react";
import { useUserStore } from "../contexts/AuthContext";
import logo from "../assets/logo.png";


function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erroNome, setErroNome] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroConfirmarSenha, setErroConfirmarSenha] = useState("");

  const registerUser = useUserStore((state) => state.registerUser);

  async function processarCadastro(evento: FormEvent<HTMLFormElement>) {
  evento.preventDefault();

  const regexEmail = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  setErroNome("");
  setErroEmail("");
  setErroSenha("");
  setErroConfirmarSenha("");

  let formularioValido = true;

    if (nome.trim() === "") {
     setErroNome("Campo obrigatório");
     formularioValido = false;
    }

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

   if (confirmarSenha.trim() === "") {
      setErroConfirmarSenha("Campo obrigatório");
      formularioValido = false;
   } else if (senha !== confirmarSenha) {
      setErroConfirmarSenha("As senhas não coincidem");
     formularioValido = false;
   }

   if (formularioValido) {
      const dadosCadastro = {
        username: nome.trim(),
        email: email.trim(),
        password: senha
      };

      try {
        const resposta = await registerUser(dadosCadastro);

        console.log("Cadastro realizado com sucesso", resposta.userId);
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
      }
    }  
  }

   return (
     <div>
        <div className="flex flex-col items-center justify-center mt-10 mb-8">
          <img src={logo} alt="logo do sistema" width={250} />
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-bold mb-0">Criar Conta</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
          <form 
            onSubmit={processarCadastro} 
            noValidate 
            className="flex flex-col space-y-5 w-full max-w-80 px-4 sm:max-w-100"
          >
           <Input
              id="nome"
              rotulo="Nome"
              valor={nome}
             aoAlterar={(evento) => setNome(evento.target.value)}
             erro={erroNome}
           />

            <Input
             id="email"
              rotulo="Email"
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

           <Input
              id="confirmar-senha"
              rotulo="Confirmar Senha"
              tipo="password"
              valor={confirmarSenha}
              aoAlterar={(evento) => setConfirmarSenha(evento.target.value)}
              erro={erroConfirmarSenha}
            />

            <Button texto="Cadastrar" tipo="submit" />
         </form>
      </div>
         <div className="flex flex-col items-center justify-center mt-6 space-y-2 mb-10">
            <p>Já tem uma conta? <a href="/login" className="underline text-primary">Entrar</a></p>
         </div>
    </div>
    );
  }
export default Register;