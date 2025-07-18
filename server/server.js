// server/server.js
// Main entry point for the Express server.
// Initializes the database connection, sets up middleware, and defines API routes.

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Import database connection function
const bugRoutes = require('./routes/bugRoutes'); // Import bug API routes
const { notFound, errorHandler } = require('./middleware/errorHandler'); // Import error handling middleware

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// Enable CORS for all origins (for development purposes)
// In a production environment, you should restrict this to your frontend's origin.
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow your React app's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json()); // Body parser for JSON data

// API Routes
app.use('/api/bugs', bugRoutes); // All bug-related routes will be prefixed with /api/bugs

// Root route for basic server check
app.get('/', (req, res) => {
    res.send('Bug Tracker API is running...');
});

// Custom error handling middleware
// This should be placed after all other routes and middleware.
app.use(notFound); // Handles 404 Not Found errors
app.use(errorHandler); // Handles other errors

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});