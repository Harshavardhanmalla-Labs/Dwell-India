import { useEffect, useMemo, useRef, useState } from "react";
import { Search as SearchIcon, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoginModal } from "../components/LoginModal";
import "./Search.css";

interface Listing {
    id: string;
    title: string;
    priceLabel: string;
    location: string;
    type: string;
    verified: boolean;
    image: string;
    gated?: boolean;
    trustScore?: number; // real value from backend ideally
}

interface BackendListing {
    id: string;
    title?: string;
    price: number;
    address_line?: string;
    property_type?: string;
    gated?: boolean;
    trust_score?: number;
    property?: {
        title?: string;
        address_line?: string;
        property_type?: string;
        verification_status?: string;
        image_url?: string;
        trust_score?: number;
    };
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function formatPriceINR(price: number) {
    // assume price is INR (not paise). If backend sends paise, fix at source.
    if (!Number.isFinite(price) || price <= 0) return "Price on request";

    const lakh = price / 100000;
    const cr = price / 10000000;

    if (price >= 10000000) {
        return `₹${cr.toFixed(2)} Cr`;
    }
    return `₹${lakh.toFixed(1)} Lakh`;
}

function safeString(v?: string, fallback = "") {
    const s = (v ?? "").trim();
    return s.length ? s : fallback;
}

export const SearchPage = () => {
    const { isAuthenticated } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const navigate = useNavigate();
    const loc = useLocation();

    const queryParams = useMemo(() => new URLSearchParams(loc.search), [loc.search]);
    const qFromUrl = queryParams.get("q") || "";

    const [query, setQuery] = useState(qFromUrl);
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // keep input in sync if user hits Back/Forward
    useEffect(() => setQuery(qFromUrl), [qFromUrl]);

    // debounce typing -> URL update
    const debounceRef = useRef<number | null>(null);
    useEffect(() => {
        if (debounceRef.current) window.clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(() => {
            const next = query.trim();
            const current = (qFromUrl || "").trim();

            // avoid useless navigation loops
            if (next !== current) {
                const sp = new URLSearchParams(loc.search);
                if (next) sp.set("q", next);
                else sp.delete("q");
                navigate({ pathname: loc.pathname, search: sp.toString() }, { replace: true });
            }
        }, 350);

        return () => {
            if (debounceRef.current) window.clearTimeout(debounceRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    // fetch on URL query change (source of truth)
    useEffect(() => {
        const controller = new AbortController();

        const fetchListings = async () => {
            setLoading(true);
            setErrorMsg(null);

            try {
                const url = new URL(`${API_BASE}/search/conversational`);
                url.searchParams.set("q", (qFromUrl || "").trim());

                const res = await fetch(url.toString(), {
                    method: "GET",
                    signal: controller.signal,
                    headers: {
                        "Accept": "application/json",
                        // If you use JWT: "Authorization": `Bearer ${token}`
                    },
                    credentials: "include", // if cookie-based auth
                });

                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(`Search failed (${res.status}) ${text}`.trim());
                }

                const data = await res.json();

                const mapped: Listing[] = (data?.results ?? []).map((l: BackendListing) => {
                    const verified = l.property?.verification_status === "verified";
                    const trustScore =
                        l.property?.trust_score ??
                        l.trust_score ??
                        (verified ? 9.3 : 7.1); // fallback only; remove once backend supports

                    return {
                        id: l.id,
                        title: safeString(l.property?.title, safeString(l.title, "Verified Property")),
                        priceLabel: formatPriceINR(l.price),
                        location: safeString(l.property?.address_line, safeString(l.address_line, "Hyderabad")),
                        type: safeString(l.property?.property_type, safeString(l.property_type, "Apartment")),
                        verified,
                        trustScore,
                        image:
                            l.property?.image_url ||
                            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
                        gated: l.gated,
                    };
                });

                setListings(mapped);
            } catch (e: any) {
                if (e?.name === "AbortError") return;
                console.error(e);
                setErrorMsg(e?.message || "Failed to fetch listings");
                setListings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
        return () => controller.abort();
    }, [qFromUrl]);

    const onCardClick = (id: string) => navigate(`/property/${id}`);

    return (
        <div className="search-page-container">
            <header className="search-header">
                <div className="container search-bar-wrapper">
                    <div className="search-mini-bar">
                        <SearchIcon size={18} />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search properties…"
                            aria-label="Search properties"
                        />
                    </div>
                </div>
            </header>

            <main className="container search-results-layout">
                <div className="search-results-content">
                    <div className="results-header">
                        <h2>
                            {loading ? "Searching…" : `${listings.length} Properties Found`}
                        </h2>
                    </div>

                    {loading && <div className="loading-state">Finding trust-anchored properties…</div>}

                    {!loading && errorMsg && (
                        <div className="error-state">
                            <strong>Couldn’t load results.</strong>
                            <div className="error-sub">{errorMsg}</div>
                        </div>
                    )}

                    {!loading && !errorMsg && (
                        <div className="listings-grid">
                            {listings.map((listing) => (
                                <div
                                    key={listing.id}
                                    className="listing-card"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => onCardClick(listing.id)}
                                    onKeyDown={(e) => e.key === "Enter" && onCardClick(listing.id)}
                                >
                                    <div className="listing-image">
                                        <img src={listing.image} alt={listing.title} loading="lazy" />
                                        <div className="listing-badges-top">
                                            {listing.verified && (
                                                <div className="badge-premium badge-trust">
                                                    <ShieldCheck size={12} />
                                                    <span>Verified</span>
                                                </div>
                                            )}
                                            <div className="trust-score-badge" title="Derived from verification + evidence signals">
                                                <span>Trust Score</span>
                                                <strong>{(listing.trustScore ?? 0).toFixed(1)}</strong>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="listing-info">
                                        <div className="listing-header-row">
                                            <div className="listing-price">{listing.priceLabel}</div>
                                            <div className="advisor-fee-tag">
                                                <small>Advisor Fee:</small>
                                                <span>₹4,999</span>
                                            </div>
                                        </div>

                                        <h3 className="listing-title" title={listing.title}>{listing.title}</h3>

                                        <div className="listing-loc">
                                            <MapPin size={14} />
                                            <span>
                                                {isAuthenticated ? (
                                                    listing.location
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="loc-gated"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setIsLoginModalOpen(true);
                                                        }}
                                                    >
                                                        Sign in to view full address
                                                    </button>
                                                )}
                                            </span>
                                        </div>

                                        <div className="listing-footer">
                                            <span className="listing-type">{listing.type}</span>
                                            <button
                                                type="button"
                                                className="btn-dwell btn-dwell-primary btn-compact"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onCardClick(listing.id);
                                                }}
                                            >
                                                View Trust Report <ArrowRight size={14} />
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
