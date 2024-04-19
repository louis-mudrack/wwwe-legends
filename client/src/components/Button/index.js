export function Button({ children, link, title }) {
    return (
        <a className="btn" href={link} title={title}>
            {children}
        </a>
    );
}
