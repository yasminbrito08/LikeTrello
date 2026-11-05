import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import type { FormEvent } from "react";
import { useUserStore } from "../contexts/AuthContext";


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
        <h1>Cadastro</h1>

         <form onSubmit={processarCadastro} noValidate>
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
    );
  }
export default Register;