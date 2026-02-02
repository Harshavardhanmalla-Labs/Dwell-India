import { useState } from 'react';
import { FileText, CheckCircle2, Shield, PhoneOutgoing, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';
import './DealRoom.css';
import { useAuth } from '../context/AuthContext';

const STEPS = [
    { label: 'Offer', status: 'completed' },
    { label: 'Token Advance', status: 'current' },
    { label: 'Documents', status: 'pending' },
    { label: 'Settlement', status: 'pending' },
    { label: 'Registration', status: 'pending' },
];

export const DealRoom = () => {
    const { token } = useAuth();
    const [settlementStatus, setSettlementStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED'>('IDLE');
    const [paymentStatus, setPaymentStatus] = useState<'IDLE' | 'PENDING' | 'COMPLETED'>('IDLE');
    const [signatureStatus, setSignatureStatus] = useState<'IDLE' | 'SENT' | 'SIGNED'>('IDLE');
    const [draftingStatus, setDraftingStatus] = useState<'IDLE' | 'DRAFTING' | 'READY'>('IDLE');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [isCalling, setIsCalling] = useState(false);
    const [userRole] = useState<'buyer' | 'seller'>('seller'); // Mocking seller view for lead insights

    const leadInsights = {
        conversionProbability: paymentStatus === 'COMPLETED' ? 92 : 35,
        buyerIntent: paymentStatus === 'COMPLETED' ? 'CRITICAL' : 'MODERATE',
        funnelStage: paymentStatus === 'COMPLETED' ? 'Prospect' : 'Inquiry'
    };

    const handleInitiateEscrow = () => {
        setPaymentStatus('PENDING');
        setTimeout(() => setPaymentStatus('COMPLETED'), 2000);
    };

    const handleSettlementConfirm = async () => {
        if (!token) {
            alert("Please login to confirm settlement");
            return;
        }
        setSettlementStatus('PENDING');
        try {
            const response = await fetch(`${API_BASE_URL}/transactions/confirm-settlement?deal_id=mock_deal_123`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setSettlementStatus('CONFIRMED');
            }
        } catch (e) {
            console.error(e);
            setSettlementStatus('IDLE');
        }
    };

    const handleInitiateSigning = () => {
        setDraftingStatus('DRAFTING');

        // Step 1: Simulate AI drafting
        setTimeout(() => {
            setDraftingStatus('READY');
            // Step 2: Show notification that email was sent
            setTimeout(() => {
                setShowOtpModal(true); // Simulate clicking the link in the email
            }, 1000);
        }, 2500);
    };

    const verifyOtp = () => {
        if (otpValue === '449210') {
            setSignatureStatus('SENT');
            setShowOtpModal(false);
            setTimeout(() => setSignatureStatus('SIGNED'), 2000);
        } else {
            alert('Invalid OTP. Please check your simulated SMS.');
        }
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

                    {userRole === 'seller' && (
                        <div className="sidebar-card lead-insights-card">
                            <h3>Lead Conversion</h3>
                            <div className="funnel-metrics">
                                <div className="metric">
                                    <div className="metric-label">Probability</div>
                                    <div className="metric-value">{leadInsights.conversionProbability}%</div>
                                </div>
                                <div className="metric">
                                    <div className="metric-label">Stage</div>
                                    <div className="metric-value">{leadInsights.funnelStage}</div>
                                </div>
                            </div>
                            <div className="intent-bar">
                                <div
                                    className={`intent-fill ${leadInsights.buyerIntent.toLowerCase()}`}
                                    style={{ width: `${leadInsights.conversionProbability}%` }}
                                ></div>
                            </div>
                            <p className="intent-hint">
                                {leadInsights.buyerIntent === 'CRITICAL'
                                    ? 'High-intent buyer. Funds secured on-chain.'
                                    : 'Early inquiry. Awaiting commitment.'}
                            </p>
                        </div>
                    )}
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

                        {draftingStatus === 'READY' && signatureStatus === 'IDLE' && !showOtpModal && (
                            <div className="security-toast">
                                <Shield size={14} />
                                <span>Signing requests sent to buyer/seller emails. <strong>Awaiting OTP verification.</strong></span>
                            </div>
                        )}

                        {paymentStatus === 'COMPLETED' && draftingStatus === 'IDLE' && (
                            <div className="system-notification blockchain-verified">
                                <Shield size={14} color="#22c55e" />
                                <div>
                                    <span>Token of ₹2,00,000 has been secured in Dwell Escrow.</span>
                                    <div className="blockchain-hash">
                                        TX Hash: 0x7a2d...f41b <a href="#" onClick={(e) => e.preventDefault()}>Verify on Chain</a>
                                    </div>
                                </div>
                            </div>
                        )}

                        {draftingStatus === 'DRAFTING' && (
                            <div className="ai-drafting-loader">
                                <div className="ai-icon-circle pulse-ai">AI</div>
                                <div className="ai-status-messages">
                                    <p className="active-step">Extracting Sale Deed terms (SRO Volume 4492)...</p>
                                    <p className="dim-step">Matching Telangana State Registration Rules...</p>
                                    <p className="dim-step">Analyzing Encumbrance Report (1994-2024)...</p>
                                </div>
                            </div>
                        )}

                        {draftingStatus === 'READY' && signatureStatus === 'IDLE' && (
                            <div className="system-notification success">
                                <FileText size={14} color="#22c55e" />
                                <div>
                                    <span>Agreement to Sell generated by Dwell AI.</span>
                                    <div className="draft-preview-link">
                                        <a href="#" onClick={(e) => e.preventDefault()}>Preview Draft (v2.1)</a>
                                    </div>
                                </div>
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
                                <div>
                                    <span>Agreement to Sell digitally signed by all parties.</span>
                                    <div className="blockchain-hash">
                                        Certificate Hash: 0x9b3e...c21d
                                    </div>
                                </div>
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
                                {signatureStatus === 'SIGNED' && settlementStatus !== 'CONFIRMED' && (
                                    <button
                                        className="btn-escrow-action"
                                        onClick={handleSettlementConfirm}
                                        style={{ background: '#059669', marginLeft: '1rem' }}
                                    >
                                        {settlementStatus === 'PENDING' ? 'Confirming...' : 'Confirm Final Settlement'}
                                    </button>
                                )}
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

            {showOtpModal && (
                <div className="otp-overlay">
                    <div className="otp-modal">
                        <div className="leegality-header">
                            <Shield size={20} />
                            <span>Leegality Identity Verification</span>
                        </div>
                        <div className="otp-content">
                            <p>To sign the <strong>Agreement to Sell (ATS-9920)</strong>, please enter the 6-digit OTP sent to your registered mobile ending in <strong>...4492</strong></p>
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                maxLength={6}
                                value={otpValue}
                                onChange={(e) => setOtpValue(e.target.value)}
                                className="otp-input"
                            />
                            <button className="btn-verify-otp" onClick={verifyOtp}>
                                Verify & Sign Document
                            </button>
                            <p className="otp-hint">Sent via Dwell Notification Service</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
