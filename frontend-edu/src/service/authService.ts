import { apiPost } from "./api";

export type RespostaPadrao = { ok: boolean; mensagem?: string };

export async function cadastrar(nome: string, email: string, senha: string) {
  return apiPost<RespostaPadrao>("/user", { nome, email, senha });
}

// passo A: valida email/senha e dispara OTP (no futuro via EmailJS)
export async function iniciarLogin(email: string, senha: string) {
  return apiPost<RespostaPadrao>("/auth", { email, senha });
}

// passo B: valida OTP
export async function validarOtp(email: string, codigo: string) {
  return apiPost<RespostaPadrao>("/auth/verificar-otp", { email, codigo });
}
