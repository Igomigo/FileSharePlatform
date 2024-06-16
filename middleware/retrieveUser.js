// Middleware that retrieves a user id based on a token
const User = require("../models/user");
const client = require("../config/redisCient");

async function getUser(req, res, next) {
    // Retrieves the userId from token and populates the req with this data
    try {
        const token = req.headers["x-token"];
        if (!token) {
            console.log("Token not found, probably expired");
            throw new Error("unauthorized");
        }
        req.token = token;
        const key = `auth_${token}`;
        const userId = await client.get(key);
        const user = await User.findOne({ _id: userId });
        req.current_user = user;
        next();
    } catch (err) {
        console.log(`${err}`);
        if (err.message.includes("unauthorized")) {
            return res.status(401).json({Error: err.message});
        }
        res.status(500).json({Error: err.message});
    }
}

module.exports = getUser;