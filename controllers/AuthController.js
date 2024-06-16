// Contains authentication code
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const client = require("../config/redisCient");

function decodeCredentials(credentials) {
    // Returns the decoded data from the authorization header
    const decoded = Buffer.from(credentials, "base64").toString("utf-8");
    return decoded;
}

function genToken() {
    // Generates and returns a token
    const token = uuidv4();
    return token;
}

async function storeInRedis(key, userId) {
    // Stores the user id in redis using the generated token as key
    await client.setEx(key, 24 * 60 * 60, userId);
} 

exports.getConnect = async (req, res) => {
    // should sign in the user by generating a new authentication token
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error("Authorization header not set");
        }
        const credentials = authHeader.split(" ")[1];
        console.log(typeof credentials);
        const decodedData = decodeCredentials(credentials);
        const [email, password] = decodedData.split(":");
        // Check if user exists
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(401).json("Unauthorized");
        }
        const token = genToken();
        // Create the key to store the userId in redis
        const key = `auth_${token}`;
        await storeInRedis(key, String(user._id));
        res.status(200).json({ token: token });
    } catch (err) {
        if (err.message.includes("not set")) {
            console.error("Error: ", err.message);
            return res.status(400).json(err.message);
        }
        console.error(`${err}`);
        res.status(500).json(err.message);
    }
}

exports.getDisconnect = async (req, res) => {
    // sign-out the user based on the token
    try {
        const token = req.headers['x-token'];
        const key = `auth_${token}`;
        const userId = await client.get(key)
        if (!userId) {
            throw new Error("Unauthorized");
        }
        await client.del(key);
        res.status(204).json();
    } catch (err) {
        console.error(`${err}`);
        return res.status(401).json({ Error: err.message });
    }
}