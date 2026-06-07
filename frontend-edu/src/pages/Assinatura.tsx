import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Assinatura.css";

export default function Assinatura() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [numero_cartao, setCartao] = useState("");
  const [data_validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  const buttonAdicionarMateria = async () => {
    try {
      const resposta = await fetch("http://localhost:3333/user/cartao", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          sobrenome: sobrenome,
          numero_cartao: numero_cartao,
          data_validade: data_validade,
          cvv: cvv,
        }),
      });

      if (!resposta.ok) {
        const erro = await resposta.text();
        console.error("Erro ao adicionar assinatura:", resposta.status, erro);
        return;
      }

      const data = await resposta.json();
      setNome("");
      setSobrenome("");
      setCartao("");
      setValidade("");
      setCvv("");
      alert("Assinatura concluida com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar matéria:", error);
    }
  };

  return (
    <div className="materia-container">
      <div className="materia-header">
        <h1 className="materia-title">ASSINAR PLANO</h1>
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
            placeholder="Nome"
          />
        </div>

        <div className="field-group">
          <label>SOBRENOME</label>
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Sobrenome"
          />
        </div>
        <div className="materia-form">
          <div className="field-group">
            <label>NÚMERO DO CARTÃO</label>
            <input
              type="text"
              value={numero_cartao}
              onChange={(e) => setCartao(e.target.value)}
              placeholder="Número do cartão"
            />
          </div>

          <div className="materia-form">
            <div className="field-group">
              <label>DATA DE VALIDADE</label>
              <input
                type="text"
                value={data_validade}
                onChange={(e) => setValidade(e.target.value)}
                placeholder="MM/AA"
              />
            </div>
          </div>

          <div className="materia-form">
            <div className="field-group">
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
              />
            </div>
          </div>
          <div className="confirm-button-row">
            <button className="btn-confirmar" onClick={buttonAdicionarMateria}>
              CONFIRMAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
