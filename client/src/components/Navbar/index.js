import { useContext } from 'react';
import { UserContext } from '../../App';
import { Button } from '../Button';

export default function Navbar() {
    const user = useContext(UserContext);

    return (
        <div className="top-bar">
            <ul className="navi-second">
                {user && (
                    <>
                        {(user.role === 'admin' || user.role === 'moderator' || user.role === 'eventmanager') && (
                            <li>
                                <Button link="/turnier-erstellen" title="Neues Turnier erstellen.">
                                    Turnier erstellen
                                </Button>
                            </li>
                        )}
                        <li>
                            <Button link="/api/user/logout" title="Von wwwe Legenden abmelden!">
                                Logout
                            </Button>
                        </li>
                        <li>
                            <a href="/dashboard" title="Jetzt zum Dashboard gelangen!">
                                <img src={`/img/users/${user.photo}`} alt={user.name} />
                            </a>
                        </li>
                    </>
                )}
                {!user && (
                    <>
                        <li>
                            <Button link="/registrieren" title="Jetzt bei wwwe Legenden registrieren!">
                                Registrieren
                            </Button>
                        </li>
                        <li>
                            <Button link="/login" title="Jetzt bei wwwe Legenden anmelden!">
                                Login
                            </Button>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}
