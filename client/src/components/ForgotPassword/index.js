import { useContext } from 'react';
import { NotificationContext } from '../../NotificationContext';
import NotificationContainer from '../Notification';
import useForm from '../../hooks/useForm';

export default function App() {
    const initialValues = {
        email: ''
    };
    const { notification, setNotification } = useContext(NotificationContext);
    const { isLoading, handleInputChange, handleSubmit } = useForm(
        initialValues,
        '/api/user/forgotPassword',
        setNotification
    );

    return (
        <div>
            <NotificationContainer />
            <form onSubmit={handleSubmit} data-method="POST">
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    autoComplete="email"
                    required
                    onChange={handleInputChange}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Lädt...' : 'Passwort zurücksetzen'}
                </button>
            </form>
        </div>
    );
}
