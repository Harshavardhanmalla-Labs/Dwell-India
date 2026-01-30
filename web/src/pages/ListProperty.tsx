import { ShieldCheck, FileText, Camera, CheckCircle } from 'lucide-react';
import './ListProperty.css';

export const ListProperty = () => {
    return (
        <div className="list-property-container">
            <header className="list-header">
                <div className="container">
                    <h1>List Your Property</h1>
                    <p>Start your 3-step verification to reach thousands of serious buyers.</p>
                </div>
            </header>

            <main className="container">
                <div className="verification-steps">
                    {/* Step 1: KYC */}
                    <div className="verify-card">
                        <div className="step-badge">Step 1</div>
                        <div className="verify-icon">
                            <ShieldCheck size={32} />
                        </div>
                        <h3>Identity Verification</h3>
                        <p>Upload Aadhaar & PAN. We use this only to verify ownership. Your documents are <strong>never</strong> shared with buyers.</p>
                        <div className="privacy-badge">🔒 Privacy Protected</div>
                    </div>

                    {/* Step 2: Documents */}
                    <div className="verify-card">
                        <div className="step-badge">Step 2</div>
                        <div className="verify-icon">
                            <FileText size={32} />
                        </div>
                        <h3>Ownership Proof</h3>
                        <p>Upload your Sale Deed or Title documents. These are processed by our internal engine and kept hidden from the public.</p>
                        <div className="privacy-badge">🛡️ Internal Use Only</div>
                    </div>

                    {/* Step 3: Live 360 */}
                    <div className="verify-card current">
                        <div className="step-badge">Step 3</div>
                        <div className="verify-icon">
                            <Camera size={32} />
                        </div>
                        <h3>Live 360° Tour</h3>
                        <p>Use the Dwell Mobile App to record a live 360 tour. <strong>Gallery uploads are disabled</strong> to ensure the listing is real and current.</p>
                        <div className="mobile-app-link">Download App for Step 3 →</div>
                    </div>
                </div>

                <div className="legal-trust-banner">
                    <CheckCircle size={20} color="#22c55e" />
                    <p>Dwell India acts as a "Trust Proxy". Buyers see your verified status, not your sensitive papers.</p>
                </div>

                <div className="action-area">
                    <button className="btn btn-primary btn-lg">Start Verification Flow</button>
                </div>
            </main>
        </div>
    );
};
