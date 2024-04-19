import NotificationContainer from '../Notification';
import useForm from '../../hooks/useForm';

export default function App() {
    const initialValues = {
        verificationCode: '',
    };
    const { isLoading, notification, setNotification, handleInputChange, handleSubmit } = useForm(initialValues, '/api/user/verify');

    return (
        <div>
            <NotificationContainer notification={notification} setNotification={setNotification} />
            <form onSubmit={handleSubmit} data-method="POST">
                <input
                    type="number"
                    placeholder="Dein Verifizierungscode"
                    name="verificationCode"
                    required
                    onChange={handleInputChange}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Lädt...' : 'Verifizieren'}
                </button>
            </form>
        </div>
    );
}
