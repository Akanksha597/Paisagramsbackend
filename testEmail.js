require("dotenv").config();
const nodemailer = require("nodemailer");

async function testMail() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP VERIFIED");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "TEST EMAIL",
      text: "If you receive this email, SMTP is working",
    });

    console.log("📧 EMAIL SENT:", info.messageId);
  } catch (error) {
    console.error("❌ EMAIL ERROR:", error);
  }
}

testMail();
