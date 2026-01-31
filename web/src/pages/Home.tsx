import { useState } from 'react';
import { Search, ShieldCheck, FileCheck, Layers } from 'lucide-react';
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
                        <ShieldCheck size={16} className="text-green-400" color="#4ade80" />
                        <span>THE NEW STANDARD IN INDIAN PROPTECH</span>
                    </div>

                    <h1 className="hero-title">
                        The OS for<br />
                        <span className="gradient-text">Verified Living.</span>
                    </h1>

                    <p className="hero-subtitle">
                        Dwell India unifies verified owners, professional advisors, and buyers into one seamless, trust-anchored ecosystem.
                    </p>

                    <div className="search-container">
                        <div className="semantic-search-group">
                            <input
                                type="text"
                                className="search-input-semantic"
                                placeholder="Try '3BHK with good sunlight near IT hubs'..."
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

            {/* Features Section */}
            <section className="features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon" style={{ background: '#dcfce7', color: '#16a34a' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="feature-title">Verified Owners</h3>
                        <p className="feature-text">
                            Every listing is backed by Aadhaar + Ownership Document verification.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon" style={{ background: '#dbeafe', color: '#2563eb' }}>
                            <Layers size={32} />
                        </div>
                        <h3 className="feature-title">Zero Brokerage</h3>
                        <p className="feature-text">
                            Connect directly with verified owners. No hidden layers.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon" style={{ background: '#f3e8ff', color: '#9333ea' }}>
                            <FileCheck size={32} />
                        </div>
                        <h3 className="feature-title">Secure Escrow</h3>
                        <p className="feature-text">
                            Payouts released only after legal checklist clearance.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};
