import { ShieldAlert, CheckCircle2, XCircle, Clock, Video } from 'lucide-react';
import './AdminDashboard.css';

const MOCK_QUEUE = [
    { id: '1', user: 'Harsha Malla', property: 'Plot 42, Gachibowli', type: 'Plot', status: 'pending', confidence: 92, submitted: '2 hours ago' },
    { id: '2', user: 'Sowmya Sree', property: 'Flat 202, Marina Bay', type: 'Flat', status: 'needs_review', confidence: 65, submitted: '5 hours ago' },
    { id: '3', user: 'Vijay Kumar', property: 'Villa 10, Jubilee Hills', type: 'Villa', status: 'pending', confidence: 88, submitted: '1 day ago' },
];

export const AdminDashboard = () => {
    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo">DWELL ADMIN</div>
                <nav className="admin-nav">
                    <div className="nav-item active">Verification Queue</div>
                    <div className="nav-item">Active Listings</div>
                    <div className="nav-item">User Management</div>
                    <div className="nav-item">Rulepacks</div>
                    <div className="nav-item">System Logs</div>
                </nav>
            </aside>

            <main className="admin-content">
                <header className="admin-header">
                    <div className="header-left">
                        <h2>Verification Queue</h2>
                        <p>Reviewing 3 pending cases for AP & TS</p>
                    </div>
                    <div className="header-right">
                        <div className="admin-user">Reviewer: System_Admin</div>
                    </div>
                </header>

                <div className="queue-grid">
                    {MOCK_QUEUE.map(item => (
                        <div key={item.id} className="queue-card">
                            <div className="card-top">
                                <div className={`status-pill ${item.status}`}>
                                    {item.status === 'pending' ? <Clock size={14} /> : <ShieldAlert size={14} />}
                                    {item.status.replace('_', ' ').toUpperCase()}
                                </div>
                                <div className="confidence-score">
                                    <span className="label">Confidence</span>
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
                                    <Video size={16} /> Review Live 360
                                </button>
                                <button className="btn-docs">
                                    Review Docs
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="review-workspace">
                    <div className="workspace-header">
                        <h3>Detailed Review: {MOCK_QUEUE[1].property}</h3>
                    </div>
                    <div className="workspace-grid">
                        <div className="visual-panel">
                            <div className="video-placeholder">
                                <Video size={48} color="#94a3b8" />
                                <p>Live 360° Video Player (Encrypted Stream)</p>
                                <div className="geotag-overlay">📍 17.4483° N, 78.3915° E (Verified Match)</div>
                            </div>
                        </div>
                        <div className="data-panel">
                            <div className="data-section">
                                <h4>Entity Extraction</h4>
                                <div className="data-row">
                                    <span>Owner Name (Aadhaar):</span>
                                    <span className="match">SOWMYA SREE</span>
                                </div>
                                <div className="data-row">
                                    <span>Owner Name (Deed):</span>
                                    <span className="match">SOWMYA SREE OGI...</span>
                                </div>
                                <div className="data-row">
                                    <span>Survey Number:</span>
                                    <span className="match">402/A</span>
                                </div>
                            </div>

                            <div className="decision-box">
                                <button className="btn-reject"><XCircle size={18} /> Reject</button>
                                <button className="btn-approve"><CheckCircle2 size={18} /> Approve Listing</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
