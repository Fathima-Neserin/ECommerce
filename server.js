const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db.config");

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/categories.routes")

const app = express();

connectDB();

const PORT = process.env.PORT 
const DEV_MODE = process.env.DEV_MODE
app.get("/", (req, res) => {
    res.send("<h1>Welcome to ECommerce App, MERN Stack Project</h1>")
})

app.use(cors())
app.use(morgan("dev"));
app.use(express.json())

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes)

app.listen(PORT, () => {
    console.log(`Server is Listening on ${DEV_MODE} mode port : ${PORT}` .bgCyan.white);
    
})