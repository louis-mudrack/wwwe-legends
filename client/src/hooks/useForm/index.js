import { useState, useContext } from 'react';
import { NotificationContext } from '../../NotificationContext';

export default function useForm(initialValues, submitAction, selectedFile) {
    const [isLoading, setIsLoading] = useState(false);
    const { setNotification } = useContext(NotificationContext); 
    const [values, setValues] = useState(initialValues);

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
        const isFileUpload = event.target.querySelector('input[type="file"]');
        let body;

        if (isFileUpload) {
            body = new FormData(event.target);
            if (selectedFile) {
                body.append('photo', selectedFile);
            }
        } else {
            body = JSON.stringify(values);
        }

        let fetchParams = {
            method: method,
            body: body,
        };

        if (!isFileUpload) {
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
                setNotification({
                    headline: 'Error:',
                    body: 'Etwas ist schief gelaufen!',
                    timeout: 3000,
                });
                setIsLoading(false);
            });
    };

    const handleResponse = (body) => {
        switch (body.status) {
            case 'fail':
                setNotification({
                    headline: 'Fehlgeschlagen:',
                    body: body.message,
                    timeout: 3000,
                });
                break;
            case 'error':
                handleErrors(body);
                break;
            case 'warning':
                setNotification({
                    headline: 'Warnung:',
                    body: body.message,
                    timeout: 3000,
                });
                break;
            case 'success':
                handleSuccess(body);
                break;
            default:
                setNotification({
                    headline: 'Error:',
                    body: 'Etwas ist schief gelaufen!',
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
            errorMessage = body.message ? body.message : 'Etwas ist schief gelaufen und ich kanns nicht fixen :(';
        }
        setNotification({
            headline: 'Error',
            body: errorMessage,
            timeout: 3000,
        });
    };

    const handleSuccess = (body) => {
        setNotification({
            headline: 'Erfolg:',
            body: body.message,
            timeout: 3000,
        });
        if (body.redirect) {
            setTimeout(() => {
                window.location.href = body.redirect;
            }, 5000);
        }
    };

    return { values, isLoading, handleInputChange, handleSubmit };
}
