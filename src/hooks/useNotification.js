import { useState, useEffect } from 'react';

/**
 * Custom hook for managing notifications with auto-dismiss
 * @param {number} dismissTime - Time in milliseconds before auto-dismiss (default: 5000)
 * @returns {Object} - { notification, showNotification, clearNotification }
 */
export function useNotification(dismissTime = 5000) {
    const [notification, setNotification] = useState(null);

    // Auto-clear notification after specified time
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, dismissTime);
            return () => clearTimeout(timer);
        }
    }, [notification, dismissTime]);

    const showNotification = (type, message) => {
        setNotification({ type, message });
    };

    const clearNotification = () => {
        setNotification(null);
    };

    return {
        notification,
        showNotification,
        clearNotification
    };
} 