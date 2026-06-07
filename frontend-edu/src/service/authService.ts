import { apiPost } from "./api";

export type RespostaPadrao = {
  ok: boolean;
  token?: string;
  mensagem?: string;
};

export async function cadastrar(
  nome: string,
  sobrenome: string,
  email: string,
  senha: string,
  genero: string,
  telefone: string,
) {
  return apiPost<RespostaPadrao>("/user/", {
    nome,
    sobrenome,
    email,
    senha,
    genero,
    telefone,
  });
}

// passo A: valida email/senha e dispara OTP (no futuro via EmailJS)
export async function iniciarLogin(email: string, senha: string) {
  return apiPost<RespostaPadrao>("/auth/", { email, senha });
}

// passo B: valida OTP
export async function validarOtp(email: string, codigo: string) {
  return apiPost<RespostaPadrao>("/auth/verificar-otp/", { email, codigo });
}
