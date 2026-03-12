import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrar } from "../service/authService";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  function validarEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleCadastro(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensagem("");

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      setMensagem("Digite um e-mail válido.");
      return;
    }

    if (senha.length < 6) {
      setMensagem("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const resposta = await cadastrar(nome.trim(), email.trim(), senha);

      if (resposta.ok) {
        setMensagem(
          "Cadastro realizado com sucesso! Redirecionando para o login...",
        );
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else {
        setMensagem(resposta.mensagem || "Erro ao cadastrar");
      }
    } catch (erro) {
      const mensagemErro =
        erro instanceof Error ? erro.message : "Erro ao cadastrar";
      setMensagem(mensagemErro);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastro</h1>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none"
              placeholder="Digite sua senha"
            />
          </div>

          {mensagem && (
            <p className="text-sm text-center text-red-600">{mensagem}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:opacity-90"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
