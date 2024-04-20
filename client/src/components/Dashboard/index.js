import { useContext, useEffect } from 'react';
import { UserContext } from '../../App';
import { NotificationContext } from '../../NotificationContext';
import { useState } from 'react';
import NotificationContainer from '../Notification';
import useForm from '../../hooks/useForm';

export default function App() {
    const user = useContext(UserContext);
    const { notification, setNotification } = useContext(NotificationContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return (
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }

    return (
        <div>
            <NotificationContainer />
            <section className="card">
                <h2>Welcome,</h2>
                <p>You are logged in as "{user.name}".</p>
            </section>
            <section className="card">
                <h2>Your Profile</h2>
                <div className="profile">
                    <img src={`/img/users/${user.photo}`} alt="Profile Picture" />
                    <div>
                        <span>{user.name}</span>
                    </div>
                </div>
            </section>
            <section className="card">
                <h2>Your account settings</h2>
                <AccountSettingsForm user={user} />

                <h2>Your Profile Picture</h2>
                <UploadProfilePicture user={user} />

                <h2>Passwort ändern</h2>
                <ChangePasswordForm user={user} />
            </section>
        </div>
    );
}

function UploadProfilePicture({ user }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const { notification, setNotification } = useContext(NotificationContext);

    const handleFileChange = (event) => {
        setSelectedFile(URL.createObjectURL(event.target.files[0]));
    };

    const initialValues = {
        photo: '',
    };
    const { isLoading, handleSubmit } = useForm(
        initialValues,
        '/api/user/updateMe',
        setNotification
    );

    return (
        <form data-method="PATCH" onSubmit={handleSubmit}>
            <img src={selectedFile || `/img/users/${user.photo}`} alt="User photo" />
            <input type="file" accept="image/*" id="photo" name="photo" onChange={handleFileChange} />
            <label htmlFor="photo">Choose new photo</label>
            <button className="contrast" type="submit" aria-busy="false" disabled={isLoading}>
                {isLoading ? 'Lädt...' : 'Speichern'}
            </button>
        </form>
    );
}

function AccountSettingsForm({ user }) {
    const { notification, setNotification } = useContext(NotificationContext);

    const initialValues = {
        name: '',
        email: '',
    };
    const { isLoading, handleInputChange, handleSubmit } = useForm(
        initialValues,
        '/api/user/updateMe',
        setNotification
    );

    return (
        <form data-method="PATCH" onSubmit={handleSubmit}>
            <label htmlFor="name">Username</label>
            <input type="text" placeholder={`${user.name}`} required name="name" onChange={handleInputChange} />
            <label htmlFor="email">Email address</label>
            <input type="email" placeholder={`${user.email}`} required name="email" onChange={handleInputChange} />
            <button className="contrast" type="submit" aria-busy="false" disabled={isLoading}>
                {isLoading ? 'Lädt...' : 'Speichern'}
            </button>
        </form>
    );
}

function ChangePasswordForm({ notification, setNotification }) {
    const initialValues = {
        passwordCurrent: '',
        password: '',
        passwordConfirm: '',
    };
    const { isLoading, handleInputChange, handleSubmit } = useForm(
        initialValues,
        '/api/user/updateMyPassword'
    );

    return (
        <form data-method="PATCH" onSubmit={handleSubmit}>
            <label htmlFor="password-current">Current password</label>
            <input name="passwordCurrent" type="password" placeholder="••••••••" required minLength="8" onChange={handleInputChange} />
            <label htmlFor="password">New password</label>
            <input name="password" type="password" placeholder="••••••••" required minLength="8" onChange={handleInputChange} />
            <label htmlFor="password-confirm">Confirm password</label>
            <input name="passwordConfirm" type="password" placeholder="••••••••" required minLength="8" onChange={handleInputChange} />
            <button className="contrast" type="submit" aria-busy="false" disabled={isLoading}>
            {isLoading ? 'Lädt...' : 'Passwort ändern'}
            </button>
        </form>
    );
}
