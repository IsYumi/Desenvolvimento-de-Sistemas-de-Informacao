import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { rodarMigracao } from "./db/migracoes";
import { authRoutes, aulaRoutes, atividadeRoutes } from "./routes/authRoutes";
import { db } from "./db/conexao";

const PORTA = 3333;

async function iniciarServidor(): Promise<void> {
  await rodarMigracao();

  const app: Application = express();

  app.use(cors());
  app.use(express.json());

  // rota de teste simples
  app.get("/status", (_req: Request, res: Response) => {
    res.json({ ok: true, mensagem: "API online" });
  });

  app.use("/auth", authRoutes);

  app.use("/aulas", aulaRoutes);
  app.use("/atividade", atividadeRoutes);

  // middleware de erro
  app.use(
    (erro: unknown, _req: Request, res: Response, _next: NextFunction) => {
      console.error("Erro não tratado:", erro);
      res.status(500).json({ ok: false, mensagem: "Erro interno no servidor" });
    },
  );

  app.listen(PORTA, () => {
    console.log(`Backend em http://localhost:${PORTA}`);
  });

  function fecharServidor() {
    console.log("Encerrando servidor...");
    db.close();
    console.log("Banco SQLite fechado.");
    process.exit(0);
  }

  process.on("SIGINT", fecharServidor);
  process.on("SIGTERM", fecharServidor);
  process.on("SIGKILL", fecharServidor);
}

iniciarServidor().catch((erro) => {
  console.error("Falha ao iniciar servidor:", erro);
  process.exit(1);
});
