// client/src/pages/BugList.jsx
// Component to display a list of all reported bugs.
// Fetches bugs on mount and provides functions for interaction.

import React, { useEffect } from 'react';
import useBugApi from '../hooks/useBugApi'; // Custom hook for bug API operations
import BugItem from '../components/BugItem'; // Component for individual bug display
import LoadingSpinner from '../components/LoadingSpinner'; // Loading indicator
import ErrorMessage from '../components/ErrorMessage'; // Error message display

function BugList({ onEditBug }) {
    const { bugs, loading, error, fetchBugs } = useBugApi();

    // Fetch bugs when the component mounts
    useEffect(() => {
        fetchBugs();
    }, [fetchBugs]); // Dependency array includes fetchBugs to prevent infinite loop (due to useCallback in context)

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (bugs.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-xl text-gray-600">No bugs reported yet. Start by reporting a new bug!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bugs.map((bug) => (
                <BugItem key={bug._id} bug={bug} onEdit={onEditBug} />
            ))}
        </div>
    );
}

export default BugList;
