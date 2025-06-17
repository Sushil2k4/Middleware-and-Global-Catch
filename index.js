const express = require('express');
const app = express();

// Built-in middleware to parse JSON
app.use(express.json());

// Custom logging middleware (optional but useful)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Route
app.post('/health-checkup', function (req, res, next) {
    try {
        const kidneys = req.body.kidneys;

        // Validate input
        if (!Array.isArray(kidneys)) {
            throw new Error("Kidneys should be an array.");
        }

        const kidneyLength = kidneys.length;
        res.send("Your kidney count is " + kidneyLength);
    } catch (err) {
        next(err); // pass error to global handler
    }
});

// Global error-handling middleware
app.use(function (err, req, res, next) {
    console.error("Error caught by global handler:", err.message);
    res.status(500).json({
        success: false,
        message: "Sorry, something went wrong on our server.",
        error: err.message // show actual error in dev mode only
    });
});

// Start server
app.listen(3000, () => {
    console.log("✅ Server is running on http://localhost:3000");
});
