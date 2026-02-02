import React from "react";
import { } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { X } from "lucide-react";
import "./LoginModal.css";
import DwellLogo from "./DwellLogo.tsx";
import { GoogleLogin } from '@react-oauth/google';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      try {
        await login(credentialResponse.credential);
        onClose();
      } catch (e) {
        console.error("Login failed", e);
        // Handle error visually
      }
    }
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

        <div className="login-options" style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
            theme="filled_blue"
            shape="pill"
            width="300"
          />
        </div>

        <p className="login-footer">
          By continuing, you agree to Dwell's <br />
          <strong>Fee-Cap Guarantee & Professional Terms</strong>
        </p>
      </div>
    </div>
  );
};
