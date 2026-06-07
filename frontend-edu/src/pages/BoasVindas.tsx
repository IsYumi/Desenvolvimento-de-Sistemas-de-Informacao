import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import boy from "../assets/student_boy.gif";
import girl from "../assets/student_girl.gif";
import "../styles/BoasVindas.css";

export default function BoasVindas() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("Usuário");
  const [genero, setGenero] = useState("masculino");
  const [imagem, setImagem] = useState(boy);

  const selecionarImagem = (generoUsuario: string) => {
    if (generoUsuario === "F") {
      return girl;
    } else if (generoUsuario === "M") {
      return boy;
    } else {
      // Qualquer outro valor (prefiro não informar, etc) escolhe aleatoriamente
      return Math.random() > 0.5 ? girl : boy;
    }
  };

  useEffect(() => {
    async function buscarDados() {
      try {
        const resposta = await fetch("http://localhost:3333/user/name", {
          method: "GET",
          credentials: "include",
        });

        if (!resposta.ok) {
          throw new Error("Erro na API");
        }

        const dados = await resposta.json();
        setNome(dados.nome || "Usuário");

        // Se a API retorna o gênero, usa; caso contrário, tenta buscar separadamente
        if (dados.genero) {
          const imagemSelecionada = selecionarImagem(dados.genero);
          setGenero(dados.genero);
          setImagem(imagemSelecionada);
        }
      } catch (erro) {
        console.error("Erro ao buscar nome:", erro);
      }
    }

    buscarDados();

    const timer = setTimeout(() => {
      navigate("/home");
    }, 4500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="boas-container">
      <h1>OLÁ, {(nome || "Usuário").toUpperCase()} !</h1>
      <img src={imagem} alt="estudante" />
    </div>
  );
}
