// Contains the mongodb database connection
const mongoClient = require("../config/mongoClient");

exports.nbUsers = async () => {
    // Returns the number of documents in the collection `user`
    return this.isConnected;
}

exports.nbFiles = async () => {
        // returns the number of documents in the collection `file`
}