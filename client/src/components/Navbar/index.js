import { Button } from '../Button';

export default function Navbar() {
    return (
        <div className="top-bar">
            <ul className="navi-second">
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
            </ul>
        </div>
    );
}
