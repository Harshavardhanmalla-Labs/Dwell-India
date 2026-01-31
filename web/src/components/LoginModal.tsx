import React from "react";
import { } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { X, Mail, ShieldCheck } from "lucide-react";
import "./LoginModal.css";
import DwellLogo from "./DwellLogo.tsx";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleLogin = (role: 'user' | 'builder' | 'admin') => {
    login({
      name: role === 'admin' ? "Admin User" : role === 'builder' ? "Premium Builder" : "Dwell User",
      email: `${role}@dwellindia.io`,
      role
    });
    onClose();
  };

  return (
    <div className="login-overlay">
      <div className="login-modal">
        <button className="btn-close-modal" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="login-header">
          <div className="dwell-logo-small">
            <DwellLogo className="logo-icon" />
          </div>
          <h2>Access the Ecosystem</h2>
          <p>Trust-anchored transparency for every stakeholder.</p>
        </div>

        <div className="login-options">
          <button className="btn-login-option user" onClick={() => handleLogin('user')}>
            <Mail size={18} />
            <div className="option-text">
              <span>Continue as Buyer/Owner</span>
              <small>Verified listings & secure transactions</small>
            </div>
          </button>

          <button className="btn-login-option builder" onClick={() => handleLogin('builder')}>
            <ShieldCheck size={18} />
            <div className="option-text">
              <span>Professional Portal Access</span>
              <small>Builders & Transaction Advisors</small>
            </div>
          </button>
        </div>

        <p className="login-footer">
          By continuing, you agree to Dwell's <br />
          <strong>Fee-Cap Guarantee & Professional Terms</strong>
        </p>
      </div>
    </div>
  );
};
