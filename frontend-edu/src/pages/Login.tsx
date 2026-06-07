import { useState } from "react";
import "../styles/login.css";
import imagem from "../assets/login_1.jpg";
import { iniciarLogin, validarOtp } from "../service/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigo, setCodigo] = useState("");

  async function handleEnviarOtp() {
    if (!email || !senha) {
      console.warn("Preencha email e senha antes de gerar o OTP");
      return;
    }

    try {
      const resposta = await iniciarLogin(email, senha);
      if (resposta.ok) {
        setCodigo("");
      }
    } catch (erro) {
      alert("Falha ao gerar código. Tente novamente mais tarde.");
    }
  }

  async function handleLogin() {
    try {
      if (codigo == "") {
        return;
      }
      const resposta = await validarOtp(email, codigo);
      if (resposta.ok && resposta.token) {
        setCodigo("");
        setEmail("");
        setSenha("");
        setTimeout(() => {
          navigate("/boasvindas");
        }, 1000);
      }
    } catch (erro) {
      console.error("Erro ao validar OTP:", erro);
    } finally {
    }
  }

  return (
    <div className="login-container">
      {/* LADO ESQUERDO */}
      <div className="login-left">
        <h1 className="titulo-login">LOGIN</h1>
        <div className="form-group">
          <label>E-MAIL</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>SENHA</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>CÓDIGO DE VERIFICAÇÃO</label>
          <input value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        </div>
        <button type="button" className="btn-codigo" onClick={handleEnviarOtp}>
          GERAR CÓDIGO DE VERIFICAÇÃO
        </button>
        <button type="button" className="btn-login" onClick={handleLogin}>
          LOGIN
        </button>
        <a className="link-senha">Esqueci minha senha</a>
      </div>
      {/* LADO DIREITO */}
      <div className="login-right">
        <img src={imagem} alt="login" />
      </div>
    </div>
  );
}
