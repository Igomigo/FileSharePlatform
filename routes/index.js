// contains all endpoints of the API

const usersController = require("../controllers/UsersController");
const express = require("express");
const router = express.Router();

// Test that the server responds with a get request
router.get("/", (req, res) => {
    res.send("\nWelcome to the FileSharePlatform API, let's show you around");
});

// Post request to register a user
router.post("/users", usersController.users);


module.exports = router;