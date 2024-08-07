const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

// Routes
const routes = require("./routes");

// Default middleware
app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// Prevent CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");

    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-RequestedWith, Content-Type, Accept, Authorization"
    );

    // Setup accepted API verbs
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
        return res.status(200).json({});
    }

    // Hand over functionality to next middleware if we are not returning anything
    next();
});

// Setup routes
app.use(routes);

// Error handling
app.use((req, res, next) => {
    // 500 instead of 404 to avoid showing attackers that an endpoint does not exist
    const error = new Error("Invalid request");
    error.status = 500;
    next(error);
});

// Misc errors
app.use((error, req, res, next) => {
    if (!res.headersSent) {
        res.status(error.status || 500);
        res.json({
            message: error.message
        });
    } else {
        // Handle the error differently if headers are already sent
        console.error("Error occurred after response was sent:", error);
    }
});

// Exports
module.exports = app;