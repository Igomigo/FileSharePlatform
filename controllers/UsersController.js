const User = require("../models/user");
const bcrypt = require("bcrypt");

async function hashpwd(pwd) {
    // Returns hashed password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    return hashedPwd;
}

exports.users = async (req, res) => {
    // Creates a user
    const {username, email, password} = req.body;
    try {
        if (email && password) {
            // Check if user already exists
            const exists = User.find({email: email});
            if (exists) {
                throw new Error("User already exists");
            } else {
                console.log("Creating user...");
                const hashedPwd = await hashpwd(password);
                const user = new User({
                    username: username || "",
                    email: email,
                    password: hashedPwd
                });
                await user.save();
                console.log(`User with email <${email}> created`);
                res.status(200).json({
                    status: "success",
                    message: "User created",
                    email: email
                });
            }
        } else {
            res.status(409).json({
                status: "failed",
                message: "Wrong credentials"
            });
        }
    } catch (err) {
        if (err.message.includes("exists")) {
            console.log(`User with email <${email}> already exists`);
            res.json(403).json("User account already exists, create a new one");
        } else {
            console.error("An error occured", err);
            res.json(500).json("Error registering user");
        }
    }
}