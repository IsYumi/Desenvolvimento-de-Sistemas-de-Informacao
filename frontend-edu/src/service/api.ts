const BASE_URL = "http://localhost:3333";

export async function apiPost<T>(rota: string, dados: unknown): Promise<T> {
  const resposta = await fetch(`${BASE_URL}${rota}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  const json = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    const mensagem = (json as any)?.mensagem ?? "Erro na requisição";
    throw new Error(mensagem);
  }

  return json as T;
}