// server/controllers/bugController.js
// Contains the logic for handling bug-related API requests.

const asyncHandler = require('express-async-handler'); // Simple wrapper for async functions to catch errors
const Bug = require('../models/Bug'); // Bug Mongoose model
const { validateBugInput, validateBugStatus } = require('../utils/validation'); // Validation utilities

// @desc    Get all bugs
// @route   GET /api/bugs
// @access  Public
const getBugs = asyncHandler(async (req, res) => {
    const bugs = await Bug.find({});
    res.status(200).json(bugs);
});

// @desc    Get single bug by ID
// @route   GET /api/bugs/:id
// @access  Public
const getBugById = asyncHandler(async (req, res) => {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
        res.status(404);
        throw new Error('Bug not found');
    }

    res.status(200).json(bug);
});

// @desc    Create a new bug
// @route   POST /api/bugs
// @access  Public
const createBug = asyncHandler(async (req, res) => {
    const { error } = validateBugInput(req.body); // Validate input using Joi-like function
    if (error) {
        res.status(400);
        throw new Error(error.message);
    }

    const { title, description, status, priority, reporter } = req.body;

    const bug = await Bug.create({
        title,
        description,
        status,
        priority,
        reporter,
    });

    res.status(201).json(bug);
});

// @desc    Update a bug by ID
// @route   PUT /api/bugs/:id
// @access  Public
const updateBug = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, reporter } = req.body;

    const bug = await Bug.findById(id);

    if (!bug) {
        res.status(404);
        throw new Error('Bug not found');
    }

    // Validate input fields if they are provided
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) {
        const { error: statusError } = validateBugStatus(status);
        if (statusError) {
            res.status(400);
            throw new Error(statusError.message);
        }
        updateData.status = status;
    }
    if (priority !== undefined) updateData.priority = priority;
    if (reporter !== undefined) updateData.reporter = reporter;

    // Re-validate the combined data (existing bug fields + updates)
    // This ensures that even partial updates adhere to schema validation rules
    const combinedData = { ...bug.toObject(), ...updateData };
    const { error: validationError } = validateBugInput(combinedData, true); // Pass true for partial update validation
    if (validationError) {
        res.status(400);
        throw new Error(validationError.message);
    }

    const updatedBug = await Bug.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    res.status(200).json(updatedBug);
});

// @desc    Delete a bug by ID
// @route   DELETE /api/bugs/:id
// @access  Public
const deleteBug = asyncHandler(async (req, res) => {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
        res.status(404);
        throw new Error('Bug not found');
    }

    await Bug.deleteOne({ _id: req.params.id }); // Use deleteOne for clarity

    res.status(200).json({ message: 'Bug removed' });
});

module.exports = {
    getBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug,
};