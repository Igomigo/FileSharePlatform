// contains all endpoints of the API

const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const FilesController = require("../controllers/FilesController");
const getUserMiddleware = require("../middleware/retrieveUser");

// Test that the server responds with a GET request
router.get("/", (req, res) => {
    res.send("\nWelcome to the FileSharePlatform API, let's show you around");
});

// POST request to register a user
router.post("/users", UserController.users);

// GET request to sign in a user based on a token generated
router.get("/connect", AuthController.getConnect);

// GET request to sign-out the user based on the token
router.get("/disconnect", getUserMiddleware, AuthController.getDisconnect);

// GET request to retrieve a user base on the token used
router.get("/users/me", getUserMiddleware, UserController.getMe);

// Post request to create a new file
router.post("/files", getUserMiddleware, FilesController.postUpload);

// GET request to retrieve a file based on the id
router.get("/files/:id", getUserMiddleware, FilesController.getShow);

// GET request to retrieve all files from the database
router.get("/files", getUserMiddleware, FilesController.getIndex);

// PUT request to update the isPublic field to the value "true"
router.put("/files/:id/publish", getUserMiddleware, FilesController.putPublish);

// PUT request to update the isPublic field to the value "false"
router.put("/files/:id/unpublish", getUserMiddleware, FilesController.putUnPublish);

// GET request to return the data/content of a file
router.get("/files/:id/data", getUserMiddleware, FilesController.getFile);


module.exports = router;