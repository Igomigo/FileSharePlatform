// Contains the mongodb database connection

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

class DBClient {
    constructor() {
        // Initializes the database class
        this.isconnected = false;
        this.connect = async () => {
            try {
                await mongoose.connect(process.env.MONGODB_URI);
                console.log("Client connected to the mongodb server");
                this.isconnected = true;
            } catch (err) {
                console.log(
                    `Error while connecting to the mongodb server: ${err}`);
            }
        }
    }
}