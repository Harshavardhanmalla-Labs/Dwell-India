import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, LogOut } from "lucide-react";
import "./Navbar.css";
import DwellLogo from "./DwellLogo.tsx";
import { LoginModal } from "./LoginModal";

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-logo">
            <DwellLogo className="logo-icon" />
          </div>
          <span className="brand-text">Dwell</span>
        </Link>

        <div className="navbar-links">
          <Link to="/search" className="nav-link">
            Buy
          </Link>
          <Link to="/list-property" className="nav-link">
            Sell
          </Link>
          <Link to="/builders" className="nav-link">
            Builders
          </Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin" className="nav-link highlight">
              Admin Ops
            </Link>
          )}
          {isAuthenticated && user?.role === 'builder' && (
            <Link to="/builder" className="nav-link highlight">
              Partner Portal
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="avatar-small">
                  <User size={16} />
                </div>
                <span>{user?.full_name?.split(" ")[0] || "User"}</span>
              </button>
              {showProfileMenu && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <p className="user-name">{user?.full_name}</p>
                    <p className="user-role">{user?.role?.toUpperCase()}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="logout-btn" onClick={() => { logout(); setShowProfileMenu(false); }}>
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn-signin" onClick={() => setIsLoginModalOpen(true)}>
              Log In
            </button>
          )}
          {!isAuthenticated && (
            <button className="btn-get-started" onClick={() => setIsLoginModalOpen(true)}>
              Get Started
            </button>
          )}
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </nav>
  );
};
