// Contains the mongodb database connection

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//const dbConfig = async () => {
//    try {
//        console.log("Establishing a connection with the mongodb server");
//        await mongoose.connect(process.env.MONGODB_URI);
//        console.log("Client connected to the mongodb server successfully");
//    } catch (err) {
//        console.log(`Error while establishing connection: ${err}`);
//    }
//}

class DBClient {
    constructor() {
        // Initializes the database class
        this.isConnected = false;
        this.connect = async () => {
            try {
                console.log("Establishing a connection to the mongodb server");
                await mongoose.connect(process.env.MONGODB_URI);
                console.log("Client connected to the mongodb server");
                this.isConnected = true;
            } catch (err) {
                console.log(
                    `Error while connecting to the mongodb server: ${err}`);
            }
        }
    }

    isAlive() {
        // Returns true if mongodb connection is established
        return this.isConnected;
    }

    async nbUsers() {
        // returns the number of documents in the collection `user`
    }

    async nbFiles() {
        // returns the number of documents in the collection `file`
    }
}

const mongoClient = new DBClient();

module.exports = mongoClient;