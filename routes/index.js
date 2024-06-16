// contains all endpoints of the API

const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// Test that the server responds with a get request
router.get("/", (req, res) => {
    res.send("\nWelcome to the FileSharePlatform API, let's show you around");
});

// Post request to register a user
router.post("/users", UserController.users);

// Get request to sign in a user based on a token generated
router.get("/connect", AuthController.getConnect);

// Get request to sign-out the user based on the token
//router.get("/disconnect", AuthController.getDisconnect);

// Get request to retrieve a user base on the token used
//router.get("/users/me", UserController.getMe);


module.exports = router;