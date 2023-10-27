const asyncHandler = require("express-async-handler")
const User = require('../models/userModels')
const bcrypt = require('bcryptjs')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Por favor completa todos campos obrigatorio")
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Senha deve ser maior que 6 caracteres")
    }

    // Check if user email already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error("Email deve ser válido")
    }

    // Encrypt password before saving to DB
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash()

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    })
    if (user) {
        const { _id, name, email, photo, phone, bio } = user
        res.status(201).json({
            _id, name, email, photo, phone, bio
        })
    } else {
        res.status(400);
        throw new Error("Usuário inválido")
    }

})

module.exports = {
    registerUser
}