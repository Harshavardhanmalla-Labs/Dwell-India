import { useState, useEffect } from 'react';
import { Search as SearchIcon, MapPin, ShieldCheck, Filter, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Search.css';

interface Listing {
    id: string;
    title: string;
    price: string;
    location: string;
    type: string;
    verified: boolean;
    image: string;
}

export const SearchPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';

    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated real fetch from our backend
        setTimeout(() => {
            setListings([
                {
                    id: 'L1',
                    title: 'Skyline Heights - Premium 3BHK',
                    price: '₹1.45 Cr',
                    location: 'Gachibowli, Hyderabad',
                    type: 'Apartment',
                    verified: true,
                    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'
                },
                {
                    id: 'L2',
                    title: 'Green Meadows Luxury Plot',
                    price: '₹85 Lakh',
                    location: 'Kondapur, Hyderabad',
                    type: 'Plot',
                    verified: true,
                    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80'
                },
                {
                    id: 'L3',
                    title: 'Heritage Villa - East Facing',
                    price: '₹3.2 Cr',
                    location: 'Jubilee Hills, Hyderabad',
                    type: 'Villa',
                    verified: true,
                    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80'
                }
            ]);
            setLoading(false);
        }, 800);
    }, [initialQuery]);

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
                            {listings.map(listing => (
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
                                            <span>{listing.location}</span>
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
        </div>
    );
};
