// file specific controllers
const User = require("../models/user");
const client = require("../config/redisCient");

exports.postUpload = async (req, res) => {
    // Creates a file and returns it's data
    try {
        if (!req.current_user) {
            throw new Error("Unauthorized");
        }
        const {name, type, parentId, isPublic, data} = req.body;
        if (!name) {
            return res.status(400).json({error: "name missing"});
        }
        if (!type) {
            return res.status(400).json({error: "type missing"});
        }
        if (!data && type !== "folder") {
            return res.status(400).json({error: "folder missing"});
        }
    } catch (err) {
        console.log(`${err}`);
        if (err.message.includes("unauthorized")) {
            return res.status(401).json({Error: err.message});
        }
        return res.status(500).json({Error: err.message});
    }
}