import { useState, useEffect } from 'react';
import { Search as SearchIcon, MapPin, ShieldCheck, Filter, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from '../components/LoginModal';
import './Search.css';

interface Listing {
    id: string;
    title: string;
    price: string;
    location: string;
    fullLocation?: string;
    type: string;
    verified: boolean;
    image: string;
    gated?: boolean;
}

export const SearchPage = () => {
    const { isAuthenticated } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';

    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/search/conversational?q=${encodeURIComponent(initialQuery)}&authenticated=${isAuthenticated}`);
                const data = await response.json();

                // Map backend Listing model to frontend Listing interface
                const mappedListings = data.results.map((l: any) => ({
                    id: l.id,
                    title: l.property?.title || l.title || "Verified Property",
                    price: `₹${(l.price / 100000).toFixed(1)} Lakh` + (l.price >= 10000000 ? ` (${(l.price / 10000000).toFixed(2)} Cr)` : ""),
                    location: l.property?.address_line || l.address_line || "Hyderabad",
                    type: l.property?.property_type || l.property_type || "Apartment",
                    verified: l.property?.verification_status === 'verified',
                    image: l.property?.image_url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
                    gated: l.gated
                }));

                setListings(mappedListings);
            } catch (error) {
                console.error("Failed to fetch listings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [initialQuery, isAuthenticated]);

    return (
        <div className="search-page-container">
            <header className="search-header">
                <div className="container search-bar-wrapper">
                    <div className="search-mini-bar">
                        <SearchIcon size={18} />
                        <input type="text" defaultValue={initialQuery} placeholder="Search properties..." />
                    </div>
                    <button className="btn-filter">
                        <Filter size={18} />
                        <span>Filters</span>
                    </button>
                </div>
            </header>

            <main className="container search-results-layout">
                <aside className="search-filters-sidebar">
                    <div className="filter-group">
                        <h4>Property Type</h4>
                        <label><input type="checkbox" defaultChecked /> Apartments</label>
                        <label><input type="checkbox" /> Villas</label>
                        <label><input type="checkbox" /> Plots</label>
                    </div>
                    <div className="filter-group">
                        <h4>Verification</h4>
                        <label><input type="checkbox" defaultChecked /> Only Dwell Verified</label>
                    </div>
                    <div className="filter-group">
                        <h4>Price Range</h4>
                        <input type="range" min="0" max="10" />
                        <div className="range-labels">
                            <span>₹0</span>
                            <span>₹10Cr+</span>
                        </div>
                    </div>
                </aside>

                <div className="search-results-content">
                    <div className="results-header">
                        <h2>{listings.length} Properties in Hyderabad</h2>
                        <div className="sort-by">
                            <span>Sort by:</span>
                            <select>
                                <option>Most Verified</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-state">Finding trust-anchored properties...</div>
                    ) : (
                        <div className="listings-grid">
                            {listings.map((listing: Listing) => (
                                <div key={listing.id} className="listing-card" onClick={() => navigate(`/property/${listing.id}`)}>
                                    <div className="listing-image">
                                        <img src={listing.image} alt={listing.title} />
                                        {listing.verified && (
                                            <div className="verified-badge">
                                                <ShieldCheck size={14} />
                                                <span>VERIFIED</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="listing-info">
                                        <div className="listing-price">{listing.price}</div>
                                        <h3 className="listing-title">{listing.title}</h3>
                                        <div className="listing-loc">
                                            <MapPin size={14} />
                                            <span>
                                                {isAuthenticated
                                                    ? listing.location
                                                    : <span className="loc-gated" onClick={(e) => { e.stopPropagation(); setIsLoginModalOpen(true); }}>
                                                        Sign in to view full address
                                                    </span>
                                                }
                                            </span>
                                        </div>
                                        <div className="listing-footer">
                                            <span className="listing-type">{listing.type}</span>
                                            <button className="btn-view">
                                                View Details
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </div>
    );
};
