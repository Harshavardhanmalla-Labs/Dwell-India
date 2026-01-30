import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck, MapPin, Ruler, Compass, Sparkles, Phone, ArrowRight, FileCheck, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from '../components/LoginModal';
import './PropertyProfile.css';

export const PropertyProfile = () => {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [property, setProperty] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [viewMode, setViewMode] = useState<'original' | 'staged'>('original');
    const [activeStyle, setActiveStyle] = useState('modern');

    useEffect(() => {
        const fetchProperty = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/properties/${id}?authenticated=${isAuthenticated}`);
                const data = await response.json();
                setProperty(data);
            } catch (err) {
                console.error("Failed to fetch property details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id, isAuthenticated]);

    const images = {
        original: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        staged: {
            modern: "https://images.unsplash.com/photo-1554995207-c18c20360a59?auto=format&fit=crop&w=1200&q=80",
            minimalist: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
            industrial: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
        }
    };

    const handleAction = (callback: () => void) => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true);
        } else {
            callback();
        }
    };

    if (loading) return <div className="loading-state">Loading trust-anchored property...</div>;
    if (!property) return <div className="error-state">Property not found.</div>;

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
                        <h1>{property.title}</h1>
                        <div className="prop-loc">
                            <MapPin size={18} />
                            <span>
                                {isAuthenticated
                                    ? property.address_line || `${property.city}, ${property.state}`
                                    : property.message || `${property.city}, ${property.state} (Sign in to view full info)`
                                }
                            </span>
                        </div>
                        <div className="prop-price">₹{(property.price / 100000).toFixed(1)} Lakh</div>
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

                    {/* Professional Assistance Card */}
                    <div className="prop-assistance-card">
                        <div className="assistance-header">
                            <ShieldCheck size={18} color="#2563eb" />
                            <span>Transaction Assistance</span>
                        </div>
                        <h4>Hire a Verified Advisor</h4>
                        <p>Get a RERA-certified professional to handle site visits and legal document coordination.</p>
                        <div className="assistance-footer">
                            <div className="price-tag">
                                <span className="label">Fixed Fee:</span>
                                <span className="value">₹4,999</span>
                            </div>
                            <button className="btn-hire" onClick={() => handleAction(() => alert("Advisor request sent! Pre-negotiated fee locked in."))}>
                                Hire Advisor
                            </button>
                        </div>
                        <div className="fee-lock-badge">
                            🛑 NO BROKERAGE EXPLOITATION • FEE-LOCK GUARANTEE
                        </div>
                    </div>

                    <div className="prop-actions">
                        <button className="btn-primary-action" onClick={() => handleAction(() => alert("Connecting to owner..."))}>
                            {isAuthenticated ? <Phone size={18} /> : <Lock size={18} />}
                            {isAuthenticated ? "Contact Verified Owner" : "Sign in to Contact Owner"}
                        </button>
                        <button className="btn-secondary-action" onClick={() => handleAction(() => alert("Initiating offer..."))}>
                            Make an Offer
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </section>
            </main>

            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </div>
    );
};
