const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yuluadmitrieva94@gmail.com",
        pass: process.env.DB_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(verificationLink) {
    return this.transporter.sendMail({
      to: "yuluadmitrieva94@gmail.com",
      from: "yuluadmitrieva94@gmail.com",
      subject: "Please, verify your email",
      html: `<a href="${verificationLink}">Click here for verify your account</a>`,
    });
  }
}

exports.MailSender = new MailSender();
