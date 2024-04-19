import { useState, useRef } from 'react';

export default function useForm(initialValues, submitAction) {
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState(initialValues);
    const notificationRef = useRef();

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setValues((values) => ({
            ...values,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const method = event.target.dataset.method ? event.target.dataset.method : event.target.method;
        const body = event.target.querySelector('input[type="file"]') ? new FormData(event.target) : JSON.stringify(values);

        let fetchParams = {
            method: method,
            body: body,
        };

        if (method === 'GET') {
            fetchParams = {
                method: method,
            };
        } else {
            fetchParams.headers = {
                'Content-type': 'application/json',
            };
        }

        fetch(submitAction, fetchParams)
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

    return { values, isLoading, notificationRef, handleInputChange, handleSubmit };
}
