import { ShieldCheck, Camera, CheckCircle, ArrowRight, Cpu, Sparkles } from 'lucide-react';
import './ListProperty.css';

export const ListProperty = () => {
    return (
        <div className="list-property-container">
            <header className="list-header">
                <div className="container">
                    <div className="badge-premium badge-trust" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', marginBottom: '1.5rem' }}>
                        <Sparkles size={14} />
                        <span>AI Seller Suite</span>
                    </div>
                    <h1>List Effortlessly, <br /><span className="text-gradient" style={{ filter: 'brightness(1.5)' }}>Sell with Proof.</span></h1>
                    <p>Our AI audits your documents and verifies your ID so buyers can offer with confidence.</p>
                </div>
            </header>

            <main className="container section-padding">
                <div className="sell-flow-grid">
                    <div className="flow-step-card glass-card">
                        <div className="step-count">Step 01</div>
                        <div className="icon-group">
                            <ShieldCheck size={40} className="text-primary" />
                            <Cpu size={24} className="ai-overlay" />
                        </div>
                        <h3>AI Deed Audit</h3>
                        <p>Upload your Sale Deed. Our engine instantly checks <strong>RERA compliance</strong> and title history.</p>
                        <ul className="step-checklist">
                            <li><CheckCircle size={14} /> Ownership Linkage</li>
                            <li><CheckCircle size={14} /> Tax Receipt Check</li>
                        </ul>
                    </div>

                    <div className="flow-step-card glass-card">
                        <div className="step-count">Step 02</div>
                        <div className="icon-group">
                            <UserCheck size={40} className="text-primary" />
                        </div>
                        <h3>ID Trust-Link</h3>
                        <p>Securely link Aadhaar & LinkedIn. We confirm your identity as the <strong>Verified Owner</strong>.</p>
                        <ul className="step-checklist">
                            <li><CheckCircle size={14} /> Privacy Shield Active</li>
                            <li><CheckCircle size={14} /> Trusted Seller Badge</li>
                        </ul>
                    </div>

                    <div className="flow-step-card glass-card">
                        <div className="step-count">Step 03</div>
                        <div className="icon-group">
                            <Camera size={40} className="text-primary" />
                        </div>
                        <h3>Live Confirmation</h3>
                        <p>A Dwell Partner visits once to record a <strong>Geofenced 360 tour</strong>. No dated photos allowed.</p>
                        <ul className="step-checklist">
                            <li><CheckCircle size={14} /> GPS Timestamped</li>
                            <li><CheckCircle size={14} /> Real-Time Feed</li>
                        </ul>
                    </div>
                </div>

                <div className="trust-proxy-banner glass-card">
                    <div className="banner-content">
                        <div className="banner-icon">🛡️</div>
                        <div>
                            <h4>Dwell "Trust Proxy" Guarantee</h4>
                            <p>We never show your private papers to buyers. We only show them a "Verified" green signal. Your privacy is our product.</p>
                        </div>
                    </div>
                </div>

                <div className="sell-actions">
                    <button className="btn-dwell btn-dwell-primary">Start AI Audit Now <ArrowRight size={18} /></button>
                    <button className="btn-dwell btn-dwell-secondary">Request Partner Assistance</button>
                    <p className="fee-note">Fixed Partner Assistance Fee: <strong>₹4,999</strong></p>
                </div>
            </main>
        </div>
    );
};

// Helper component for icons
const UserCheck = ({ size, className }: { size: number, className?: string }) => <ShieldCheck size={size} className={className} />;
