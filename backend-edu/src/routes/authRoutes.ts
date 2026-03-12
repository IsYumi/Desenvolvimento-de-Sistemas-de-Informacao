import { Router, Request, Response } from "express";
import { buscarUm, executar } from "../db/conexao";
import { gerarOtp, gerarExpiracaoOtp } from "../service/otpService";
import { Usuario } from "../usuario/usuario";
import { enviarOtpEmail } from "../service/emailService";

export const authRoutes = Router();

/*
POST /auth/cadastro
*/
authRoutes.post("/cadastro", async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;

    console.log("[CADASTRO] Recebido:", {
      nome,
      email,
      senhaLength: senha?.length,
    });

    if (!nome || !email || !senha) {
      console.log("[CADASTRO] Campos faltando");
      return res.status(400).json({
        ok: false,
        mensagem: "Nome, email e senha são obrigatórios",
      });
    }

    console.log("[CADASTRO] Verificando se email já existe:", email);
    const usuarioExistente = await buscarUm<{ id: number }>(
      "SELECT id FROM usuarios WHERE email = ?",
      [email],
    );

    console.log("[CADASTRO] Resultado da busca:", usuarioExistente);

    if (usuarioExistente) {
      console.log("[CADASTRO] Email já cadastrado");
      return res.status(409).json({
        ok: false,
        mensagem: "E-mail já cadastrado",
      });
    }

    const criado_em = new Date().toISOString();

    console.log("[CADASTRO] Inserindo usuário...");
    const resultado = await executar(
      "INSERT INTO usuarios (nome, email, senha, criado_em) VALUES (?, ?, ?, ?)",
      [nome, email, senha, criado_em],
    );

    console.log("[CADASTRO] Usuário inserido com ID:", resultado.lastID);

    console.log("[CADASTRO] Cadastro concluído com sucesso!");
    return res.status(201).json({
      ok: true,
      mensagem: "Usuário criado",
    });
  } catch (erro) {
    console.error("Erro no cadastro:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

/*
POST /auth/login
*/
authRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    console.log("[LOGIN] Recebido:", { email, senhaLength: senha?.length });
    const usuario = await buscarUm<Usuario>(
      "SELECT * FROM usuarios WHERE email = ?",
      [email],
    );

    console.log("[LOGIN] Usuário encontrado:", usuario ? "Sim" : "Não");

    if (!usuario || usuario.senha !== senha) {
      console.log("[LOGIN] Credenciais inválidas");
      return res.status(401).json({
        ok: false,
        mensagem: "Credenciais inválidas",
      });
    }

    const otp = gerarOtp();
    const expira_em = gerarExpiracaoOtp();
    const criado_em = new Date().toISOString();

    console.log("[LOGIN] Gerando OTP...");
    await executar(
      "INSERT INTO otps (usuario_id, codigo, expira_em, criado_em) VALUES (?, ?, ?, ?)",
      [usuario.id, otp, expira_em, criado_em],
    );

    console.log("[LOGIN] Enviando OTP por e-mail...");
    await enviarOtpEmail(email, otp);

    console.log("[LOGIN] Login bem-sucedido!");
    return res.json({
      ok: true,
    });
  } catch (erro) {
    console.error("Erro no login:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

/*
POST /auth/verificar-otp
*/
authRoutes.post("/verificar-otp", async (req: Request, res: Response) => {
  try {
    const { email, codigo } = req.body;

    console.log("[VERIFICAR-OTP] Recebido:", { email, codigo });
    const usuario = await buscarUm<{ id: number }>(
      "SELECT id FROM usuarios WHERE email = ?",
      [email],
    );

    if (!usuario) {
      console.log("[VERIFICAR-OTP] Usuário não encontrado");
      return res.status(404).json({
        ok: false,
        mensagem: "Usuário não encontrado",
      });
    }

    const registroOtp = await buscarUm<{ codigo: string; expira_em: string }>(
      `SELECT codigo, expira_em
       FROM otps
       WHERE usuario_id = ?
       ORDER BY id DESC
       LIMIT 1`,
      [usuario.id],
    );

    if (!registroOtp) {
      console.log("[VERIFICAR-OTP] OTP não encontrado");
      return res.status(401).json({
        ok: false,
        mensagem: "OTP não encontrado",
      });
    }

    const expirado = new Date() > new Date(registroOtp.expira_em);

    if (expirado) {
      console.log("[VERIFICAR-OTP] OTP expirado");
      return res.status(401).json({
        ok: false,
        mensagem: "OTP expirado",
      });
    }

    if (registroOtp.codigo !== codigo) {
      console.log(
        "[VERIFICAR-OTP] OTP inválido. Esperado:",
        registroOtp.codigo,
        "Recebido:",
        codigo,
      );
      return res.status(401).json({
        ok: false,
        mensagem: "OTP inválido",
      });
    }

    console.log("[VERIFICAR-OTP] OTP validado com sucesso!");
    return res.json({
      ok: true,
      mensagem: "OTP validado",
    });
  } catch (erro) {
    console.error("Erro ao verificar OTP:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

// Aulas (criando variável global)
export const aulaRoutes = Router();

/*
CREATE AULA
POST /aulas
*/
aulaRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { materia, topico, descricao, nivel, tipo_plano } = req.body;

    if (!materia || !topico || !nivel) {
      return res.status(400).json({
        ok: false,
        mensagem: "Matéria, tópico e nível são obrigatórios",
      });
    }

    const resultado = await executar(
      `INSERT INTO aulas (materia, topico, descricao, nivel, tipo_plano)
       VALUES (?, ?, ?, ?, ?)`,
      [materia, topico, descricao ?? null, nivel, tipo_plano ?? null]
    );

    return res.status(201).json({
      ok: true,
      id: resultado.lastID,
    });

  } catch (erro) {
    console.error("Erro ao criar aula:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

/*
LISTAR AULAS
GET /aulas
*/
aulaRoutes.get("/", async (_req: Request, res: Response) => {
  try {
    const aulas = await new Promise((resolve, reject) => {
      const { db } = require("../db/conexao");

      db.all("SELECT * FROM aulas", [], (erro: any, rows: any) => {
        if (erro) reject(erro);
        resolve(rows);
      });
    });

    return res.json({
      ok: true,
      aulas,
    });

  } catch (erro) {
    console.error("Erro ao listar aulas:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

/*
BUSCAR UMA AULA
GET /aulas/:id
*/
aulaRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const aula = await buscarUm(
      "SELECT * FROM aulas WHERE id = ?",
      [id]
    );

    if (!aula) {
      return res.status(404).json({
        ok: false,
        mensagem: "Aula não encontrada",
      });
    }

    return res.json({
      ok: true,
      aula,
    });

  } catch (erro) {
    console.error("Erro ao buscar aula:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

/*
UPDATE
PUT /aulas/:id
*/
aulaRoutes.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { materia, topico, descricao, nivel, tipo_plano } = req.body;

    const resultado = await executar(
      `UPDATE aulas
       SET materia = ?, topico = ?, descricao = ?, nivel = ?, tipo_plano = ?
       WHERE id = ?`,
      [materia, topico, descricao, nivel, tipo_plano, id]
    );

    return res.json({
      ok: true,
      alterados: resultado.changes,
    });

  } catch (erro) {
    console.error("Erro ao atualizar aula:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

/*
DELETE
DELETE /aulas/:id
*/
aulaRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resultado = await executar(
      "DELETE FROM aulas WHERE id = ?",
      [id]
    );

    return res.json({
      ok: true,
      removidos: resultado.changes,
    });

  } catch (erro) {
    console.error("Erro ao remover aula:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

// Atividades
export const atividadeRoutes = Router();

/*
CRIAR ATIVIDADE
POST /atividade
*/
atividadeRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { aula_relacionada, pergunta, resposta } = req.body;

    if (!aula_relacionada || !pergunta || !resposta) {
      return res.status(400).json({
        ok: false,
        mensagem: "Aula, pergunta e resposta são obrigatórias",
      });
    }

    const resultado = await executar(
      `INSERT INTO atividade (aula_relacionada, pergunta, resposta)
       VALUES (?, ?, ?)`,
      [aula_relacionada, pergunta, resposta]
    );

    return res.status(201).json({
      ok: true,
      id: resultado.lastID,
    });

  } catch (erro) {
    console.error("Erro ao criar atividade:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

/*
LISTAR ATIVIDADES
GET /atividade
*/
atividadeRoutes.get("/", async (_req: Request, res: Response) => {
  try {
    const atividades = await new Promise((resolve, reject) => {
      const { db } = require("../db/conexao");

      db.all("SELECT * FROM atividade", [], (erro: any, rows: any) => {
        if (erro) reject(erro);
        resolve(rows);
      });
    });

    return res.json({
      ok: true,
      atividades,
    });

  } catch (erro) {
    console.error("Erro ao listar atividades:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

/*
BUSCAR ATIVIDADE
GET /atividade/:id
*/
atividadeRoutes.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const atividade = await buscarUm(
      "SELECT * FROM atividade WHERE id = ?",
      [id]
    );

    if (!atividade) {
      return res.status(404).json({
        ok: false,
        mensagem: "Atividade não encontrada",
      });
    }

    return res.json({
      ok: true,
      atividade,
    });

  } catch (erro) {
    console.error("Erro ao buscar atividade:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

/*
UPDATE
PUT /atividade/:id
*/
atividadeRoutes.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { pergunta, resposta } = req.body;

    const resultado = await executar(
      `UPDATE atividade
       SET pergunta = ?, resposta = ?
       WHERE id = ?`,
      [pergunta, resposta, id]
    );

    return res.json({
      ok: true,
      alterados: resultado.changes,
    });

  } catch (erro) {
    console.error("Erro ao atualizar atividade:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});

/*
DELETE
DELETE /atividade/:id
*/
atividadeRoutes.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resultado = await executar(
      "DELETE FROM atividade WHERE id = ?",
      [id]
    );

    return res.json({
      ok: true,
      removidos: resultado.changes,
    });

  } catch (erro) {
    console.error("Erro ao remover atividade:", erro);

    return res.status(500).json({
      ok: false,
      mensagem: "Erro interno",
    });
  }
});