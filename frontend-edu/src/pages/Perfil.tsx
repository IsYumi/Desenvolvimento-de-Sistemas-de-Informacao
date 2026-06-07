import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Perfil.css";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("nome");
  const [sobrenome, setSobrenome] = useState("sobrenome");
  const [genero, setGenero] = useState("N");
  const [telefone, setTelefone] = useState("telefone");
  const [email, setEmail] = useState("email");

  useEffect(() => {
    const updateDados = async () => {
      const respostaApi = await fetch("http://localhost:3333/user/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "appli  cation/json",
        },
      });
      if (respostaApi.ok) {
        const data = await respostaApi.json();
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setGenero(data.genero);
        setTelefone(data.telefone);
        setEmail(data.email);
      }
    };
    updateDados();
  }, []);
  return (
    <div className="perfil-page">
      <Navbar />
      <div className="perfil-container">
        <div className="perfil-card">
          <div className="perfil-header">
            <h1>MEU PERFIL</h1>
          </div>

          <div className="perfil-grid">
            <div className="perfil-column">
              <div className="perfil-field">
                <label>Nome</label>
                <input type="text" value={nome} />
              </div>
              <div className="perfil-field">
                <label>Telefone</label>
                <input type="text" value={telefone} />
              </div>
              <div className="perfil-field">
                <label>Gênero</label>
                <div className="perfil-radio-group">
                  <label>
                    <input type="radio" name="genero" />
                    Feminino
                  </label>
                  <label>
                    <input type="radio" name="genero" />
                    Masculino
                  </label>
                  <label>
                    <input type="radio" name="genero" />
                    Não informar
                  </label>
                </div>
              </div>
              <div className="perfil-plan-box">
                <span>Tipo de plano</span>
                <strong>FREE</strong>
              </div>
              <button
                className="perfil-button perfil-button-primary"
                onClick={() => navigate("/assinatura")}
              >
                ASSINAR PLANO
              </button>
            </div>

            <div className="perfil-column">
              <div className="perfil-field">
                <label>Sobrenome</label>
                <input type="text" value={sobrenome} />
              </div>
              <div className="perfil-field">
                <label>E-mail</label>
                <input type="email" value={email} />
              </div>
              <button
                className="perfil-button perfil-button-secondary"
                onClick={() => navigate("/update")}
              >
                EDITAR INFORMAÇÕES
              </button>
              <button className="perfil-button perfil-button-danger">
                DELETAR CONTA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
