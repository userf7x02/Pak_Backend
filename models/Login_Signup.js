const { Schema, SchemaTypes, model } = require("mongoose")

const SignupSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    resetOtpHash: String,
    resetOtpExpires: Date,
    resetAttempts: { type: Number, default: 0 }

})

const Signup = model("Signup", SignupSchema)
module.exports = Signup
