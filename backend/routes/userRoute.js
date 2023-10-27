const express = require("express")
const { registerUser } = require("../controllers/userController")
const router = express.Router()

// const registerUser = () => { }

router.post("/register", registerUser)

module.exports = router
