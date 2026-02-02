import { useState } from 'react';
import { LayoutGrid, Building2, Users, PieChart, Plus, Search, MapPin, ArrowUpRight, Phone } from 'lucide-react';
import DwellLogo from '../components/DwellLogo';
import './BuilderDashboard.css';

const PROJECTS = [
    { name: 'Skyline Heights', units: 120, sold: 84, status: 'Under Construction', completion: 70, rera: 'TS/RERA/2023/102', location: 'Gachibowli, Hyderabad' },
    { name: 'Green Meadows', units: 80, sold: 78, status: 'Ready to Move', completion: 100, rera: 'TS/RERA/2022/451', location: 'Mokila, Hyderabad' },
    { name: 'Dwell Prime One', units: 250, sold: 45, status: 'Pre-Launch', completion: 15, rera: 'TS/RERA/2024/005', location: 'Financial District' },
];

const LEADS = [
    { name: "Rahul Sharma", budget: "₹1.5 Cr - ₹2 Cr", status: "high-intent", source: "Dwell Search", date: "2 hours ago" },
    { name: "Priya Varma", budget: "₹3 Cr+", status: "site-visit-done", source: "Referral", date: "Yesterday" },
    { name: "Amit Reddy", budget: "₹80 Lakhs", status: "follow-up", source: "Direct", date: "3 days ago" }
];

export const BuilderDashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');

    return (
        <div className="builder-container">
            <aside className="builder-sidebar">
                <div className="builder-logo">
                    <DwellLogo className="logo-icon" />
                    <span className="logo-text">DWELL BUILDER</span>
                </div>
                <nav className="builder-nav">
                    <div
                        className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('projects')}
                    >
                        <LayoutGrid size={18} /> Projects
                    </div>
                    <div className="nav-item"><Building2 size={18} /> Inventory</div>
                    <div
                        className={`nav-item ${activeTab === 'leads' ? 'active' : ''}`}
                        onClick={() => setActiveTab('leads')}
                    >
                        <Users size={18} /> Leads & Site Visits
                    </div>
                    <div className="nav-item"><PieChart size={18} /> Analytics</div>
                </nav>
                <div className="sidebar-promo">
                    <div className="promo-card">
                        <h4>Go Premium</h4>
                        <p>Unlock AI demand forecasting and competitor insights.</p>
                        <button className="btn-upgrade">Upgrade Plan</button>
                    </div>
                </div>
            </aside>

            <main className="builder-content">
                <header className="builder-header">
                    <div className="header-titles">
                        <h1>{activeTab === 'projects' ? 'Project Portfolio' : 'High-Intent Leads'}</h1>
                        <p className="breadcrumb">Dashboards / {activeTab === 'projects' ? 'Overview' : 'CRM'}</p>
                    </div>
                    <div className="header-actions">
                        <div className="search-wrap">
                            <Search size={16} />
                            <input type="text" placeholder="Search anything..." />
                        </div>
                        <button className="btn-add-project">
                            <Plus size={18} /> Add Project
                        </button>
                    </div>
                </header>

                {/* Metrics Row */}
                <div className="metrics-grid">
                    <div className="premium-metric-card">
                        <div className="metric-icon blue"><Building2 size={24} /></div>
                        <div>
                            <span className="metric-label">Total Inventory Value</span>
                            <div className="metric-main">
                                <span className="metric-value">₹450 Cr</span>
                                <span className="trend-up">+12%</span>
                            </div>
                        </div>
                    </div>
                    <div className="premium-metric-card">
                        <div className="metric-icon green"><Users size={24} /></div>
                        <div>
                            <span className="metric-label">Qualified Leads</span>
                            <div className="metric-main">
                                <span className="metric-value">128</span>
                                <span className="trend-up">+24 this week</span>
                            </div>
                        </div>
                    </div>
                    <div className="premium-metric-card">
                        <div className="metric-icon purple"><PieChart size={24} /></div>
                        <div>
                            <span className="metric-label">Conversion Rate</span>
                            <div className="metric-main">
                                <span className="metric-value">4.2%</span>
                                <span className="metric-sub">Top 5% in Region</span>
                            </div>
                        </div>
                    </div>
                </div>

                {activeTab === 'projects' ? (
                    <div className="project-grid">
                        {PROJECTS.map((project, idx) => (
                            <div key={idx} className="project-card-premium">
                                <div className="card-top">
                                    <div className="project-brand">
                                        <div className="brand-dot"></div>
                                        <span className="rera">{project.rera}</span>
                                    </div>
                                    <button className="btn-text">Manage <ArrowUpRight size={16} /></button>
                                </div>
                                <h3>{project.name}</h3>
                                <div className="project-loc">
                                    <MapPin size={16} /> {project.location}
                                </div>

                                <div className="project-progress">
                                    <div className="progress-labels">
                                        <span>Completion</span>
                                        <span>{project.completion}%</span>
                                    </div>
                                    <div className="progress-bar-bg">
                                        <div className="progress-bar-fill" style={{ width: `${project.completion}%` }}></div>
                                    </div>
                                </div>

                                <div className="card-stats">
                                    <div>
                                        <div className="stat-label">Units Sold</div>
                                        <div className="stat-val highlight">{project.sold} <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>/ {project.units}</span></div>
                                    </div>
                                    <div>
                                        <div className="stat-label">Revenue</div>
                                        <div className="stat-val">₹{(project.sold * 1.2).toFixed(1)} Cr</div>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <button className="btn-sec">Inventory</button>
                                    <button className="btn-pri">Campaigns</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="leads-table">
                        <div className="table-header">
                            <div>Prospect</div>
                            <div>Budget</div>
                            <div>Status</div>
                            <div>Source</div>
                            <div>Last Active</div>
                            <div>Action</div>
                        </div>
                        {LEADS.map((lead, i) => (
                            <div key={i} className="table-row">
                                <div className="prospect-info">
                                    <div className="avatar-small">{lead.name.charAt(0)}</div>
                                    <div className="name">{lead.name}</div>
                                </div>
                                <div className="budget">{lead.budget}</div>
                                <div>
                                    <span className={`status-badge ${lead.status}`}>
                                        {lead.status.replace(/-/g, ' ').toUpperCase()}
                                    </span>
                                </div>
                                <div className="source-tag">{lead.source}</div>
                                <div className="date">{lead.date}</div>
                                <div>
                                    <button className="btn-call"><Phone size={14} /> Contact</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
