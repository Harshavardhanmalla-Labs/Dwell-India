import { useState } from 'react';
import { ShieldCheck, MapPin, Ruler, Compass, Sparkles, Phone, ArrowRight, FileCheck } from 'lucide-react';
import './PropertyProfile.css';

export const PropertyProfile = () => {
    const [viewMode, setViewMode] = useState<'original' | 'staged'>('original');
    const [activeStyle, setActiveStyle] = useState('modern');

    const images = {
        original: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        staged: {
            modern: "https://images.unsplash.com/photo-1554995207-c18c20360a59?auto=format&fit=crop&w=1200&q=80",
            minimalist: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
            industrial: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
        }
    };

    return (
        <div className="prop-profile-container">
            <main className="prop-layout container">
                {/* Visual Section */}
                <section className="prop-visuals">
                    <div className="stage-controls">
                        <button
                            className={`btn-stage ${viewMode === 'original' ? 'active' : ''}`}
                            onClick={() => setViewMode('original')}
                        >
                            Original
                        </button>
                        <button
                            className={`btn-stage ${viewMode === 'staged' ? 'active' : ''}`}
                            onClick={() => setViewMode('staged')}
                        >
                            <Sparkles size={14} />
                            AI Staged
                        </button>
                    </div>

                    <div className="main-image">
                        {viewMode === 'original' ? (
                            <img src={images.original} alt="Original Room" />
                        ) : (
                            <img src={images.staged[activeStyle as keyof typeof images.staged]} alt="Staged Room" />
                        )}

                        {viewMode === 'staged' && (
                            <div className="style-selector">
                                {['modern', 'minimalist', 'industrial'].map(style => (
                                    <button
                                        key={style}
                                        className={`style-chip ${activeStyle === style ? 'active' : ''}`}
                                        onClick={() => setActiveStyle(style)}
                                    >
                                        {style.charAt(0).toUpperCase() + style.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Info Section */}
                <section className="prop-info">
                    <div className="prop-header">
                        <div className="verify-shield">
                            <ShieldCheck size={20} />
                            <span>DWELL VERIFIED OWNER</span>
                        </div>
                        <h1>Skyline Heights - Premium 3BHK</h1>
                        <div className="prop-loc">
                            <MapPin size={18} />
                            <span>Gachibowli, Hyderabad, Telangana 500032</span>
                        </div>
                        <div className="prop-price">₹1.45 Cr</div>
                    </div>

                    <div className="prop-stats">
                        <div className="stat-card">
                            <Ruler size={24} />
                            <div>
                                <div className="stat-val">1,850</div>
                                <div className="stat-label">Sq.Ft Area</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <Compass size={24} />
                            <div>
                                <div className="stat-val">East</div>
                                <div className="stat-label">Facing</div>
                            </div>
                        </div>
                    </div>

                    <div className="prop-trust-box">
                        <h3>Dwell Trust Report</h3>
                        <div className="trust-item">
                            <FileCheck size={18} color="#22c55e" />
                            <span>Aadhaar-Linked Ownership Verified</span>
                        </div>
                        <div className="trust-item">
                            <FileCheck size={18} color="#22c55e" />
                            <span>30-Year Encumbrance Certificate Clear</span>
                        </div>
                        <div className="trust-item">
                            <Sparkles size={18} color="#3b82f6" />
                            <span>Live 360 Geofence Validated (Just Now)</span>
                        </div>
                    </div>

                    <div className="prop-actions">
                        <button className="btn-primary-action">
                            <Phone size={18} />
                            Contact Verified Owner
                        </button>
                        <button className="btn-secondary-action">
                            Make an Offer
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};
