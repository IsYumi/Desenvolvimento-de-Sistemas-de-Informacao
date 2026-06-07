import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Exercicio() {
  const navigate = useNavigate();

  const [pacote_id, setPacoteId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [nivel, setNivel] = useState("");

  const buttonAdicionarExercicio = async () => {
    try {
      const respostaApi = await fetch("http://localhost:3333/exercicio/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pacote_id: pacote_id,
          titulo: titulo,
          pergunta: pergunta,
          resposta: resposta,
          nivel: nivel,
        }),
      });

      if (!respostaApi.ok) {
        const erro = await respostaApi.text();
        console.error("Erro ao adicionar exercício:", respostaApi.status, erro);
        return;
      }

      const data = await respostaApi.json();
      console.log("Exercício adicionado:", data);
      setPacoteId("");
      setTitulo("");
      setPergunta("");
      setResposta("");
      setNivel("");
      alert("Exercício adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar exercício:", error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label>ID do Pacote</label>
            <input
              type="integer"
              name="pacote_id"
              value={pacote_id}
              onChange={(e) => setPacoteId(e.target.value)}
            />
            <label>TÍTULO</label>
            <input
              type="text"
              name="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <label>PERGUNTA</label>
            <input
              type="text"
              name="pergunta"
              value={pergunta}
              onChange={(e) => setPergunta(e.target.value)}
            />
            <label>RESPOSTA</label>
            <input
              type="text"
              name="resposta"
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
            />
            <label>NÍVEL</label>
            <input
              type="integer"
              name="nivel"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
            />
          </div>
          <div className="buttons-container">
            <button
              className="btn-adicionar"
              onClick={buttonAdicionarExercicio}
            >
              ADICIONAR EXERCÍCIO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
