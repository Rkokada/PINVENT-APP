const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Por favor, insira um nome válido!"]
    },
    email: {
        type: String,
        required: [true, "Por favor, insira um email "],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Por favor, insira um email válido!"
        ]
    },
    password: {
        type: String,
        required: [true, "Por favor, insira uma senha!"],
        minLength: [6, "A senha deve ser maior que 6 caracteres"],
        maxLength: [23, "A senha deve ser menor que 23 caracteres"]
    },
    photo: {
        type: String,
        required: [true, "Por favor insira uma foto"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone: {
        type: String,
        default: "+55"
    },
    bio: {
        type: String,
        maxLength: [250, "A bio não deve ser maior que 250 caracteres"],
        default: "bio"
    },
},
    { timestamp: true, }
)

const User = mongoose.model("User", userSchema)

module.exports = User