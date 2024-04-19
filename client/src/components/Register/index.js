export default function App() {
    return (
        <div>
            <form method="POST" action="/api/user/signup">
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="passwordConfirm"
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                />
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}
