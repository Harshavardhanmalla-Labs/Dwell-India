import { Layout, Globe, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Builders.css';

export const BuildersPage = () => {
    return (
        <div className="builders-container">
            <section className="builders-hero">
                <div className="hero-content">
                    <div className="badge">DWELL FOR BUILDERS</div>
                    <h1>Digital Transformation for <br /><span className="gradient-text">Modern Developers</span></h1>
                    <p className="subtitle">
                        We don't just list properties. We bridge the trust gap with AI-powered due diligence and fully managed digital sales offices.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary">Become a Dwell Partner</button>
                        <button className="btn-secondary">View Case Studies</button>
                    </div>
                </div>
            </section>

            <section className="value-props">
                <div className="section-header">
                    <h2>Ecosystem Advantages</h2>
                    <p>Why India's top builders choose Dwell over generic portals.</p>
                </div>

                <div className="props-grid">
                    <div className="prop-card">
                        <div className="icon-box purple">
                            <Cpu size={24} />
                        </div>
                        <h3>AI Paper Dredging</h3>
                        <p>Our AI engines automatically verify title deeds, RERA filings, and mutation records, reducing legal vetting time by 80%.</p>
                        <ul className="prop-features">
                            <li><CheckCircle2 size={14} /> Automated Title Search</li>
                            <li><CheckCircle2 size={14} /> RERA Compliance Scrutiny</li>
                        </ul>
                    </div>

                    <div className="prop-card">
                        <div className="icon-box blue">
                            <Layout size={24} />
                        </div>
                        <h3>Managed Digital Twin</h3>
                        <p>Too many properties? No time? We create and manage a standalone customizable website for every project you launch.</p>
                        <ul className="prop-features">
                            <li><CheckCircle2 size={14} /> Custom White-Label Portal</li>
                            <li><CheckCircle2 size={14} /> 24/7 Virtual Sales Office</li>
                        </ul>
                    </div>

                    <div className="prop-card">
                        <div className="icon-box green">
                            <Globe size={24} />
                        </div>
                        <h3>Cross-Border Trust</h3>
                        <p>Leverage the Dwell US (isdwell.com) bridge. Get your Indian projects in front of Global NRIs with pre-vetted legal clarity.</p>
                        <ul className="prop-features">
                            <li><CheckCircle2 size={14} /> Global NRI Reach</li>
                            <li><CheckCircle2 size={14} /> Standardized Legal Bridge</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="cta-banner">
                <div className="banner-inner">
                    <h2>Ready to reduce your cost per acquisition?</h2>
                    <p>Join the 40+ builders currently utilizing Dwell OS to manage their sales pipeline.</p>
                    <button className="btn-banner">Schedule a Demo <ArrowRight size={18} /></button>
                </div>
            </section>
        </div>
    );
};
