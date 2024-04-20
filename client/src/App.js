import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { NotificationProvider } from './NotificationContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Verification from './components/Verification';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import './App.css';
import NotificationContainer from './components/Notification';

export const UserContext = createContext();

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/user/me')
            .then((response) => response.json())
            .then((data) => {
                setUser(data.data.doc);
            });
    }, []);

    return (
        <NotificationProvider>
            <UserContext.Provider value={user}>
                <Router>
                    <Sidebar />
                    <Navbar />
                    <Routes>
                        <Route path="/registrieren" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/verifizierung" element={<Verification />} />
                        <Route path="/passwort-vergessen" element={<ForgotPassword />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </Router>
            </UserContext.Provider>
            {/* <NotificationContainer /> */}
        </NotificationProvider>
    );
}
