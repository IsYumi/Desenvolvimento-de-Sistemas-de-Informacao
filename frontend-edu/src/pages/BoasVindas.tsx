import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import boy from "../assets/student_boy.gif";
import girl from "../assets/student_girl.gif";
import "../styles/BoasVindas.css";

export default function BoasVindas() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("Usuário");
  const [genero, setGenero] = useState("masculino");

  const imagem = genero === "feminino" ? girl : boy;

  useEffect(() => {
    async function buscarNome() {
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
      } catch (erro) {
        console.error("Erro ao buscar nome:", erro);
      }
    }

    buscarNome();

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
