import { Button } from '../Button';

const pages = [
    { name: 'Startseite', path: '/', type: 'navigation' },
    { name: 'Turniere', path: '/turniere', type: 'navigation' },
    { name: 'Statistiken', path: '/statistiken', type: 'navigation' },
    { name: 'Offizielle Regeln', path: '/offizielle-regeln', type: 'navigation' },
    { name: 'Punktesystem', path: '/punktesystem', type: 'navigation' },
    { name: 'Apex Legenden 08.05.2024', path: '/apex-legenden-08-05-2024', type: 'tournaments' },
    { name: 'Apex Legenden 12.04.2024', path: '/apex-legenden-12-04-2024', type: 'tournaments' },
    { name: 'Apex Legenden 27.12.2023', path: '/apex-legenden-27-12-2023', type: 'tournaments' },
    { name: 'Discord', path: 'https://discord.gg/YhM7ffMt8D', type: 'mehr' },
    { name: 'YouTube', path: 'https://www.youtube.com/@this_is_wwwe', type: 'mehr' },
    { name: 'Instagram', path: 'https://www.instagram.com/wwwe.creative/', type: 'mehr' },
    { name: 'wwwe GmbH', path: 'https://www.wwwe.de', type: 'mehr' },
];

export default function Sidebar() {
    return (
        <nav className="">
            <NavList />
            <Button link="/apply-for-next-tournament" title="Jetzt für das nächste wwwe Legends anmelden!">
                Anmeldung
            </Button>
            <LegalLinks />
        </nav>
    );
}

export function NavList() {
    return (
        <ul className="navi-main">
            <li>
                <span>Navigation</span>
            </li>
            {pages
                .filter((page) => page.type === 'navigation')
                .map((page) => (
                    <NavItem key={page.name} page={page}>
                        <a href={page.path}>{page.name}</a>
                    </NavItem>
                ))}
            <li>
                <span>Tournaments</span>
            </li>
            {pages
                .filter((page) => page.type === 'tournaments')
                .map((page) => (
                    <NavItem key={page.name} page={page}>
                        <a href={page.path}>{page.name}</a>
                    </NavItem>
                ))}
            <li>
                <span>Mehr</span>
            </li>
            {pages
                .filter((page) => page.type === 'mehr')
                .map((page) => (
                    <NavItem key={page.name} page={page}>
                        <a href={page.path}>{page.name}</a>
                    </NavItem>
                ))}
        </ul>
    );
}

export function NavItem({ children, page }) {
    return <li className={page.name}>{children}</li>;
}

export function LegalLinks() {
    return (
        <ul className="navi-legal">
            <NavItem key="Impressum" page={[{ name: 'Impressum' }]}>
                <a href="/impressum">Impressum</a>
            </NavItem>
            <NavItem key="Datenschutz" page={[{ name: 'Datenschutz' }]}>
                <a href="/datenschutz">Datenschutz</a>
            </NavItem>
        </ul>
    );
}
