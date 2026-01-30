import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Home } from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <div className="brand-logo">
                        <Home size={20} strokeWidth={2.5} />
                    </div>
                    <span className="brand-text">Dwell</span>
                </Link>

                <div className="navbar-links">
                    <Link to="/search" className="nav-link">Search</Link>
                    <Link to="/builder" className="nav-link">For Builders</Link>
                    <Link to="/admin" className="nav-link">Admin</Link>
                </div>

                <div className="navbar-actions">
                    {isAuthenticated ? (
                        <div className="user-menu">
                            <button
                                className="user-button"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <User size={18} />
                                <span>{user?.full_name?.split(' ')[0] || 'User'}</span>
                            </button>
                            {showProfileMenu && (
                                <div className="profile-dropdown">
                                    <div className="profile-info">
                                        <div className="profile-name">{user?.full_name}</div>
                                        <div className="profile-email">{user?.email}</div>
                                    </div>
                                    <button className="logout-btn" onClick={logout}>
                                        <LogOut size={16} />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/" className="btn-signin">
                            Log In
                        </Link>
                    )}
                    <Link to="/" className="btn-get-started">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};
