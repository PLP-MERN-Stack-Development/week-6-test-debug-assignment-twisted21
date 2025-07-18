import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind CSS imports
import App from './App';
import { BugProvider } from './context/BugContext'; // Import the Bug Context Provider
import ErrorBoundary from './ErrorBoundary'; // Import the ErrorBoundary component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* ErrorBoundary to catch and display UI errors gracefully */}
        <ErrorBoundary>
            {/* BugProvider makes bug-related state and actions available throughout the app */}
            <BugProvider>
                <App />
            </BugProvider>
        </ErrorBoundary>
    </React.StrictMode>
);