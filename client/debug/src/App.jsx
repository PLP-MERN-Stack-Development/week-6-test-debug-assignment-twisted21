// client/src/App.jsx
// Main application component. Handles basic routing (conditional rendering)
// and provides the overall structure for the bug tracker.

import React, { useState } from 'react';
import BugList from './pages/BugList';
import BugForm from './pages/BugForm';

function App() {
    // State to manage which view is currently active: 'list' or 'form'
    const [view, setView] = useState('list');
    // State to hold the bug data if we are editing an existing bug
    const [editingBug, setEditingBug] = useState(null);

    // Function to navigate to the form for creating a new bug
    const handleCreateNewBug = () => {
        setEditingBug(null); // Clear any editing state
        setView('form');
    };

    // Function to navigate to the form for editing an existing bug
    const handleEditBug = (bug) => {
        setEditingBug(bug);
        setView('form');
    };

    // Function to navigate back to the bug list
    const handleGoToList = () => {
        setView('list');
        setEditingBug(null); // Clear editing state when going back to list
    };

    return (
        <div className="min-h-screen bg-gray-100 font-inter flex flex-col items-center py-8 px-4">
            <header className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Bug Tracker</h1>
                <nav>
                    {view === 'list' ? (
                        <button
                            onClick={handleCreateNewBug}
                            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md"
                        >
                            Report New Bug
                        </button>
                    ) : (
                        <button
                            onClick={handleGoToList}
                            className="bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition duration-300 shadow-md"
                        >
                            View All Bugs
                        </button>
                    )}
                </nav>
            </header>

            <main className="w-full max-w-4xl">
                {view === 'list' ? (
                    <BugList onEditBug={handleEditBug} />
                ) : (
                    <BugForm editingBug={editingBug} onBugSaved={handleGoToList} />
                )}
            </main>
        </div>
    );
}

export default App;