// Centralized point where the app is run
const express = require("express");
const morgan = require("morgan");

const routes = require("./routes/index");
const dbConnect = require("./config/mongoClient");
const router = require("./routes/index");

// Create the express app
const app = express();

// Set the port the server listens on
const PORT = process.env.PORT || 5000;

// Load the mongodb database
dbConnect();

// Middleware setup
app.use(express.json({ limit: '50mb' }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(router);

// Run the server
app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});
