import React, { useState } from 'react';

const REBALANCE_ROWS = [
    ['US Stocks', 42, 38, 'Sell $28,400'],
    ['International Stocks', 13, 18, 'Buy $35,500'],
    ['Bonds', 21, 24, 'Buy $21,300'],
    ['Cash', 9, 5, 'Move $28,100'],
    ['Alternatives', 15, 15, 'No change'],
];

export default function RebalancePage({ onNavigate, TopNav }) {
    const [mode, setMode] = useState('Model Portfolio');
    const [toast, setToast] = useState(null);

    const preview = () => {
        setToast('Rebalance preview generated');
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <>
            <TopNav active="Investments" onNavigate={onNavigate} />
            <main className="page fp-page">
                <p className="breadcrumb"><button className="crumb-link" onClick={() => onNavigate('investments')}>Investments</button> / Rebalance</p>
                <div className="fp-page-header">
                    <div>
                        <h1 className="fp-page-title">Rebalance Portfolio</h1>
                        <p className="fp-page-sub">Review target allocation changes before placing trades</p>
                    </div>
                    <button className="gp-primary-button" onClick={preview}>Preview Orders</button>
                </div>

                <div className="fp-grid wide">
                    <section className="fp-panel">
                        <div className="fp-section-header">
                            <div>
                                <div className="fp-section-title">Allocation Plan</div>
                                <div className="fp-section-sub">Current allocation compared with {mode}</div>
                            </div>
                            <select className="fp-compact-select" value={mode} onChange={e => setMode(e.target.value)}>
                                <option>Model Portfolio</option>
                                <option>Lower Risk</option>
                                <option>Growth Tilt</option>
                            </select>
                        </div>
                        <div className="fp-table-wrap">
                            <table className="fp-table">
                                <thead>
                                    <tr><th>Asset Class</th><th>Current</th><th>Target</th><th>Action</th></tr>
                                </thead>
                                <tbody>
                                    {REBALANCE_ROWS.map(([asset, current, target, action]) => (
                                        <tr key={asset}>
                                            <td>{asset}</td>
                                            <td>{current}%</td>
                                            <td>{target}%</td>
                                            <td>{action}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <aside className="fp-panel fp-summary">
                        <div className="fp-section-title">Estimated Impact</div>
                        <div className="fp-summary-row"><span>Trades needed</span><strong>7</strong></div>
                        <div className="fp-summary-row"><span>Estimated taxes</span><strong>$420</strong></div>
                        <div className="fp-summary-row"><span>Risk change</span><strong>Moderate to balanced</strong></div>
                        <button className="fp-primary-button full" onClick={() => onNavigate('trading')}>Go to Trading</button>
                    </aside>
                </div>
                {toast && <div className="t-toast">{toast}</div>}
            </main>
        </>
    );
}
