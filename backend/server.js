const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute")
const errorHandler = require("./middleware/errorMiddleware")

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes Middleware
app.use("/api/users", userRoute)

// Routes
app.get("/", (req, res) => {
    res.send('Home Page')
})

// Error Middleware
app.use(errorHandler)

// CONNECT TO DB AND START SERVER
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}
            `);
        });
    })
    .catch((error) => console.log(error))