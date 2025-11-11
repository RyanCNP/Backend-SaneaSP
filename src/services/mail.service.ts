import fs from "fs";
import path from "path";
import { transporter } from "../config/nodemailer.config";
import { IUser, TSafeUser } from "../interfaces/usuario";

export async function sendRegistrationEmail(user: TSafeUser, token: string) {
  const templatePath = path.join(__dirname, "..", "templates", "registrationConfirmation.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  const confirmationLink = `${process.env.FRONTEND_URL}/register-confirmation?token=${token}`;
  html = html
    .replace(/{{nome}}/g, user.nome)
    .replace(/\[LINK_CONFIRMACAO\]/g, confirmationLink);

  await transporter.sendMail({
    from: `"SaneaSP" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Confirme seu cadastro - SaneaSP",
    html,
  });
}

export async function sendLostPasswordEmail(user: IUser, token: string) {
  const templatePath = path.join( __dirname, "..", "templates", "lostPassword.html");
  let html = fs.readFileSync(templatePath, "utf-8");
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  html = html
    .replace(/{{nome}}/g, user.nome)
    .replace(/\[LINK_REDEFINIR\]/g, resetLink);
  await transporter.sendMail({
    from: `"SaneaSP" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Redefina sua senha - SaneaSP",
    html,
  });
}