export function gerarOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function gerarExpiracaoOtp(): string {
  const agora = new Date();
  agora.setMinutes(agora.getMinutes() + 5);

  return agora.toISOString();
}