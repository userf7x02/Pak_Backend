const Signup = require("../models/Login_Signup");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// 🔸 Send OTP
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Signup.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 10);

        user.resetOtpHash = otpHash;
        user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Stranger Cars Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
        });



        res.json({ message: "OTP sent to your email!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// 🔸 Verify OTP & reset password
exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await Signup.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.resetOtpHash || Date.now() > user.resetOtpExpires)
            return res.status(400).json({ message: "OTP expired or invalid" });

        const isMatch = await bcrypt.compare(otp, user.resetOtpHash);
        if (!isMatch) return res.status(400).json({ message: "Invalid OTP" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtpHash = undefined;
        user.resetOtpExpires = undefined;
        await user.save();

        res.json({ message: "Password reset successful!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
