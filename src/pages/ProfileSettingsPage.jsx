import React, { useState } from 'react';

const ACTIVITY = [
    ['Profile updated', 'Email and phone verified', 'Today'],
    ['Bank account linked', 'Goldman Savings ending 4412', 'Apr 28, 2026'],
    ['Security review completed', 'Two-factor authentication active', 'Apr 18, 2026'],
];

function ProfileField({ label, value, wide }) {
    return (
        <label className={wide ? 'ps-field wide' : 'ps-field'}>
            <span>{label}</span>
            <input value={value} readOnly />
        </label>
    );
}

export default function ProfileSettingsPage({ onNavigate, TopNav }) {
    const [paperless, setPaperless] = useState(true);
    const [marketAlerts, setMarketAlerts] = useState(true);

    return (
        <>
            <TopNav active="Profile" onNavigate={onNavigate} />
            <main className="page ps-page">
                <p className="breadcrumb"><button className="crumb-link" onClick={() => onNavigate('dashboard')}>Dashboard</button> / Profile</p>
                <div className="ps-page-header">
                    <div>
                        <h1 className="ps-page-title">Profile Settings</h1>
                        <p className="ps-page-sub">Manage identity, contact preferences, and account access</p>
                    </div>
                    <button className="gp-primary-button">Save Profile</button>
                </div>

                <div className="ps-grid">
                    <aside className="ps-panel ps-profile-card">
                        <div className="ps-avatar">ND</div>
                        <div className="ps-name">Nishant Desai</div>
                        <div className="ps-meta">Premium Client / Moderate Growth</div>
                        <button className="t-btn-outline full">Upload Photo</button>
                        <div className="ps-score">
                            <span>Profile completeness</span>
                            <strong>92%</strong>
                        </div>
                        <div className="progress-track"><div className="progress-fill" style={{ width: '92%', background: '#16a34a' }} /></div>
                    </aside>

                    <section className="ps-panel">
                        <div className="ps-section-title">Personal Information</div>
                        <div className="ps-form-grid">
                            <ProfileField label="First Name" value="Nishant" />
                            <ProfileField label="Last Name" value="Desai" />
                            <ProfileField label="Email" value="nishant.desai@example.com" />
                            <ProfileField label="Phone" value="+1 (555) 123-4567" />
                            <ProfileField label="Address" value="123 Main Street, Apt 4B" wide />
                            <ProfileField label="City" value="New York" />
                            <ProfileField label="ZIP Code" value="10001" />
                        </div>
                    </section>
                </div>

                <div className="ps-grid lower">
                    <section className="ps-panel">
                        <div className="ps-section-title">Preferences</div>
                        <button className={`ps-toggle-row${paperless ? ' on' : ''}`} onClick={() => setPaperless(!paperless)}>
                            <span>Paperless documents</span><strong>{paperless ? 'On' : 'Off'}</strong>
                        </button>
                        <button className={`ps-toggle-row${marketAlerts ? ' on' : ''}`} onClick={() => setMarketAlerts(!marketAlerts)}>
                            <span>Market alerts</span><strong>{marketAlerts ? 'On' : 'Off'}</strong>
                        </button>
                        <button className="ps-toggle-row on">
                            <span>Two-factor authentication</span><strong>On</strong>
                        </button>
                    </section>

                    <section className="ps-panel">
                        <div className="ps-section-title">Recent Profile Activity</div>
                        {ACTIVITY.map(([title, detail, date]) => (
                            <div key={title} className="ps-activity-row">
                                <div>
                                    <div className="ps-activity-title">{title}</div>
                                    <div className="ps-activity-detail">{detail}</div>
                                </div>
                                <span>{date}</span>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </>
    );
}
