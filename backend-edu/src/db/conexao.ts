import sqlite3 from "sqlite3";

console.log("[DB] Conectando ao database.db...");
export const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("[DB] Erro ao conectar:", err);
  } else {
    console.log("[DB] Conectado com sucesso!");
  }
});

export function buscarUm<T = any>(
  sql: string,
  params: any[] = [],
): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (erro, linha) => {
      if (erro) return reject(erro);
      resolve(linha as T | undefined);
    });
  });
}

export function executar(
  sql: string,
  params: any[] = [],
): Promise<{ lastID: number; changes: number }> {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (erro) {
      if (erro) return reject(erro);
      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}
