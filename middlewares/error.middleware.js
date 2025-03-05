// Error handling middleware
exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message: message
    });
};

// Middleware to handle 404 routes
exports.notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API route not found."
    });
};
