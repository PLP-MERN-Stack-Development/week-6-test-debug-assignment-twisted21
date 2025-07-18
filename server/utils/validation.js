// server/utils/validation.js
// Utility functions for validating bug input data.
// Using a simple object-based validation for demonstration,
// but in a real app, you might use libraries like Joi or Yup.

const allowedStatuses = ['open', 'in-progress', 'resolved', 'closed'];
const allowedPriorities = ['low', 'medium', 'high'];

/**
 * Validates the input data for creating or updating a bug.
 * @param {object} data - The bug data to validate.
 * @param {boolean} isPartial - If true, allows partial data for updates.
 * @returns {{error: {message: string}|null}} An object with an error message if validation fails, otherwise null.
 */
const validateBugInput = (data, isPartial = false) => {
    const { title, description, status, priority, reporter } = data;

    if (!isPartial || title !== undefined) {
        if (!title || typeof title !== 'string' || title.trim().length < 3 || title.trim().length > 100) {
            return { error: { message: 'Title is required and must be between 3 and 100 characters.' } };
        }
    }

    if (!isPartial || description !== undefined) {
        if (!description || typeof description !== 'string' || description.trim().length > 500) {
            return { error: { message: 'Description is required and cannot exceed 500 characters.' } };
        }
    }

    if (!isPartial || status !== undefined) {
        if (!status || !allowedStatuses.includes(status)) {
            return { error: { message: `Status must be one of: ${allowedStatuses.join(', ')}.` } };
        }
    }

    if (!isPartial || priority !== undefined) {
        if (!priority || !allowedPriorities.includes(priority)) {
            return { error: { message: `Priority must be one of: ${allowedPriorities.join(', ')}.` } };
        }
    }

    if (!isPartial || reporter !== undefined) {
        if (!reporter || typeof reporter !== 'string' || reporter.trim().length === 0 || reporter.trim().length > 50) {
            return { error: { message: 'Reporter is required and cannot exceed 50 characters.' } };
        }
    }

    return { error: null };
};

/**
 * Validates a single bug status.
 * @param {string} status - The status string to validate.
 * @returns {{error: {message: string}|null}} An object with an error message if validation fails, otherwise null.
 */
const validateBugStatus = (status) => {
    if (!status || !allowedStatuses.includes(status)) {
        return { error: { message: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}.` } };
    }
    return { error: null };
};

module.exports = {
    validateBugInput,
    validateBugStatus,
};