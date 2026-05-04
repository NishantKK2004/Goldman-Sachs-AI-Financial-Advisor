import React, { useState } from 'react';

const HOLDINGS = [
    { name: 'US Large Cap Equity', ticker: 'VTI', value: 382450, allocation: 34, target: 32, return: '+12.8%' },
    { name: 'International Equity', ticker: 'VXUS', value: 164200, allocation: 15, target: 18, return: '+6.1%' },
    { name: 'Investment Grade Bonds', ticker: 'BND', value: 218900, allocation: 20, target: 24, return: '+3.4%' },
    { name: 'Real Estate', ticker: 'VNQ', value: 90250, allocation: 8, target: 8, return: '+5.7%' },
    { name: 'Cash Reserve', ticker: 'CASH', value: 52180, allocation: 5, target: 5, return: '+4.6%' },
];

const IDEAS = [
    ['Quality Dividend ETF', 'Income', 'Moderate', 'Complements bond allocation'],
    ['Short Duration Treasuries', 'Capital preservation', 'Low', 'Stabilizes cash sweep yield'],
    ['International Developed Markets', 'Diversification', 'Moderate', 'Closes target allocation gap'],
];

function currency(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export default function InvestmentsPage({ onNavigate, TopNav }) {
    const [view, setView] = useState('Holdings');

    return (
        <>
            <TopNav active="Investments" onNavigate={onNavigate} />
            <main className="page ip-page">
                <div className="ip-page-header">
                    <div>
                        <h1 className="ip-page-title">Investments</h1>
                        <p className="ip-page-sub">Prototype workspace for holdings, allocation, and investment ideas</p>
                    </div>
                    <div className="ip-header-actions">
                        <button className="t-btn-outline" onClick={() => onNavigate('rebalance')}>Rebalance</button>
                        <button className="gp-primary-button" onClick={() => onNavigate('trading')}>Trade</button>
                    </div>
                </div>

                <div className="ip-stats-grid">
                    {[
                        ['Invested Assets', '$1.12M', '+8.9% YTD', 'positive'],
                        ['Income Yield', '3.8%', '$3,560 estimated monthly', ''],
                        ['Expense Ratio', '0.19%', '$2,128 estimated annual cost', ''],
                        ['Risk Level', 'Moderate', 'Aligned to profile', 'positive'],
                    ].map(([label, value, detail, tone]) => (
                        <section key={label} className="ip-stat-card">
                            <div className="ip-stat-label">{label}</div>
                            <div className={`ip-stat-value ${tone}`}>{value}</div>
                            <div className={`ip-stat-detail ${tone}`}>{detail}</div>
                        </section>
                    ))}
                </div>

                <div className="ip-tabs">
                    {['Holdings', 'Allocation', 'Ideas'].map(tab => (
                        <button key={tab} className={`ip-tab${view === tab ? ' active' : ''}`} onClick={() => setView(tab)}>{tab}</button>
                    ))}
                </div>

                {view === 'Holdings' && (
                    <section className="ip-panel">
                        <div className="ip-section-header">
                            <div>
                                <div className="ip-section-title">Core Holdings</div>
                                <div className="ip-section-sub">Current positions compared with target model</div>
                            </div>
                        </div>
                        <div className="ip-table-wrap">
                            <table className="ip-table">
                                <thead>
                                    <tr>
                                        <th>Holding</th>
                                        <th>Value</th>
                                        <th>Allocation</th>
                                        <th>Target</th>
                                        <th>Return</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {HOLDINGS.map(holding => (
                                        <tr key={holding.ticker}>
                                            <td><strong>{holding.ticker}</strong><span>{holding.name}</span></td>
                                            <td>{currency(holding.value)}</td>
                                            <td>{holding.allocation}%</td>
                                            <td>{holding.target}%</td>
                                            <td className="positive">{holding.return}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {view === 'Allocation' && (
                    <section className="ip-panel">
                        <div className="ip-section-title">Allocation Drift</div>
                        <div className="ip-allocation-list">
                            {HOLDINGS.map(holding => {
                                const drift = holding.allocation - holding.target;
                                return (
                                    <div key={holding.ticker} className="ip-alloc-row">
                                        <div className="ip-alloc-labels">
                                            <span>{holding.name}</span>
                                            <strong>{drift > 0 ? '+' : ''}{drift}% drift</strong>
                                        </div>
                                        <div className="progress-track">
                                            <div className="progress-fill" style={{ width: `${holding.allocation}%`, background: drift > 1 ? '#f59e0b' : '#3465f4' }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {view === 'Ideas' && (
                    <section className="ip-panel">
                        <div className="ip-section-title">Investment Ideas</div>
                        <div className="ip-idea-grid">
                            {IDEAS.map(([name, objective, risk, detail]) => (
                                <div key={name} className="ip-idea-card">
                                    <div className="ip-idea-title">{name}</div>
                                    <div className="ip-idea-meta">{objective} / {risk} risk</div>
                                    <p>{detail}</p>
                                    <button className="t-btn-outline full" onClick={() => onNavigate('trading')}>Research</button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
