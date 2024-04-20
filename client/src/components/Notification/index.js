import { useEffect, useContext } from 'react';
import { NotificationContext } from '../../NotificationContext';
import './index.css';

const NotificationContainer = () => {
    const { notification, setNotification } = useContext(NotificationContext);

    useEffect(() => {
        if (notification && notification.timeout) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, notification.timeout);
            return () => clearTimeout(timer);
        }
    }, [notification, setNotification]);

    if (!notification) return null;

    return (
        <div id="notification-container">
            <div className="notification fade-in">
                <span className="headline">{notification.headline}</span>
                <p className="body">{notification.body}</p>
                <div className="notification-close" onClick={() => setNotification(null)}>
                    &times;
                </div>
            </div>
        </div>
    );
};

export default NotificationContainer;
