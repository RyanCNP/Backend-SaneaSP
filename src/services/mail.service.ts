import fs from "fs";
import path from "path";
import { transporter } from "../config/nodemailer.config";
import { IUser } from "../interfaces/usuario";

export async function sendRegistrationEmail(user: IUser, token: string) {
  const templatePath = path.join(__dirname, "..", "templates", "registrationConfirmation.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  const confirmationLink = `${process.env.FRONTEND_URL}/register-confirmation?token=${token}`;
  html = html.replace(/{{nome}}/g, user.nome).replace(/\[LINK_CONFIRMACAO\]/g, confirmationLink);

  await transporter.sendMail({
    from: `"SaneaSP" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Confirme seu cadastro - SaneaSP",
    html,
  });
}
