// client/src/context/BugContext.jsx
// React Context to manage global state related to bugs.
// Provides functions for fetching, creating, updating, and deleting bugs.

import React, { createContext, useReducer, useCallback } from 'react';
import { api } from '../utils/api'; // Axios instance for API calls

// Initial state for the bug context
const initialState = {
    bugs: [],
    loading: false,
    error: null,
};

// Reducer function to handle state transitions
const bugReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_BUGS_REQUEST':
        case 'CREATE_BUG_REQUEST':
        case 'UPDATE_BUG_REQUEST':
        case 'DELETE_BUG_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_BUGS_SUCCESS':
            return { ...state, loading: false, bugs: action.payload, error: null };
        case 'CREATE_BUG_SUCCESS':
            return { ...state, loading: false, bugs: [...state.bugs, action.payload], error: null };
        case 'UPDATE_BUG_SUCCESS':
            return {
                ...state,
                loading: false,
                bugs: state.bugs.map((bug) =>
                    bug._id === action.payload._id ? action.payload : bug
                ),
                error: null,
            };
        case 'DELETE_BUG_SUCCESS':
            return {
                ...state,
                loading: false,
                bugs: state.bugs.filter((bug) => bug._id !== action.payload),
                error: null,
            };
        case 'FETCH_BUGS_FAILURE':
        case 'CREATE_BUG_FAILURE':
        case 'UPDATE_BUG_FAILURE':
        case 'DELETE_BUG_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// Create the BugContext
export const BugContext = createContext(initialState);

// BugProvider component to wrap the application and provide context values
export const BugProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bugReducer, initialState);

    // Fetch all bugs from the API
    const fetchBugs = useCallback(async () => {
        dispatch({ type: 'FETCH_BUGS_REQUEST' });
        try {
            const response = await api.get('/bugs');
            dispatch({ type: 'FETCH_BUGS_SUCCESS', payload: response.data });
        } catch (err) {
            console.error("Error fetching bugs:", err);
            dispatch({
                type: 'FETCH_BUGS_FAILURE',
                payload: err.response?.data?.message || err.message || 'Failed to fetch bugs',
            });
        }
    }, []);

    // Create a new bug
    const createBug = useCallback(async (bugData) => {
        dispatch({ type: 'CREATE_BUG_REQUEST' });
        try {
            const response = await api.post('/bugs', bugData);
            dispatch({ type: 'CREATE_BUG_SUCCESS', payload: response.data });
            return response.data; // Return the created bug
        } catch (err) {
            console.error("Error creating bug:", err);
            dispatch({
                type: 'CREATE_BUG_FAILURE',
                payload: err.response?.data?.message || err.message || 'Failed to create bug',
            });
            throw err; // Re-throw to allow component to handle form-specific errors
        }
    }, []);

    // Update an existing bug
    const updateBug = useCallback(async (id, bugData) => {
        dispatch({ type: 'UPDATE_BUG_REQUEST' });
        try {
            const response = await api.put(`/bugs/${id}`, bugData);
            dispatch({ type: 'UPDATE_BUG_SUCCESS', payload: response.data });
            return response.data; // Return the updated bug
        } catch (err) {
            console.error("Error updating bug:", err);
            dispatch({
                type: 'UPDATE_BUG_FAILURE',
                payload: err.response?.data?.message || err.message || 'Failed to update bug',
            });
            throw err; // Re-throw to allow component to handle form-specific errors
        }
    }, []);

    // Update only the status of a bug
    const updateBugStatus = useCallback(async (id, status) => {
        dispatch({ type: 'UPDATE_BUG_REQUEST' }); // Use generic update request for status change
        try {
            const response = await api.put(`/bugs/${id}`, { status });
            dispatch({ type: 'UPDATE_BUG_SUCCESS', payload: response.data });
        } catch (err) {
            console.error("Error updating bug status:", err);
            dispatch({
                type: 'UPDATE_BUG_FAILURE',
                payload: err.response?.data?.message || err.message || 'Failed to update bug status',
            });
        }
    }, []);

    // Delete a bug
    const deleteBug = useCallback(async (id) => {
        dispatch({ type: 'DELETE_BUG_REQUEST' });
        try {
            await api.delete(`/bugs/${id}`);
            dispatch({ type: 'DELETE_BUG_SUCCESS', payload: id });
        } catch (err) {
            console.error("Error deleting bug:", err);
            dispatch({
                type: 'DELETE_BUG_FAILURE',
                payload: err.response?.data?.message || err.message || 'Failed to delete bug',
            });
        }
    }, []);

    return (
        <BugContext.Provider
            value={{
                bugs: state.bugs,
                loading: state.loading,
                error: state.error,
                fetchBugs,
                createBug,
                updateBug,
                updateBugStatus,
                deleteBug,
            }}
        >
            {children}
        </BugContext.Provider>
    );
};
