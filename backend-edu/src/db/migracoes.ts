import { executar } from "./conexao";

export async function rodarMigracao() {
  console.log("[MIGRAÇÕES] Iniciando migrações...");

  await executar("PRAGMA foreign_keys = ON;");
  console.log("[MIGRAÇÕES] PRAGMA foreign_keys ativado");

  // usuários
  await executar(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      criado_em TEXT NOT NULL
    );
  `);

  // OTP
  await executar(`
    CREATE TABLE IF NOT EXISTS otps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      codigo TEXT NOT NULL,
      expira_em TEXT NOT NULL,
      criado_em TEXT NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );
  `);

  // AULAS
  await executar(`
    CREATE TABLE IF NOT EXISTS aulas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      materia TEXT NOT NULL,
      topico TEXT NOT NULL,
      descricao TEXT,
      nivel INTEGER NOT NULL,
      tipo_plano INTEGER
    );
  `);

  // ATIVIDADES
  await executar(`
    CREATE TABLE IF NOT EXISTS atividade (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      aula_relacionada INTEGER NOT NULL,
      pergunta TEXT NOT NULL,
      resposta TEXT NOT NULL,
      FOREIGN KEY (aula_relacionada) REFERENCES aulas(id) ON DELETE CASCADE
    );
  `);

  await executar(`
    CREATE INDEX IF NOT EXISTS idx_usuarios_email
    ON usuarios(email);
  `);

  await executar(`
    CREATE INDEX IF NOT EXISTS idx_otps_usuario
    ON otps(usuario_id);
  `);

  await executar(`
    CREATE INDEX IF NOT EXISTS idx_atividade_aula
    ON atividade(aula_relacionada);
  `);

  console.log("[MIGRAÇÕES] Migrações concluídas com sucesso!");
}
