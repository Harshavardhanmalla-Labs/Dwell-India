import { ArrowRight, CheckCircle2, UserPlus, ShieldCheck, DollarSign } from 'lucide-react';
import './Builders.css';

export const BuildersPage = () => {
    return (
        <div className="builders-container">
            <section className="builders-hero">
                <div className="hero-content">
                    <div className="badge">DWELL PARTNER ECOSYSTEM</div>
                    <h1>Empowering Professionals to <br /><span className="text-gradient">Scale With Trust</span></h1>
                    <p className="subtitle">
                        Whether you are a Builder or a Certified Transaction Advisor, Dwell OS provides the infrastructure for high-trust real estate.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-dwell btn-dwell-primary">Partner With Us</button>
                        <button className="btn-dwell btn-dwell-secondary" style={{ background: 'transparent', color: 'white' }}>View Ecosystem Stats</button>
                    </div>
                </div>
            </section>

            <section className="section-padding container">
                <div className="section-header">
                    <h2>Choose Your Track</h2>
                    <p>Standardized workflows for the modern Indian market.</p>
                </div>

                <div className="props-grid">
                    {/* Builders Track */}
                    <div className="prop-card glass-card">
                        <div className="icon-box blue">
                            <ShieldCheck size={28} />
                        </div>
                        <h3>For Builders</h3>
                        <p>Accelerate your sales cycle by connecting with pre-verified NRIs and domestic buyers.</p>
                        <ul className="prop-features">
                            <li><CheckCircle2 size={16} /> Digitized RERA Compliance</li>
                            <li><CheckCircle2 size={16} /> Global MRI Reach (Dwell US Bridge)</li>
                            <li><CheckCircle2 size={16} /> Escrow-Locked Payouts</li>
                        </ul>
                    </div>

                    {/* Advisors Track */}
                    <div className="prop-card glass-card" style={{ borderColor: 'hsla(var(--color-advisor), 0.3)' }}>
                        <div className="icon-box purple">
                            <UserPlus size={28} />
                        </div>
                        <h3>For Advisors</h3>
                        <p>Transition from "broker" to "professional consultant". Scale via our centralized platform.</p>
                        <ul className="prop-features">
                            <li><CheckCircle2 size={16} /> Dedicated Advisor Dashboard</li>
                            <li><CheckCircle2 size={16} /> Pre-Negotiated Fixed Fees</li>
                            <li><CheckCircle2 size={16} /> Professional Liability Coverage</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section-padding container">
                <div className="glass-card fee-system-card">
                    <div className="fee-card-content">
                        <div className="icon-box green" style={{ width: '48px', height: '48px' }}>
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <h3>The Fair-Fee Framework</h3>
                            <p>To ensure ecosystem adoption, we've capped advisor fees at ₹4,999 - ₹14,999 based on service tier. No more opaque "commissions".</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta-banner">
                <div className="banner-inner">
                    <h2>Unicorn Ambition. Trusted Infrastructure.</h2>
                    <p>Join 40+ Top Builders and 200+ Certified Advisors currently reshaping the Indian PropTech landscape.</p>
                    <button className="btn-dwell btn-dwell-primary" style={{ background: 'white', color: '#1e3a8a', margin: '0 auto' }}>
                        Join the Ecosystem <ArrowRight size={18} />
                    </button>
                </div>
            </section>
        </div>
    );
};
