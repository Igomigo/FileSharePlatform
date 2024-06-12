// User model setup
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        maxLength: 60,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model("User", userSchema);


module.exports = User;