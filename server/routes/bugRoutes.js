// server/routes/bugRoutes.js
// Defines the API routes for bug operations and maps them to controller functions.

const express = require('express');
const router = express.Router();
const {
    getBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug,
} = require('../controllers/bugController');

// Define routes
router.route('/').get(getBugs).post(createBug);
router.route('/:id').get(getBugById).put(updateBug).delete(deleteBug);

module.exports = router;