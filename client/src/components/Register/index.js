import NotificationContainer from '../Notification';
import useForm from '../../hooks/useForm';

export default function App() {
        const initialValues = {
            username: "",
            password: "",
            passwordConfirm: "",
            email: ""
        };
        const { isLoading, notificationRef, handleInputChange, handleSubmit } = useForm(initialValues, '/api/user/signup');

    return (
        <div>
            <NotificationContainer ref={notificationRef} />
            <form onSubmit={handleSubmit} data-method="POST">
                <input type="text" placeholder="Username" name="username" onChange={handleInputChange} />
                <input type="password" placeholder="Password" name="password" onChange={handleInputChange} />
                <input type="password" placeholder="Confirm Password" name="passwordConfirm" onChange={handleInputChange} />
                <input type="text" placeholder="Email" name="email" onChange={handleInputChange} />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Lädt...' : 'Registrieren'}
                </button>
            </form>
        </div>
    );
}
