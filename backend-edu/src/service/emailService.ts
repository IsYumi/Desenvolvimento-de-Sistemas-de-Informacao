import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("Variáveis de ambiente carregadas:");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "***" : "UNDEFINED");
console.log(
  "EMAIL_PASSWORD:",
  process.env.EMAIL_PASSWORD ? "***" : "UNDEFINED",
);
console.log("SMTP_HOST:", process.env.SMTP_HOST);

// Configurar transporter (ajuste conforme seu SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function enviarOtpEmail(
  email: string,
  codigo: string,
): Promise<void> {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error(
      "Credenciais de e-mail não configuradas. Verifique o arquivo .env",
    );
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Seu código de autenticação",
      html: `
        <h2>Código de Autenticação</h2>
        <p>Use este código para acessar sua conta:</p>
        <h1 style="color: #007bff; font-size: 48px; letter-spacing: 10px;">
          ${codigo}
        </h1>
        <p style="color: #666;">Este código expira em 5 minutos.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado:", info.messageId);
  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro);
    throw erro;
  }
}
