import { useState } from 'react';
import { Search, Sparkles, UserCheck, Cpu, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate('/search');
        }
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg"></div>
                <div className="hero-content">
                    <div className="hero-tag">
                        <Sparkles size={16} color="#fbbf24" />
                        <span>AI-POWERED REAL ESTATE ECOSYSTEM</span>
                    </div>

                    <h1 className="hero-title">
                        Buy & Sell With <br />
                        <span className="text-gradient">Legal Certainty.</span>
                    </h1>

                    <p className="hero-subtitle">
                        India's first platform where AI audits every deed, verifies owners via Aadhaar, and locks prices with fixed-fee partners.
                    </p>

                    <div className="search-container">
                        <div className="semantic-search-group">
                            <input
                                type="text"
                                className="search-input-semantic"
                                placeholder="Search like you talk: 'Flat with verified title in Pune'..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button className="search-btn" onClick={handleSearch}>
                                <Search size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Core Section */}
            <section className="section-padding container">
                <div className="section-header-center">
                    <h2 className="text-display-md">The <span className="text-gradient">Dwell AI</span> Core</h2>
                    <p>We do the heavy lifting so you don't get cheated.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card glass-card">
                        <div className="feature-icon">
                            <Cpu size={32} />
                        </div>
                        <h3 className="feature-title">AI Deed Audit</h3>
                        <p className="feature-text">
                            Our AI scans 30 years of history to find hidden legal risks. You get a simple <strong>Trust Report</strong> before you pay a Rupee.
                        </p>
                    </div>

                    <div className="feature-card glass-card">
                        <div className="feature-icon">
                            <UserCheck size={32} />
                        </div>
                        <h3 className="feature-title">Human Shield</h3>
                        <p className="feature-text">
                            Every owner is verified via Aadhaar & LinkedIn. Every property is visited by a Dwell Partner. <strong>Fake agents are blocked.</strong>
                        </p>
                    </div>

                    <div className="feature-card glass-card">
                        <div className="feature-icon">
                            <Globe size={32} />
                        </div>
                        <h3 className="feature-title">Global NRI Bridge</h3>
                        <p className="feature-text">
                            Buying from abroad? We handle the physical site visits and remote registrations with full legal compliance.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works - Unified Flow */}
            <section className="section-padding container" style={{ background: 'hsla(var(--color-primary), 0.03)', borderRadius: '2rem' }}>
                <div className="section-header-center">
                    <h2 className="text-display-md">How Dwell Works</h2>
                </div>
                <div className="workflow-steps">
                    <div className="step-item">
                        <div className="step-num">01</div>
                        <h4>AI Verification</h4>
                        <p>Deeds & ID are audited by Dwell AI engines in seconds.</p>
                    </div>
                    <div className="step-item">
                        <div className="step-num">02</div>
                        <h4>Live Tour</h4>
                        <p>Watch a live video tour from the property site to confirm facts.</p>
                    </div>
                    <div className="step-item">
                        <div className="step-num">03</div>
                        <h4>Safe Payout</h4>
                        <p>Funds are held in Escrow until legal is 100% green.</p>
                    </div>
                </div>
            </section>

            {/* Rebranded Broker Section */}
            <section className="advisor-section section-padding">
                <div className="container map-layout">
                    <div className="map-info">
                        <div className="badge-premium badge-advisor">
                            <UserCheck size={14} />
                            <span>Professional Partner</span>
                        </div>
                        <h2>Your <span className="text-gradient">Personal Guide</span></h2>
                        <p>
                            Don't deal with aggressive brokers. Hire a <strong>Dwell Certified Partner</strong> for a fixed fee to handle site visits and paperwork.
                        </p>
                        <div className="fee-lock-card">
                            <div className="fee-header">
                                <span>FIXED PARTNER FEE</span>
                                <strong>₹4,999</strong>
                            </div>
                            <p>No commissions. No percentages. Just professional service.</p>
                        </div>
                    </div>
                    <div className="map-visual">
                        <div className="map-mock">
                            <div className="map-pin pin-1">Verified Expert</div>
                            <div className="map-pin pin-2">No Commission</div>
                            <div className="map-pin pin-3">Done for You</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
