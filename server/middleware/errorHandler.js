// server/middleware/errorHandler.js
// Custom error handling middleware for Express.

// Handles 404 Not Found errors
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error to the next error handling middleware
};

// Generic error handler
const errorHandler = (err, req, res, next) => {
    // Determine the status code: if a status code was already set by a previous middleware/route, use it, otherwise default to 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        // In development, send the stack trace for debugging.
        // In production, avoid sending stack traces for security reasons.
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };