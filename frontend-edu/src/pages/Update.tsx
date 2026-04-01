import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Update.css";

export default function Update() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [genero, setGenero] = useState("");

  async function handleUpdate() {
    try {
      const dados: any = {};

      if (nome.trim() !== "") {
        dados.nome = nome;
      }
      if (sobrenome.trim() !== "") {
        dados.sobrenome = sobrenome;
      }
      if (email.trim() !== "") {
        dados.email = email;
      }

      if (senha.trim() !== "") {
        dados.senha = senha;
      }

      if (genero.trim() !== "") {
        dados.genero = genero;
      }

      if (Object.keys(dados).length === 0) {
        alert("Preencha pelo menos um campo");
        return;
      }

      const resposta = await fetch("http://localhost:3333/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (resultado.ok) {
        alert("Atualizado com sucesso!");
      } else {
        alert(resultado.mensagem);
      }
    } catch (erro) {
      console.error("Erro ao atualizar:", erro);
    }
  }

  async function deletarConta() {
    const resposta = await fetch("http://localhost:3333/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const resultado = await resposta.json();
    if (resultado.ok) {
      alert("Conta deletada com sucesso!");
      navigate("/login");
    } else {
      alert(resultado.mensagem);
    }
  }
  return (
    <div>
      <div className="container">
        <div>
          {" "}
          <label>NOME</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div>
          {" "}
          <label>SOBRENOME</label>
          <input
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </div>
        <div>
          <label>E-MAIL</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>SENHA</label>
          <input value={senha} onChange={(e) => setSenha(e.target.value)} />
        </div>
        <div>
          {" "}
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
        </div>
      </div>
      <div className="botoes-container">
        <button className="btn-confirmar" onClick={handleUpdate}>
          CONFIRMAR
        </button>

        <button className="btn-login" onClick={deletarConta}>
          DELETAR CONTA
        </button>
      </div>
    </div>
  );
}
