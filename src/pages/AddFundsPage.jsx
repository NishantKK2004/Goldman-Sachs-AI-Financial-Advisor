import React, { useState } from 'react';

const ACCOUNTS = ['Chase Checking ending 0824', 'Goldman Savings ending 4412', 'External Bank ending 7710'];

export default function AddFundsPage({ onNavigate, TopNav }) {
    const [amount, setAmount] = useState(5000);
    const [frequency, setFrequency] = useState('One-time');
    const [toast, setToast] = useState(null);

    const showToast = () => {
        setToast(`Transfer scheduled for $${Number(amount).toLocaleString('en-US')}`);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <>
            <TopNav active="Dashboard" onNavigate={onNavigate} />
            <main className="page fp-page">
                <p className="breadcrumb"><button className="crumb-link" onClick={() => onNavigate('dashboard')}>Dashboard</button> / Add Funds</p>
                <div className="fp-page-header">
                    <div>
                        <h1 className="fp-page-title">Add Funds</h1>
                        <p className="fp-page-sub">Move cash into your investment account</p>
                    </div>
                </div>

                <div className="fp-grid">
                    <section className="fp-panel">
                        <div className="fp-section-title">Transfer Details</div>
                        <div className="fp-form-grid">
                            <label className="fp-field">
                                <span>From Account</span>
                                <select>{ACCOUNTS.map(account => <option key={account}>{account}</option>)}</select>
                            </label>
                            <label className="fp-field">
                                <span>To Account</span>
                                <select><option>Taxable Brokerage</option><option>Traditional IRA</option><option>High Yield Cash</option></select>
                            </label>
                            <label className="fp-field">
                                <span>Amount</span>
                                <input type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} />
                            </label>
                            <label className="fp-field">
                                <span>Frequency</span>
                                <select value={frequency} onChange={e => setFrequency(e.target.value)}>
                                    <option>One-time</option>
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                </select>
                            </label>
                        </div>
                        <button className="fp-primary-button" onClick={showToast}>Schedule Transfer</button>
                    </section>

                    <aside className="fp-panel fp-summary">
                        <div className="fp-section-title">Transfer Summary</div>
                        <div className="fp-summary-row"><span>Estimated arrival</span><strong>1-2 business days</strong></div>
                        <div className="fp-summary-row"><span>Frequency</span><strong>{frequency}</strong></div>
                        <div className="fp-summary-row"><span>Cash after transfer</span><strong>$57,180</strong></div>
                        <button className="t-btn-outline full" onClick={() => onNavigate('auto-investing')}>Use for Auto Investing</button>
                    </aside>
                </div>
                {toast && <div className="t-toast">{toast}</div>}
            </main>
        </>
    );
}
