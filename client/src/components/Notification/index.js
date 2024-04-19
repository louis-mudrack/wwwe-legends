import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './index.css';

const Notification = ({ headline, body, timeout, onClose }) => {
    useEffect(() => {
        if (timeout) {
            const timer = setTimeout(onClose, timeout);
            return () => clearTimeout(timer);
        }
    }, [timeout, onClose]);

    return (
        <div className="notification fade-in">
            <span className="headline">{headline}</span>
            <p className="body">{body}</p>
            <div className="notification-close" onClick={onClose}>
                &times;
            </div>
        </div>
    );
};

const NotificationContainer = forwardRef((props, ref) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (settings) => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications((prevNotifications) => [...prevNotifications, { ...settings, id }]);
    };

    const removeNotification = (id) => {
        setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
    };

    useImperativeHandle(ref, () => ({
        triggerNotification: (settings) => {
            addNotification(settings);
        },
    }));

    return (
        <div id="notification-container">
            {notifications.map((notification) => (
                <Notification
                    key={notification.id}
                    headline={notification.headline}
                    body={notification.body}
                    timeout={notification.timeout}
                    onClose={() => removeNotification(notification.id)}
                />
            ))}
        </div>
    );
});

export default NotificationContainer;
