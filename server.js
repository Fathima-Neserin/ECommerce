const express = require("express");
const colors = require("colors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT 
const DEV_MODE = process.env.DEV_MODE
app.get("/", (req, res) => {
    res.send("<h1>Welcome to ECommerce App, MERN Stack Project</h1>")
})

app.listen(PORT, () => {
    console.log(`Server is Listening on ${DEV_MODE} mode port : ${PORT}` .bgCyan.white);
    
})