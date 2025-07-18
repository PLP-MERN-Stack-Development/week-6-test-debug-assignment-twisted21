// server/models/Bug.js
// Defines the Mongoose schema for a Bug document.

const mongoose = require('mongoose');

const bugSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title for the bug'],
            trim: true,
            minlength: [3, 'Title must be at least 3 characters long'],
            maxlength: [100, 'Title cannot exceed 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description for the bug'],
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        status: {
            type: String,
            enum: ['open', 'in-progress', 'resolved', 'closed'], // Allowed statuses
            default: 'open',
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'], // Allowed priorities
            default: 'medium',
        },
        reporter: {
            type: String,
            required: [true, 'Please add a reporter name'],
            trim: true,
            maxlength: [50, 'Reporter name cannot exceed 50 characters'],
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;