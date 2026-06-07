import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Materia.css";

export default function Materia() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [imagemNome, setImagemNome] = useState("");

  const buttonAdicionarMateria = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/materia/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          descricao,
          imagem,
        }),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        console.error("Erro ao adicionar matéria:", resposta.status, erro);
        return;
      }

      const data = await resposta.json();
      console.log("Matéria adicionada:", data);
      setNome("");
      setDescricao("");
      setImagem("");
      setImagemNome("");
      alert("Matéria adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar matéria:", error);
    }
  };

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleImagemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagem(file.name);
      setImagemNome(file.name);
    }
  };

  return (
    <div className="materia-container">
      <div className="materia-header">
        <h1 className="materia-title">ADICIONAR MATÉRIA</h1>
        <button className="btn-voltar" onClick={() => navigate(-1)}>
          VOLTAR
        </button>
      </div>

      <div className="materia-form">
        <div className="field-group">
          <label>NOME</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome da matéria"
          />
        </div>

        <div className="field-group">
          <label>DESCRIÇÃO</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição breve"
          />
        </div>

        <div className="image-box">
          <label>IMAGEM / CAPA</label>
          <div className="image-upload-row">
            <button
              type="button"
              className="image-select-button"
              onClick={handleSelectImage}
            >
              INSERIR IMAGEM
            </button>
            {imagemNome && <span className="image-name">{imagemNome}</span>}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImagemChange}
          />
        </div>

        <div className="confirm-button-row">
          <button className="btn-confirmar" onClick={buttonAdicionarMateria}>
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  );
}
