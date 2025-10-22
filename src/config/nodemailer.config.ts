import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

function createTransporter(): Transporter {
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("❌ As variáveis SMTP_HOST, SMTP_PORT, SMTP_USER e SMTP_PASS devem estar definidas no .env");
  }

  const port = Number(process.env.SMTP_PORT);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? port : 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export const transporter = createTransporter();