import { useContext } from 'react';
import { NotificationContext } from '../../NotificationContext';
import useForm from '../../hooks/useForm';
import NotificationContainer from '../Notification';

export default function App() {
    const initialValues = {
        email: '',
        password: '',
    };
    const { notification, setNotification } = useContext(NotificationContext);
    const { isLoading, handleInputChange, handleSubmit } = useForm(initialValues, '/api/user/login', setNotification);

    return (
        <div>
            <NotificationContainer />
            <form onSubmit={handleSubmit} data-method="POST">
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    autoComplete="email"
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    name="password"
                    autoComplete="current-password"
                    required
                    minLength={8}
                    onChange={handleInputChange}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Lädt...' : 'Login'}
                </button>
                <span>
                    Passwort vergessen? Klick{' '}
                    <a href="/passwort-vergessen" title="Passwort zurücksetzen">
                        hier
                    </a>
                    !
                </span>
            </form>
        </div>
    );
}
