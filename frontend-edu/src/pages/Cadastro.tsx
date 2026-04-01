import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrar } from "../service/authService";
import "../styles/cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false); // 👈 corrigido

  const [mensagem, setMensagem] = useState("");

  function validarEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");

    if (!nome || !email || !senha) {
      setMensagem("Preencha os campos obrigatórios.");
      return;
    }

    if (email !== confirmarEmail) {
      setMensagem("Os e-mails não coincidem.");
      return;
    }

    if (senha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    if (!validarEmail(email)) {
      setMensagem("E-mail inválido.");
      return;
    }

    if (senha.length < 6) {
      setMensagem("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (genero === "") {
      setMensagem("Selecione um gênero.");
      return;
    }

    if (!aceitouTermos) {
      setMensagem("Você deve aceitar os termos.");
      return;
    }

    try {
      const resposta = await cadastrar(
        nome,
        sobrenome,
        email,
        senha,
        genero,
        telefone,
      );

      if (resposta.ok) {
        navigate("/login");
      } else {
        setMensagem(resposta.mensagem || "Erro ao cadastrar");
      }
    } catch (erro) {
      setMensagem("Erro ao cadastrar");
    }
  }

  function irParaLogin() {
    navigate("/login");
  }

  return (
    <div className="cadastro-container">
      <button className="btn-voltar" onClick={() => navigate("/")}>
        VOLTAR
      </button>

      <h1 className="titulo">CRIAR CONTA</h1>

      <form onSubmit={handleCadastro} className="formulario">
        {/* COLUNA ESQUERDA */}
        <div className="coluna">
          <label>NOME</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />

          <label>GÊNERO</label>
          <div className="genero">
            <label>
              <input
                type="radio"
                name="genero"
                onChange={() => setGenero("F")}
              />
              FEMININO
            </label>

            <label>
              <input
                type="radio"
                name="genero"
                onChange={() => setGenero("M")}
              />
              MASCULINO
            </label>

            <label>
              <input
                type="radio"
                name="genero"
                onChange={() => setGenero("N")}
              />
              NÃO INFORMAR
            </label>
          </div>

          <label>E-MAIL</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>SENHA</label>
          <input
            type="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {/* COLUNA DIREITA */}
        <div className="coluna">
          <label>SOBRENOME</label>
          <input
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />

          <label>TELEFONE</label>
          <input
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <label>CONFIRMAR E-MAIL</label>
          <input
            value={confirmarEmail}
            onChange={(e) => setConfirmarEmail(e.target.value)}
          />

          <label>CONFIRMAR SENHA</label>
          <input
            type="senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>
      </form>

      {/* CHECKBOX */}
      <div className="checkbox-area">
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="termos"
            checked={aceitouTermos}
            onChange={(e) => setAceitouTermos(e.target.checked)}
          />
          <label htmlFor="termos">Li e aceito os termos</label>
        </div>

        <div className="checkbox-item">
          <input type="checkbox" id="dicas" />
          <label htmlFor="dicas">
            Aceito receber dicas de estudo, conteúdos exclusivos e promoções
          </label>
        </div>
      </div>

      {mensagem && <p className="erro">{mensagem}</p>}

      {/* BOTÕES */}
      <div className="botoes-container">
        <button className="btn-confirmar" onClick={handleCadastro}>
          CONFIRMAR
        </button>

        <button className="btn-login" onClick={irParaLogin}>
          LOGIN
        </button>
      </div>

      {/* MONSTRINHO */}
      <img src="/monster_1.gif" alt="monstro" className="monster" />
    </div>
  );
}
