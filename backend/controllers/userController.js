const asyncHandler = require("express-async-handler")
const User = require('../models/userModels')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

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




    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    })

    // Generate Token
    const token = generateToken(user._id);
    // Send HTTP only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    })


    if (user) {
        const { _id, name, email, photo, phone, bio, } = user;
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        })
    } else {
        res.status(400)
        throw new Error("Usuário inválido")
    }

})

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // validate request
    if (!email || !password) {
        res.status(400)
        throw new Error("Por favor insira email e senha")
    }

    // check if user exists
    const user = await User.findOne({ email })

    if (!user) {
        res.status(400);
        throw new Error("Usuário nao encontrado, pro favor cadastra-se ")
    }

    // User exists, check is password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // Generate Token
    const token = generateToken(user._id);
    // Send HTTP only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
    })

    if (user && passwordIsCorrect) {

        const { _id, name, email, photo, phone, bio, } = user;
        res.status(200).json({
            _id, name, email, photo, phone, bio, token
        });

    } else {
        res.status(400);
        throw new Error("email e senha invalidos");
    }

})
module.exports = {
    registerUser,
    loginUser,
}