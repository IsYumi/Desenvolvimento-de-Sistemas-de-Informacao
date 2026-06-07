import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Editar_Materia.css";

export default function Editar_Materia() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [imagemNome, setImagemNome] = useState("");

  const buttonAdicionarMateria = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/materia/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          nome: nome,
          descricao: descricao,
          imagem_caminho: imagem,
        }),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        console.error("Erro ao alterar materia:", resposta.status, erro);
        return;
      }

      const data = await resposta.json();
      console.log("Materia alterado:", data);
      setNome("");
      setDescricao("");
      setImagem("");
      setImagemNome("");
      alert("Materia alterado com sucesso!");
    } catch (error) {
      console.error("Erro ao alterar materia:", error);
    }
  };

  const buttondeletarMateria = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/materia/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        console.error("Erro ao deletar materia:", resposta.status, erro);
        return;
      }

      const data = await resposta.json();
      console.log("Materia deletado:", data);
      setId("");
      setNome("");
      setDescricao("");
      setImagem("");
      setImagemNome("");
      alert("Materia deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar materia:", error);
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
    <>
      <Navbar />
      <div className="materia-container">
        <div className="materia-header">
          <h1 className="materia-title">EDITAR MATERIA</h1>
          <button className="btn-voltar" onClick={() => navigate(-1)}>
            VOLTAR
          </button>
        </div>

        <div className="materia-form">
          <div className="field-group">
            <label>ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID do materia"
            />
          </div>
          <div className="field-group">
            <label>NOME</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome da matéria"
            />
          </div>

          <div className="text-area-group field-group">
            <label>DESCRIÇÃO</label>
            <textarea
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
            <button
              className="btn-deletar"
              type="button"
              onClick={buttondeletarMateria}
            >
              DELETAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
