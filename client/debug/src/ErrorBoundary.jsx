// client/src/ErrorBoundary.jsx
// React Error Boundary component to gracefully handle JavaScript errors in its child component tree.

import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    // This static method is called after an error has been thrown by a descendant component.
    // It receives the error that was thrown as a parameter.
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    // This method is called after an error has been thrown by a descendant component.
    // It receives two parameters: error (the error that was thrown) and info (an object with a componentStack key).
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("ErrorBoundary caught an error:", error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
                    <p className="text-lg mb-4">We're sorry for the inconvenience. Please try refreshing the page.</p>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details className="whitespace-pre-wrap text-sm text-red-700 bg-red-50 p-4 rounded-md border border-red-300">
                            <summary className="font-semibold cursor-pointer">Error Details</summary>
                            {this.state.error.toString()}
                            <br />
                            {this.state.errorInfo.componentStack}
                        </details>
                    )}
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300 shadow-md"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
