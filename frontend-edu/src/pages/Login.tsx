import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarLogin, validarOtp } from "../service/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [otpDigitado, setOtpDigitado] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregandoOtp, setCarregandoOtp] = useState(false);
  const [carregandoLogin, setCarregandoLogin] = useState(false);
  const [otpEnviado, setOtpEnviado] = useState(false);
  const [emailAtual, setEmailAtual] = useState("");

  async function handleEnviarOtp() {
    setMensagem("");
    setCarregandoOtp(true);

    if (!email || !senha) {
      setMensagem("Preencha e-mail e senha primeiro.");
      setCarregandoOtp(false);
      return;
    }

    try {
      const resposta = await iniciarLogin(email, senha);

      if (resposta.ok) {
        setEmailAtual(email);
        setOtpEnviado(true);
        setMensagem("OTP enviado para o seu e-mail.");
      } else {
        setMensagem(resposta.mensagem || "Erro ao enviar OTP");
      }
    } catch (erro) {
      const mensagemErro =
        erro instanceof Error ? erro.message : "Erro ao enviar OTP";
      setMensagem(mensagemErro);
      setOtpEnviado(false);
    } finally {
      setCarregandoOtp(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    setCarregandoLogin(true);

    try {
      if (!otpDigitado) {
        setMensagem("Digite o código OTP.");
        setCarregandoLogin(false);
        return;
      }

      const resposta = await validarOtp(emailAtual, otpDigitado);

      if (resposta.ok) {
        setMensagem("Login realizado com sucesso!");
        setOtpDigitado("");
        setEmail("");
        setSenha("");
        setOtpEnviado(false);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setMensagem(resposta.mensagem || "OTP inválido");
      }
    } catch (erro) {
      const mensagemErro =
        erro instanceof Error ? erro.message : "Erro ao fazer login";
      setMensagem(mensagemErro);
    } finally {
      setCarregandoLogin(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none"
              placeholder="Digite seu e-mail"
              disabled={otpEnviado}
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
              disabled={otpEnviado}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Código OTP</label>
            <input
              type="text"
              value={otpDigitado}
              onChange={(e) => setOtpDigitado(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none"
              placeholder="Digite o código OTP"
            />
          </div>

          {mensagem && (
            <p className="text-sm text-center text-red-600">{mensagem}</p>
          )}

          <button
            type="button"
            onClick={handleEnviarOtp}
            disabled={carregandoOtp || otpEnviado}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {carregandoOtp
              ? "Enviando OTP..."
              : otpEnviado
                ? "OTP Enviado"
                : "Gerar OTP"}
          </button>

          <button
            type="submit"
            disabled={carregandoLogin || !otpEnviado}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {carregandoLogin ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
