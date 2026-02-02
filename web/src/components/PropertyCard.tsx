import React from 'react';
import { MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './PropertyCard.css';

export interface PropertyCardProps {
    id: string;
    title: string;
    priceLabel: string;
    location: string;
    type: string;
    verified: boolean;
    image: string;
    trustScore: number;
    gated?: boolean; // If true, sensitive info is hidden
    onCardClick: (id: string) => void;
    onLoginReq?: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
    id,
    title,
    priceLabel,
    location,
    type,
    verified,
    image,
    trustScore,
    onCardClick,
    onLoginReq
}) => {
    const { isAuthenticated } = useAuth();

    const handleGatedClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onLoginReq) onLoginReq();
    };

    return (
        <div
            className="property-card"
            onClick={() => onCardClick(id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onCardClick(id)}
        >
            <div className="card-image-wrapper">
                <img src={image} alt={title} className="card-image" loading="lazy" />
                <div className="card-badges-overlay">
                    {verified && (
                        <div className="badge-verified">
                            <ShieldCheck size={14} strokeWidth={2.5} />
                            <span>VERIFIED</span>
                        </div>
                    )}
                    <div className="badge-trust-score">
                        <span className="ts-label">TRUST SCORE</span>
                        <span className="ts-value">{trustScore.toFixed(1)}</span>
                    </div>
                </div>
            </div>

            <div className="card-content">
                <div className="card-header">
                    <div className="card-price">{priceLabel}</div>
                    <div className="advisor-fee">
                        <small>Advisor Fee</small>
                        <span>₹4,999</span>
                    </div>
                </div>

                <h3 className="card-title" title={title}>{title}</h3>

                <div className="card-location">
                    <MapPin size={16} />
                    {isAuthenticated ? (
                        <span>{location}</span>
                    ) : (
                        <button type="button" className="link-gated" onClick={handleGatedClick}>
                            Sign in to reveal address
                        </button>
                    )}
                </div>

                <div className="card-footer">
                    <span className="prop-type-badge">{type}</span>
                    <button className="btn-card-action">
                        View Trust Report <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
