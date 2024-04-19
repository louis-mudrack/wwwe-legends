import React, { useState, useRef } from 'react';
import NotificationContainer from '../Notification';

export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const notificationRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.target;
        const body = new FormData(form);
        const fetchParams = {
            method: 'POST',
            body: body,
        };

        fetch(form.action, fetchParams)
            .then((response) => response.json())
            .then((body) => {
                handleResponse(body);
                setIsLoading(false);
            })
            .catch((error) => {
                notificationRef.current.triggerNotification({
                    headline: 'Error:',
                    body: 'Something went terribly wrong!',
                    timeout: 3000,
                });
                setIsLoading(false);
            });
    };

    const handleResponse = (body) => {
        switch (body.status) {
            case 'fail':
                notificationRef.current.triggerNotification({
                    headline: 'Failed',
                    body: body.message,
                    timeout: 3000,
                });
                break;
            case 'error':
                handleErrors(body);
                break;
            case 'warning':
                notificationRef.current.triggerNotification({
                    headline: 'Warning',
                    body: body.message,
                    timeout: 3000,
                });
                break;
            case 'success':
                handleSuccess(body);
                break;
            default:
                notificationRef.current.triggerNotification({
                    headline: 'Error:',
                    body: 'Something went wrong!',
                    timeout: 3000,
                });
        }
    };

    const handleErrors = (body) => {
        let errorMessage = '';
        if (body.error.errors) {
            for (const error in body.error.errors) {
                errorMessage += `<b>${error}</b>: ${body.error.errors[error].message} <br />`;
            }
        } else {
            errorMessage = body.message ? body.message : 'Something happened and I have no idea what to do :/';
        }
        notificationRef.current.triggerNotification({
            headline: 'Error',
            body: errorMessage,
            timeout: 3000,
        });
    };

    const handleSuccess = (body) => {
        notificationRef.current.triggerNotification({
            headline: 'Success',
            body: body.message,
            timeout: 3000,
        });
        if (body.redirect) {
            setTimeout(() => {
                window.location.href = body.redirect;
            }, 1000);
        }
    };

    return (
        <div>
            <NotificationContainer ref={notificationRef} />
            <form onSubmit={handleSubmit} action="/api/user/signup">
                <input type="text" placeholder="Username" name="username" />
                <input type="password" placeholder="Password" name="password" />
                <input type="password" placeholder="Confirm Password" name="passwordConfirm" />
                <input type="text" placeholder="Email" name="email" />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}
