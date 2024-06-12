// contains all endpoints of the API

const usersController = require("../controllers/UsersController");
const express = require("express");
const router = express.Router();

// Post request to register a user
router.post("/users", usersController.users);


module.exports = router;