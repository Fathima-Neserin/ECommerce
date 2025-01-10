const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB".bgMagenta.white);
    } catch (error) {
        console.log(`Error in MongoDB connection ${error}`.bgRed.black);
        
    }}

    module.exports = connectDB;