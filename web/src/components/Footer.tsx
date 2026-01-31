import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Twitter, Linkedin } from 'lucide-react';
import { DwellLogo } from './DwellLogo';
import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <DwellLogo className="logo-icon" />
                            <span>Dwell India</span>
                        </div>
                        <p className="footer-tagline">
                            The AI-powered ecosystem for trust-anchored Indian real estate.
                            Verified owners. Professional advisors. Zero stress.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon"><Twitter size={20} /></a>
                            <a href="#" className="social-icon"><Instagram size={20} /></a>
                            <a href="#" className="social-icon"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Ecosystem</h4>
                        <Link to="/search">Buy Property</Link>
                        <Link to="/list-property">Sell Property</Link>
                        <Link to="/builders">Partner With Us</Link>
                    </div>

                    <div className="footer-links">
                        <h4>Company</h4>
                        <a href="#">Our Story</a>
                        <a href="#">AI Safety</a>
                        <a href="#">Contact Support</a>
                    </div>

                    <div className="footer-links">
                        <h4>Safety & Legal</h4>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Fee-Cap Guarantee</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="ai-badge">
                        <Sparkles size={14} />
                        <span>Secured by Dwell AI Forensics</span>
                    </div>
                    <p>© {new Date().getFullYear()} Dwell India. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};
