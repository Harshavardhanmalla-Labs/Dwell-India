import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, ShieldCheck } from 'lucide-react';
import './LoginModal.css';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const { login } = useAuth();

    if (!isOpen) return null;

    const handleGoogleLogin = () => {
        login({ name: 'Harsha Malla', email: 'harsha@dwellindia.io' });
        onClose();
    };

    return (
        <div className="login-overlay">
            <div className="login-modal">
                <button className="btn-close-modal" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="login-header">
                    <div className="dwell-logo-small">D</div>
                    <h2>Welcome to Dwell India</h2>
                    <p>India's first trust-anchored marketplace.</p>
                </div>

                <div className="login-benefits">
                    <div className="benefit">
                        <ShieldCheck size={18} color="#22c55e" />
                        <span>Unlock 30-Year property history</span>
                    </div>
                    <div className="benefit">
                        <Mail size={18} color="#3b82f6" />
                        <span>Contact verified owners directly</span>
                    </div>
                </div>

                <button className="btn-google-login" onClick={handleGoogleLogin}>
                    <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" width="20" />
                    Continue with Google
                </button>

                <p className="login-footer">
                    By continuing, you agree to Dwell's Privacy Policy & Terms.
                </p>
            </div>
        </div>
    );
};
