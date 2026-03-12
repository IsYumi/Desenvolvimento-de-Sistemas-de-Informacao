import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_u0am5ba";
const TEMPLATE_ID = "template_ykagu3q";
const PUBLIC_KEY = "TdX-Sfk8Rwl5dRHDy";

// inicializa uma vez
emailjs.init(PUBLIC_KEY);

export async function enviarOtpEmail(email: string, codigo: string) {
  try {
    const r = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      user_email: email,
      otp_code: codigo,
    });
    console.log("Email enviado:", r.status, r.text);
  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro);
    throw erro;
  }
}
