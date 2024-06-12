// Establishes a connection to the mongodb server
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = async () => {
    try {
        console.log("Establishing a connection with the mongodb server");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Client connected to the mongodb server successfully");
    } catch (err) {
        console.log(`Error while establishing connection: ${err}`);
    }
}

module.exports = dbConfig;