export default function Navbar() {
    return (
        <nav>
            <ul className="navi-second">
                <li>
                    <Button link="/register" title="Jetzt bei wwwe Legenden registrieren!">
                        Registrieren
                    </Button>
                </li>
                <li>
                    <Button link="/login" title="Jetzt bei wwwe Legenden anmelden!">
                        Login
                    </Button>
                </li>
            </ul>
        </nav>
    );
}

export function Button({ children, link, title }) {
    return (
        <a className="btn" href={link} title={title}>
            {children}
        </a>
    );
}
