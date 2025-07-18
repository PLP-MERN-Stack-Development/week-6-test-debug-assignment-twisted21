// client/src/components/BugItem.jsx
// Component to display a single bug item in the list.
// Allows updating status and deleting the bug.

import React, { useContext } from 'react';
import { BugContext } from '../context/BugContext'; // Import BugContext to access actions

function BugItem({ bug, onEdit }) {
    const { updateBugStatus, deleteBug } = useContext(BugContext);

    // Handles changing the bug's status
    const handleStatusChange = (e) => {
        updateBugStatus(bug._id, e.target.value);
    };

    // Handles deleting the bug
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${bug.title}"?`)) {
            deleteBug(bug._id);
        }
    };

    // Determine color based on status for visual feedback
    const getStatusColor = (status) => {
        switch (status) {
            case 'open':
                return 'bg-red-100 text-red-800';
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'resolved':
                return 'bg-green-100 text-green-800';
            case 'closed':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Determine color based on priority
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low':
                return 'text-green-600';
            case 'medium':
                return 'text-yellow-600';
            case 'high':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-200">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900 pr-4">{bug.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bug.status)}`}>
                    {bug.status.replace('-', ' ')}
                </span>
            </div>
            <p className="text-gray-700 mb-3">{bug.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                <span>Reported by: <span className="font-medium text-gray-800">{bug.reporter}</span></span>
                <span>Priority: <span className={`font-semibold ${getPriorityColor(bug.priority)}`}>{bug.priority}</span></span>
            </div>
            <div className="flex items-center space-x-4">
                <label htmlFor={`status-${bug._id}`} className="sr-only">Change Status</label>
                <select
                    id={`status-${bug._id}`}
                    value={bug.status}
                    onChange={handleStatusChange}
                    className="flex-grow p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>
                <button
                    onClick={() => onEdit(bug)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 shadow-sm"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 shadow-sm"
                >
                    Delete
                </button>
            </div>
            <div className="text-xs text-gray-500 mt-3 text-right">
                Created: {new Date(bug.createdAt).toLocaleString()} | Last Updated: {new Date(bug.updatedAt).toLocaleString()}
            </div>
        </div>
    );
}

export default BugItem;