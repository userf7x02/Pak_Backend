const User = require('../models/Login_Signup')
const bcrypt = require("bcrypt")

async function Login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        res.json({
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                contact: user.contact,
                image: user.image 
            }
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message })
    }
}

module.exports = Login
