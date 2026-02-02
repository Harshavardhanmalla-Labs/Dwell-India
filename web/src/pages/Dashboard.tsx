import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, CheckCircle2, FileText, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PropertyCard } from '../components/PropertyCard';
import './Dashboard.css';

export const Dashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Mock Active Deals
    const activeDeals = [
        {
            id: 'DWL-9920-TS',
            title: '3BHK Flat, My Home Abhra',
            status: 'Token Paid',
            lastUpdate: '2 hours ago',
            step: 2
        }
    ];

    // Mock Saved Properties
    const savedProperties = [
        {
            id: "prop-101",
            title: "Luxury Villa in Jubilee Hills",
            priceLabel: "₹8.5 Cr",
            location: "Jubilee Hills, Hyderabad",
            type: "Villa",
            verified: true,
            trustScore: 9.8,
            image: "https://images.unsplash.com/photo-1613490493576-2f5033157979?auto=format&fit=crop&w=800&q=80",
            gated: false
        },
        {
            id: "prop-102",
            title: "Premium 3BHK in Gachibowli",
            priceLabel: "₹1.8 Cr",
            location: "Gachibowli, Hyderabad",
            type: "Apartment",
            verified: true,
            trustScore: 9.2,
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
            gated: true
        }
    ];

    if (!isAuthenticated) {
        return (
            <div className="dashboard-container container">
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <h2>Please sign in to view your dashboard.</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="container">
                <header className="dashboard-header">
                    <div className="dashboard-welcome">
                        <h1>Welcome back, {user?.full_name?.split(' ')[0]}</h1>
                        <p>Track your deals, verifications, and saved homes.</p>
                    </div>
                    <div className="trust-badge-large">
                        <div className="trust-icon">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="trust-info">
                            <h4>Trust Level</h4>
                            <span>Verified Buyer</span>
                        </div>
                    </div>
                </header>

                <div className="dashboard-grid">
                    <div className="dashboard-left">
                        {/* Deals Section */}
                        <section className="dashboard-section" style={{ marginBottom: '2rem' }}>
                            <div className="section-header">
                                <h2>Active Transactions</h2>
                                <a href="#" className="btn-link">View All</a>
                            </div>
                            <div className="deal-list">
                                {activeDeals.map(deal => (
                                    <div key={deal.id} className="deal-item" onClick={() => navigate('/deal-room')}>
                                        <div className="deal-icon">
                                            <Briefcase size={20} />
                                        </div>
                                        <div className="deal-details">
                                            <h3>{deal.title}</h3>
                                            <p>{deal.id} • Updated {deal.lastUpdate}</p>
                                        </div>
                                        <div className="deal-status-badge status-active">
                                            {deal.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Saved Homes */}
                        <section className="dashboard-section">
                            <div className="section-header">
                                <h2>Saved for Later</h2>
                                <a href="#" className="btn-link">Browse More</a>
                            </div>
                            <div className="saved-list-grid">
                                {savedProperties.map(prop => (
                                    <PropertyCard
                                        key={prop.id}
                                        {...prop}
                                        onCardClick={(id) => navigate(`/property/${id}`)}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="dashboard-right">
                        {/* Profile Card */}
                        <section className="dashboard-section profile-card">
                            <div className="profile-avatar">
                                <User size={32} />
                            </div>
                            <h3 className="profile-name">{user?.full_name}</h3>
                            <p className="profile-email">{user?.email}</p>

                            <hr style={{ margin: '1.5rem 0', borderColor: '#f1f5f9' }} />

                            <div className="verification-list">
                                <div className="v-item verified">
                                    <CheckCircle2 size={16} />
                                    <span>Google Account Verified</span>
                                </div>
                                <div className="v-item verified">
                                    <CheckCircle2 size={16} />
                                    <span>Email Confirmed</span>
                                </div>
                                <div className="v-item">
                                    <FileText size={16} />
                                    <span>Aadhaar KYC (Optional)</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};
