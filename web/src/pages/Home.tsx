import { useState } from 'react';
import { Search, ShieldCheck, FileCheck, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
    const [searchMode, setSearchMode] = useState<'filters' | 'semantic'>('semantic');
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
                        Dwell India unifies verified owners, professional advisors, and buyers into one seamless, trust-anchored ecosystem. No fake listings, no fee exploitation—just clean transactions.
                    </p>

                    <div className="search-tabs">
                        <button
                            className={`search-tab ${searchMode === 'semantic' ? 'active' : ''}`}
                            onClick={() => setSearchMode('semantic')}
                        >
                            <Search size={14} />
                            Semantic Search
                        </button>
                        <button
                            className={`search-tab ${searchMode === 'filters' ? 'active' : ''}`}
                            onClick={() => setSearchMode('filters')}
                        >
                            Filters
                        </button>
                    </div>

                    <div className="search-container">
                        {searchMode === 'semantic' ? (
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
                        ) : (
                            <>
                                <div className="search-input-group">
                                    <label className="search-label">Location</label>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Hyderabad, Visakhapatnam..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="search-input-group">
                                    <label className="search-label">Property Type</label>
                                    <select className="search-input" style={{ width: '100%', background: 'transparent' }}>
                                        <option>Residential Plot</option>
                                        <option>Apartment</option>
                                        <option>Villa</option>
                                    </select>
                                </div>
                                <button className="search-btn" onClick={handleSearch}>
                                    <Search size={24} />
                                </button>
                            </>
                        )}
                    </div>

                    <div className="view-toggle">
                        <button className="btn-toggle active">List View</button>
                        <button className="btn-toggle">Map Explorer</button>
                    </div>
                </div>
            </section>

            {/* Inventory Ticker */}
            <div className="ticker-bar">
                <div className="ticker-content">
                    <span>🔥 42 New Verified Plots in Vizag</span>
                    <span>✅ Gachibowli Market Price: ₹1.2L / Sq.Yd</span>
                    <span>🏗️ 3 New Builder Projects in OMR Chennai</span>
                    <span>🏠 124 Owners Verified in the last 24h</span>
                </div>
            </div>

            {/* Map Preview Teaser */}
            <section className="map-teaser">
                <div className="container map-layout">
                    <div className="map-info">
                        <h2>Hyper-Local Precision</h2>
                        <p>Browse properties by exact layout coordinates. Our map uses Geofenced verification—if it's on Dwell, the owner was physically there.</p>
                        <button className="btn btn-primary">Open Interactive Map</button>
                    </div>
                    <div className="map-visual">
                        <div className="map-mock">
                            <div className="map-pin pin-1">₹1.2Cr</div>
                            <div className="map-pin pin-2">₹85L</div>
                            <div className="map-pin pin-3">₹2.4Cr</div>
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
                            Every listing is backed by Aadhaar + Ownership Document verification. We reject unverified posts instantly.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon" style={{ background: '#dbeafe', color: '#2563eb' }}>
                            <Layers size={32} />
                        </div>
                        <h3 className="feature-title">Direct Connect</h3>
                        <p className="feature-text">
                            Connect directly with the property owner. No hidden broker layers misrepresenting themselves.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon" style={{ background: '#f3e8ff', color: '#9333ea' }}>
                            <FileCheck size={32} />
                        </div>
                        <h3 className="feature-title">Transaction OS</h3>
                        <p className="feature-text">
                            From token advance to registration, we handle the legal drafting and state-specific checklists.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};
