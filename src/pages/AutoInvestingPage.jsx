import React, { useState } from 'react';

const TARGETS = [
    ['US Total Market', 45],
    ['International Equity', 20],
    ['Core Bonds', 25],
    ['Real Estate', 5],
    ['Cash Buffer', 5],
];

export default function AutoInvestingPage({ onNavigate, TopNav }) {
    const [amount, setAmount] = useState(1200);
    const [cadence, setCadence] = useState('Monthly');
    const [enabled, setEnabled] = useState(true);

    return (
        <>
            <TopNav active="Investments" onNavigate={onNavigate} />
            <main className="page fp-page">
                <p className="breadcrumb"><button className="crumb-link" onClick={() => onNavigate('dashboard')}>Dashboard</button> / Auto Investing</p>
                <div className="fp-page-header">
                    <div>
                        <h1 className="fp-page-title">Auto Investing</h1>
                        <p className="fp-page-sub">Set recurring investments into your target portfolio</p>
                    </div>
                    <button className={`fp-toggle-button${enabled ? ' on' : ''}`} onClick={() => setEnabled(!enabled)}>
                        {enabled ? 'Enabled' : 'Paused'}
                    </button>
                </div>

                <div className="fp-grid">
                    <section className="fp-panel">
                        <div className="fp-section-title">Recurring Plan</div>
                        <div className="fp-form-grid">
                            <label className="fp-field">
                                <span>Investment Amount</span>
                                <input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} />
                            </label>
                            <label className="fp-field">
                                <span>Cadence</span>
                                <select value={cadence} onChange={e => setCadence(e.target.value)}>
                                    <option>Weekly</option>
                                    <option>Biweekly</option>
                                    <option>Monthly</option>
                                </select>
                            </label>
                            <label className="fp-field">
                                <span>Funding Source</span>
                                <select><option>Goldman Savings ending 4412</option><option>Chase Checking ending 0824</option></select>
                            </label>
                            <label className="fp-field">
                                <span>Start Date</span>
                                <input value="May 15, 2026" readOnly />
                            </label>
                        </div>
                        <button className="fp-primary-button">Save Auto Investment</button>
                    </section>

                    <aside className="fp-panel">
                        <div className="fp-section-title">Target Allocation</div>
                        <div className="fp-target-list">
                            {TARGETS.map(([name, pct]) => (
                                <div key={name} className="fp-target-row">
                                    <div className="fp-target-labels"><span>{name}</span><strong>{pct}%</strong></div>
                                    <div className="progress-track"><div className="progress-fill" style={{ width: `${pct}%`, background: '#3465f4' }} /></div>
                                </div>
                            ))}
                        </div>
                        <div className="fp-summary-row"><span>Next investment</span><strong>${Number(amount).toLocaleString('en-US')} / {cadence}</strong></div>
                    </aside>
                </div>
            </main>
        </>
    );
}
