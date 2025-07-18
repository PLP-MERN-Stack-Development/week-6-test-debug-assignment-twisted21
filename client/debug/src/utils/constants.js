// client/src/utils/constants.js
// Centralized constants for the frontend application.

// Base URL for the backend API
// Uses environment variable (e.g., .env.development, .env.production)
// Falls back to localhost:5000 if not set (matching your server's default port)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Other constants can be added here, e.g., bug statuses, priorities
export const BUG_STATUSES = ['open', 'in-progress', 'resolved', 'closed'];
export const BUG_PRIORITIES = ['low', 'medium', 'high'];
