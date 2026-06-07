import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Materia() {
  const navigate = useNavigate();

  const [materia_id, setMateriaId] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem_caminho, setImagemCaminho] = useState("");

  const buttonAdicionarPacote = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/pacote/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          materia_id: materia_id,
          nome: nome,
          descricao: descricao,
          imagem_caminho: imagem_caminho,
        }),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        console.error("Erro ao adicionar pacote:", resposta.status, erro);
        return;
      }

      const data = await resposta.json();
      console.log("Pacote adicionado:", data);
      setMateriaId("");
      setNome("");
      setDescricao("");
      setImagemCaminho("");
      alert("Pacote adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar pacote:", error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <div className="form-row">
          <div className="form-group">
            <label>ID da Materia</label>
            <input
              type="integer"
              name="materia_id"
              value={materia_id}
              onChange={(e) => setMateriaId(e.target.value)}
            />
            <label>NOME DA MATERIA</label>
            <input
              type="text"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label>DESCRIÇÃO</label>
            <input
              type="text"
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <label>IMAGEM</label>
            <input
              type="text"
              name="imagem_caminho"
              value={imagem_caminho}
              onChange={(e) => setImagemCaminho(e.target.value)}
            />
          </div>
          <div className="buttons-container">
            <button className="btn-adicionar" onClick={buttonAdicionarPacote}>
              ADICIONAR PACOTE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
