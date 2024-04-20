import { useContext } from 'react';
import { NotificationContext } from '../../NotificationContext';
import NotificationContainer from '../Notification';
import useForm from '../../hooks/useForm';

export default function App() {
    const { notification, setNotification } = useContext(NotificationContext);

    const initialValues = {
        username: "",
        password: "",
        passwordConfirm: "",
        email: ""
    };
    const { isLoading, handleInputChange, handleSubmit } = useForm(initialValues, '/api/user/signup', setNotification);

    return (
        <div>
            <NotificationContainer />
            <form onSubmit={handleSubmit} data-method="POST">
                <input type="text" placeholder="Username" name="username" autocomplete='nickname' required onChange={handleInputChange} />
                <input type="password" placeholder="Passwort" name="password" required minLength={8} onChange={handleInputChange} />
                <input type="password" placeholder="Passwort bestätigen" name="passwordConfirm" required onChange={handleInputChange} />
                <input type="email" placeholder="Email" name="email" autocomplete='email' required onChange={handleInputChange} />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Lädt...' : 'Registrieren'}
                </button>
            </form>
        </div>
    );
}
