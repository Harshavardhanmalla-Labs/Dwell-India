import { useEffect, useMemo, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginModal } from "../components/LoginModal";
import { PropertyCard } from "../components/PropertyCard";
import { formatPriceINR, safeString } from "../utils/format";
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
    trustScore: number;
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


export const SearchPage = () => {
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
                                <PropertyCard
                                    key={listing.id}
                                    {...listing}
                                    onCardClick={onCardClick}
                                    onLoginReq={() => setIsLoginModalOpen(true)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </div>
    );
};
