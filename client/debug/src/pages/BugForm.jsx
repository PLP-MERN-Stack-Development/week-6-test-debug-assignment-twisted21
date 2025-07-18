// client/src/pages/BugForm.jsx
// Component for creating a new bug or editing an existing one.
// Uses the useBugApi hook to interact with the backend.

import React, { useState, useEffect } from 'react';
import useBugApi from '../hooks/useBugApi'; // Custom hook for bug API operations
import ErrorMessage from '../components/ErrorMessage'; // Component to display errors

function BugForm({ editingBug, onBugSaved }) {
    const { createBug, updateBug, loading, error } = useBugApi();

    // Form state, initialized with editingBug data if provided, otherwise empty
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
        reporter: '',
    });
    const [formError, setFormError] = useState(null); // Specific error for form validation

    // Effect to populate form data when editingBug prop changes
    useEffect(() => {
        if (editingBug) {
            setFormData({
                title: editingBug.title || '',
                description: editingBug.description || '',
                status: editingBug.status || 'open',
                priority: editingBug.priority || 'medium',
                reporter: editingBug.reporter || '',
            });
        } else {
            // Reset form for new bug creation
            setFormData({
                title: '',
                description: '',
                status: 'open',
                priority: 'medium',
                reporter: '',
            });
        }
        setFormError(null); // Clear form-specific errors on bug change
    }, [editingBug]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setFormError(null); // Clear error on input change
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null); // Clear previous form errors

        try {
            if (editingBug) {
                // Update existing bug
                await updateBug(editingBug._id, formData);
            } else {
                // Create new bug
                await createBug(formData);
            }
            onBugSaved(); // Callback to navigate back to list or clear form
        } catch (err) {
            // Error from API (e.g., validation errors from backend)
            setFormError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
            console.error("Form submission error:", err);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {editingBug ? 'Edit Bug' : 'Report New Bug'}
            </h2>
            <ErrorMessage message={formError || error} /> {/* Display form-specific or global errors */}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Login button not working"
                        required
                        maxLength="100"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 resize-y"
                        placeholder="Provide detailed steps to reproduce the bug..."
                        required
                        maxLength="500"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                        Status:
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="priority" className="block text-gray-700 text-sm font-bold mb-2">
                        Priority:
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="reporter" className="block text-gray-700 text-sm font-bold mb-2">
                        Reporter:
                    </label>
                    <input
                        type="text"
                        id="reporter"
                        name="reporter"
                        value={formData.reporter}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Name"
                        required
                        maxLength="50"
                    />
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        type="button"
                        onClick={onBugSaved} // Use onBugSaved to go back to list
                        className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-300 shadow-md"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (editingBug ? 'Update Bug' : 'Report Bug')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BugForm;