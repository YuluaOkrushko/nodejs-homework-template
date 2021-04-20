const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_MAIL,
        pass: process.env.DB_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(verificationLink) {
    return this.transporter.sendMail({
      to: process.env.USER_EMAIL,
      from: process.env.MY_MAIL,
      subject: "Please, verify your email",
      html: `<a href="${verificationLink}">Click here for verify your account</a>`,
    });
  }
}

exports.MailSender = new MailSender();
