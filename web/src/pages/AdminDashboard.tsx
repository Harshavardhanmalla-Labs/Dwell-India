import { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Clock, Video, Settings, Activity, FileText, ShieldCheck, Search, ArrowUpRight } from 'lucide-react';
import './AdminDashboard.css';

const MOCK_QUEUE = [
    { id: '1', user: 'Harsha Malla', property: 'Plot 42, Gachibowli', type: 'Plot', status: 'pending', confidence: 92, submitted: '2 hours ago' },
    { id: '2', user: 'Sowmya Sree', property: 'Flat 202, Marina Bay', type: 'Flat', status: 'needs_review', confidence: 65, submitted: '5 hours ago' },
    { id: '3', user: 'Vijay Kumar', property: 'Villa 10, Jubilee Hills', type: 'Villa', status: 'pending', confidence: 88, submitted: '1 day ago' },
];

const RULEPACKS = [
    { state: 'Telangana', rules: 18, status: 'Active', lastUpdate: 'Jan 28' },
    { state: 'Andhra Pradesh', rules: 14, status: 'Active', lastUpdate: 'Jan 25' },
    { state: 'Tamil Nadu', rules: 12, status: 'Draft', lastUpdate: 'Just now' },
];

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('queue');

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo">DWELL ADMIN</div>
                <nav className="admin-nav">
                    <div className={`nav-item ${activeTab === 'queue' ? 'active' : ''}`} onClick={() => setActiveTab('queue')}>
                        <Clock size={18} /> Verification Queue
                    </div>
                    <div className={`nav-item ${activeTab === 'rulepacks' ? 'active' : ''}`} onClick={() => setActiveTab('rulepacks')}>
                        <Settings size={18} /> Rulepacks (State Logic)
                    </div>
                    <div className={`nav-item ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
                        <Activity size={18} /> System Audit Logs
                    </div>
                    <div className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                        <FileText size={18} /> User Moderation
                    </div>
                </nav>

                <div className="sidebar-status">
                    <div className="status-indicator online"></div>
                    <span>Trust Node: Hyderabad-01</span>
                </div>
            </aside>

            <main className="admin-content">
                <header className="admin-header">
                    <div className="header-left">
                        <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('_', ' ')}</h2>
                        <p>Core platform oversight and trust enforcement</p>
                    </div>
                    <div className="header-right">
                        <div className="search-box">
                            <Search size={16} />
                            <input type="text" placeholder="Search entries..." />
                        </div>
                    </div>
                </header>

                <div className="admin-stats-bar">
                    <div className="mini-stat">
                        <span className="label">Throughput</span>
                        <span className="val">98.2%</span>
                    </div>
                    <div className="mini-stat">
                        <span className="label">Avg Review</span>
                        <span className="val">14m</span>
                    </div>
                    <div className="mini-stat">
                        <span className="label">False Positives</span>
                        <span className="val">0.04%</span>
                    </div>
                </div>

                {activeTab === 'queue' && (
                    <>
                        <div className="queue-grid">
                            {MOCK_QUEUE.map(item => (
                                <div key={item.id} className="queue-card">
                                    <div className="card-top">
                                        <div className={`status-pill ${item.status}`}>
                                            {item.status === 'pending' ? <Clock size={14} /> : <ShieldAlert size={14} />}
                                            {item.status.replace('_', ' ').toUpperCase()}
                                        </div>
                                        <div className="confidence-score">
                                            <span className="label">AI Confidence</span>
                                            <span className={`value ${item.confidence > 80 ? 'high' : 'low'}`}>{item.confidence}%</span>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <h3>{item.property}</h3>
                                        <p className="user-info">Owned by: <strong>{item.user}</strong></p>
                                        <div className="meta">
                                            <span>{item.type}</span> • <span>{item.submitted}</span>
                                        </div>
                                    </div>

                                    <div className="card-actions">
                                        <button className="btn-review">
                                            <Video size={16} /> Live 360 Scan
                                        </button>
                                        <button className="btn-docs">
                                            Aadhaar/Deed Match
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="review-workspace">
                            <div className="workspace-header">
                                <h3>In-Depth Review: {MOCK_QUEUE[1].property}</h3>
                                <div className="badge-verified"><ShieldCheck size={14} /> AI Pre-Match High</div>
                            </div>
                            <div className="workspace-grid">
                                <div className="visual-panel">
                                    <div className="video-placeholder">
                                        <div className="scan-line"></div>
                                        <Video size={48} color="#334155" />
                                        <p>Secure Video Stream (Encrypted)</p>
                                        <div className="geotag-overlay">📍 17.4483° N, 78.3915° E (Match)</div>
                                    </div>
                                </div>
                                <div className="data-panel">
                                    <div className="data-section">
                                        <h4>Identity & Legal Extraction</h4>
                                        <div className="data-row">
                                            <span>Aadhaar Name:</span>
                                            <span className="match">SOWMYA SREE</span>
                                        </div>
                                        <div className="data-row">
                                            <span>Sale Deed Name:</span>
                                            <span className="match">SOWMYA SREE OGI...</span>
                                        </div>
                                        <div className="data-row">
                                            <span>Survey No. (TS-I):</span>
                                            <span className="match">402/A</span>
                                        </div>
                                    </div>

                                    <div className="decision-box">
                                        <button className="btn-reject"><XCircle size={18} /> Flag Fraud</button>
                                        <button className="btn-approve"><CheckCircle2 size={18} /> Approve Listing</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'rulepacks' && (
                    <div className="rulepacks-grid">
                        {RULEPACKS.map(rp => (
                            <div key={rp.state} className="rulepack-card">
                                <div className="rp-header">
                                    <h3>{rp.state}</h3>
                                    <span className={`rp-status ${rp.status.toLowerCase()}`}>{rp.status}</span>
                                </div>
                                <div className="rp-details">
                                    <div className="rp-stat">
                                        <span>Active Rules</span>
                                        <strong>{rp.rules}</strong>
                                    </div>
                                    <div className="rp-stat">
                                        <span>Updates</span>
                                        <strong>{rp.lastUpdate}</strong>
                                    </div>
                                </div>
                                <button className="btn-edit-rules">Modify Rule Logic <ArrowUpRight size={14} /></button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
