// client/src/hooks/useBugApi.js
// Custom hook to provide a simplified interface for interacting with the BugContext.
// This hook abstracts away the direct use of useContext and makes API calls more accessible.

import { useContext } from 'react';
import { BugContext } from '../context/BugContext';

function useBugApi() {
    const context = useContext(BugContext);

    if (context === undefined) {
        throw new Error('useBugApi must be used within a BugProvider');
    }

    return context;
}

export default useBugApi;