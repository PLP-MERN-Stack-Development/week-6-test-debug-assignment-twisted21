// client/src/components/LoadingSpinner.jsx
// Generic component to display a loading spinner.

import React from 'react';

function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-600">Loading...</p>
        </div>
    );
}

export default LoadingSpinner;