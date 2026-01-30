import { LayoutGrid, Building2, Users, PieChart, Plus, MoreVertical } from 'lucide-react';
import './BuilderDashboard.css';

const PROJECTS = [
    { name: 'Skyline Heights', units: 120, sold: 45, status: 'Under Construction', completion: '70%', rera: 'TS/RERA/2023/102' },
    { name: 'Green Meadows', units: 80, sold: 78, status: 'Ready to Move', completion: '100%', rera: 'TS/RERA/2022/451' },
];

export const BuilderDashboard = () => {
    return (
        <div className="builder-container">
            <aside className="builder-sidebar">
                <div className="builder-logo">DWELL BUILDER</div>
                <nav className="builder-nav">
                    <div className="nav-item active"><LayoutGrid size={18} /> Projects</div>
                    <div className="nav-item"><Building2 size={18} /> Inventory</div>
                    <div className="nav-item"><Users size={18} /> Leads & Site Visits</div>
                    <div className="nav-item"><PieChart size={18} /> Analytics</div>
                </nav>
                <div className="sidebar-footer">
                    <div className="builder-plan">Pro Plan</div>
                </div>
            </aside>

            <main className="builder-content">
                <header className="builder-header">
                    <div>
                        <h1>Projects Overview</h1>
                        <p>Manage your real estate portfolio across AP & TS</p>
                    </div>
                    <button className="btn-add-project">
                        <Plus size={20} /> Add New Project
                    </button>
                </header>

                <div className="metrics-grid">
                    <div className="metric-card">
                        <span className="metric-label">Total Units</span>
                        <span className="metric-value">200</span>
                    </div>
                    <div className="metric-card">
                        <span className="metric-label">Total Sales</span>
                        <span className="metric-value">123</span>
                        <span className="metric-trend up">+12% this month</span>
                    </div>
                    <div className="metric-card">
                        <span className="metric-label">Active Inquiries</span>
                        <span className="metric-value">45</span>
                    </div>
                </div>

                <div className="project-grid">
                    {PROJECTS.map((project, idx) => (
                        <div key={idx} className="project-card">
                            <div className="project-header">
                                <div className="project-icon"><Building2 size={24} color="#2563eb" /></div>
                                <div className="project-meta">
                                    <div className="rera-badge">RERA: {project.rera}</div>
                                    <h3>{project.name}</h3>
                                </div>
                                <button className="btn-more"><MoreVertical size={18} /></button>
                            </div>

                            <div className="project-status-bar">
                                <div className="status-label">
                                    <span>Construction Progress</span>
                                    <span>{project.completion}</span>
                                </div>
                                <div className="progress-bg">
                                    <div className="progress-fill" style={{ width: project.completion }}></div>
                                </div>
                            </div>

                            <div className="project-stats">
                                <div className="stat-item">
                                    <span className="stat-val">{project.units}</span>
                                    <span className="stat-lab">Total Units</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-val">{project.sold}</span>
                                    <span className="stat-lab">Units Sold</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-val">{project.units - project.sold}</span>
                                    <span className="stat-lab">Available</span>
                                </div>
                            </div>

                            <div className="project-actions">
                                <button className="btn-secondary">View Inventory</button>
                                <button className="btn-primary">Marketing Dashboard</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
