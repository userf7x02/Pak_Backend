const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/sendContact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // e.g. your Gmail
        pass: process.env.EMAIL_PASS, // App password (not Gmail password)
      },
    });

    // Send message to your email
    await transporter.sendMail({
      from: `"PakClassified Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // ✅ your email gets the message
      subject: `New Message from ${name}`,
      text: `From: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      replyTo: email, // 👈 allows you to reply directly to the sender
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending message" });
  }
});

module.exports = router;
