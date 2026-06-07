import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Editar_Pacote.css";

export default function Editar_Pacote() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [topico, setTopico] = useState("");
  const [nivel, setNivel] = useState("Básico");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");
  const [imagemNome, setImagemNome] = useState("");
  const [questao, setQuestao] = useState("");

  const buttonAdicionarPacote = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/pacote/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          materia_id: nome,
          nome: topico,
          descricao: descricao,
          imagem_caminho: imagem,
        }),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        console.error("Erro ao alterar pacote:", resposta.status, erro);
        return;
      }

      const data = await resposta.json();
      console.log("Pacote alterado:", data);
      setNome("");
      setTopico("");
      setNivel("Básico");
      setDescricao("");
      setImagem("");
      setImagemNome("");
      setQuestao("");
      alert("Pacote alterado com sucesso!");
    } catch (error) {
      console.error("Erro ao alterar pacote:", error);
    }
  };

  const buttondeletarPacote = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/pacote/delete", {
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
        console.error("Erro ao deletar pacote:", resposta.status, erro);
        return;
      }

      const data = await resposta.json();
      console.log("Pacote deletado:", data);
      setId("");
      setNome("");
      setTopico("");
      setNivel("Básico");
      setDescricao("");
      setImagem("");
      setImagemNome("");
      setQuestao("");
      alert("Pacote deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar pacote:", error);
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
          <h1 className="materia-title">EDITAR PACOTE</h1>
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
              placeholder="ID do pacote"
            />
          </div>
          <div className="field-group">
            <label>NOME</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Id da matéria"
            />
          </div>

          <div className="field-group">
            <label>TÓPICO</label>
            <input
              type="text"
              value={topico}
              onChange={(e) => setTopico(e.target.value)}
              placeholder="nome da matéria"
            />
          </div>

          <div className="field-group">
            <label>NÍVEL</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="nivel"
                  value="Básico"
                  checked={nivel === "Básico"}
                  onChange={() => setNivel("Básico")}
                />
                BÁSICO
              </label>
              <label>
                <input
                  type="radio"
                  name="nivel"
                  value="Intermediário"
                  checked={nivel === "Intermediário"}
                  onChange={() => setNivel("Intermediário")}
                />
                INTERMEDIÁRIO
              </label>
              <label>
                <input
                  type="radio"
                  name="nivel"
                  value="Avançado"
                  checked={nivel === "Avançado"}
                  onChange={() => setNivel("Avançado")}
                />
                AVANÇADO
              </label>
            </div>
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

          <div className="text-area-group field-group">
            <label>DESCRIÇÃO</label>
            <textarea
              value={questao}
              onChange={(e) => setQuestao(e.target.value)}
              placeholder="Descreva a questão ou atividade"
            />
          </div>

          <div className="confirm-button-row">
            <button className="btn-confirmar" onClick={buttonAdicionarPacote}>
              CONFIRMAR
            </button>
            <button
              className="btn-deletar"
              type="button"
              onClick={buttondeletarPacote}
            >
              DELETAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
