import { useState } from 'react';
import { FileText, CheckCircle2, Shield, PhoneOutgoing, ArrowRight } from 'lucide-react';
import './DealRoom.css';

const STEPS = [
    { label: 'Offer', status: 'completed' },
    { label: 'Token Advance', status: 'current' },
    { label: 'Legal Drafting', status: 'pending' },
    { label: 'Registration', status: 'pending' },
];

export const DealRoom = () => {
    const [paymentStatus, setPaymentStatus] = useState<'IDLE' | 'PENDING' | 'COMPLETED'>('IDLE');
    const [signatureStatus, setSignatureStatus] = useState<'IDLE' | 'SENT' | 'SIGNED'>('IDLE');
    const [isCalling, setIsCalling] = useState(false);

    const handleInitiateEscrow = () => {
        setPaymentStatus('PENDING');
        setTimeout(() => setPaymentStatus('COMPLETED'), 2000); // Simulated Success
    };

    const handleInitiateSigning = () => {
        setSignatureStatus('SENT');
        setTimeout(() => setSignatureStatus('SIGNED'), 3000); // Simulated Success
    };

    const handleCall = () => {
        setIsCalling(true);
        setTimeout(() => setIsCalling(false), 5000);
    };

    return (
        <div className="deal-container">
            {/* Top Navigation / Status Header */}
            <header className="deal-header">
                <div className="container deal-header-inner">
                    <div className="deal-info">
                        <h2>3BHK Flat, My Home Abhra</h2>
                        <div className="deal-id">Transaction ID: DWL-9920-TS</div>
                    </div>
                    <div className="deal-status">
                        <div className="status-indicator">
                            <span className="pulse"></span>
                            {signatureStatus === 'SIGNED' ? 'DEAL FINALIZED' :
                                signatureStatus === 'SENT' ? 'LEGAL SIGNING IN PROGRESS' :
                                    paymentStatus === 'COMPLETED' ? 'TOKEN SECURED' : 'ACTIVE NEGOTIATION'}
                        </div>
                    </div>
                </div>
            </header>

            <main className="container deal-main">
                {/* Left Side: Timeline & Checklist */}
                <div className="deal-sidebar">
                    <div className="sidebar-card">
                        <h3>Workflow Timeline</h3>
                        <div className="timeline">
                            {STEPS.map((step, idx) => {
                                const isCompleted = step.status === 'completed' ||
                                    (step.label === 'Token Advance' && paymentStatus === 'COMPLETED') ||
                                    (step.label === 'Legal Drafting' && signatureStatus === 'SIGNED');

                                return (
                                    <div key={idx} className={`timeline-item ${step.status} ${isCompleted ? 'completed' : ''}`}>
                                        <div className="timeline-dot">
                                            {isCompleted && <CheckCircle2 size={16} />}
                                        </div>
                                        <div className="timeline-content">
                                            <div className="step-label">{step.label}</div>
                                            <div className="step-status-text">
                                                {isCompleted ? 'SUCCESS' : step.status.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="sidebar-card state-rulepack">
                        <div className="rulepack-header">
                            <Shield size={18} />
                            <span>TS State Rulepack</span>
                        </div>
                        <ul className="checklist">
                            <li className="checked">Sale Deed Verified</li>
                            <li className="checked">EC (1994-2024) Verified</li>
                            <li className={paymentStatus === 'COMPLETED' ? 'checked' : 'pending'}>
                                {paymentStatus === 'COMPLETED' ? 'Token Receipt Issued' : 'Draft Agreement to Sell'}
                            </li>
                            <li className={signatureStatus === 'SIGNED' ? 'checked' : 'pending'}>
                                {signatureStatus === 'SIGNED' ? 'Agreement Signed' : 'Digital Signing'}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Center: Secure Communication & Actions */}
                <div className="deal-center">
                    <div className="masked-comm">
                        <div className="masked-info">
                            <div className="avatar owner">O</div>
                            <div>
                                <h4>Property Owner</h4>
                                <p>{isCalling ? 'Connecting via +91 800-DWELL-01...' : 'Identity Verified by Dwell'}</p>
                            </div>
                        </div>
                        <button
                            className={`btn-masked-call ${isCalling ? 'active' : ''}`}
                            onClick={handleCall}
                        >
                            <PhoneOutgoing size={18} />
                            {isCalling ? 'Calling...' : 'Masked Connect'}
                        </button>
                    </div>

                    <div className="chat-window">
                        <div className="chat-date">Today</div>
                        <div className="chat-bubble received">
                            Hi, I have reviewed your offer. The token amount of 2 Lakhs is acceptable.
                        </div>
                        {paymentStatus === 'COMPLETED' && (
                            <div className="system-notification">
                                <Shield size={14} color="#22c55e" />
                                <span>Token of ₹2,00,000 has been secured in Dwell Escrow.</span>
                            </div>
                        )}
                        {signatureStatus === 'SENT' && (
                            <div className="system-notification warning">
                                <FileText size={14} color="#f59e0b" />
                                <span>Draft Agreement sent for Digital Signature via Leegality.</span>
                            </div>
                        )}
                        {signatureStatus === 'SIGNED' && (
                            <div className="system-notification success">
                                <CheckCircle2 size={14} color="#22c55e" />
                                <span>Agreement to Sell digitally signed by all parties.</span>
                            </div>
                        )}
                    </div>

                    <div className="chat-input-area">
                        {paymentStatus !== 'COMPLETED' ? (
                            <button className="btn-escrow-action" onClick={handleInitiateEscrow}>
                                Pay ₹2,00,000 Token to Escrow
                            </button>
                        ) : signatureStatus === 'IDLE' ? (
                            <button className="btn-legal-action" onClick={handleInitiateSigning}>
                                Initiate Legal Signing (Leegality)
                            </button>
                        ) : signatureStatus === 'SENT' ? (
                            <button className="btn-legal-action disabled" disabled>
                                Awaiting Signatures...
                            </button>
                        ) : (
                            <>
                                <input type="text" placeholder="Type a secure message..." />
                                <button className="btn-send"><ArrowRight size={20} /></button>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Side: Document Vault (Simulated) */}
                <div className="deal-assets">
                    <div className="sidebar-card">
                        <h3>Secure Documents</h3>
                        <div className="asset-list">
                            <div className={`asset-item ${paymentStatus !== 'COMPLETED' ? 'locked' : ''}`}>
                                <FileText size={20} />
                                <div>
                                    <div className="asset-name">Digital Token Receipt</div>
                                    <div className="asset-meta">
                                        {paymentStatus === 'COMPLETED' ? 'Verified by Blockchain' : 'Available after payment'}
                                    </div>
                                </div>
                            </div>
                            <div className={`asset-item ${signatureStatus !== 'SIGNED' ? 'locked' : ''}`}>
                                <FileText size={20} />
                                <div>
                                    <div className="asset-name">Signed Agreement</div>
                                    <div className="asset-meta">
                                        {signatureStatus === 'SIGNED' ? 'Legally Binding PDF' : 'Available after signing'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
