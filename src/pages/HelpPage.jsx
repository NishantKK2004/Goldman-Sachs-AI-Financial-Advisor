import React, { useState } from 'react';

const FAQS = [
    ['How do I add money to my portfolio?', 'Use Add Funds from the dashboard, choose a funding source, enter an amount, and schedule the transfer.'],
    ['Where can I rebalance investments?', 'Open Investments, then use Rebalance to preview allocation changes before trading.'],
    ['Can I automate recurring investments?', 'Yes. Auto Investing lets you set an amount, cadence, funding source, and target allocation.'],
    ['How do I contact support?', 'Start a message from the support panel below or schedule a call with an advisor.'],
];

const SUPPORT_ITEMS = [
    ['Account access', 'Password, sign-in, and profile questions'],
    ['Transfers', 'Deposits, withdrawals, and bank linking'],
    ['Investing', 'Trading, rebalancing, and auto investing'],
    ['Documents', 'Reports, statements, and tax forms'],
];

export default function HelpPage({ onNavigate, TopNav }) {
    const [query, setQuery] = useState('');
    const filteredFaqs = FAQS.filter(([question, answer]) =>
        `${question} ${answer}`.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <TopNav active="Help" onNavigate={onNavigate} />
            <main className="page hp-page">
                <div className="hp-page-header">
                    <div>
                        <h1 className="hp-page-title">Help Center</h1>
                        <p className="hp-page-sub">Find answers, contact support, or get help from an advisor</p>
                    </div>
                    <button className="gp-primary-button" onClick={() => onNavigate('chatbot')}>Ask AI Advisor</button>
                </div>

                <section className="hp-search-panel">
                    <label className="hp-search-box">
                        <span>Search help topics</span>
                        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search transfers, trading, reports..." />
                    </label>
                </section>

                <div className="hp-topic-grid">
                    {SUPPORT_ITEMS.map(([title, detail]) => (
                        <button key={title} className="hp-topic-card">
                            <div className="hp-topic-title">{title}</div>
                            <p>{detail}</p>
                        </button>
                    ))}
                </div>

                <div className="hp-main-grid">
                    <section className="hp-panel">
                        <div className="hp-section-title">Frequently Asked Questions</div>
                        <div className="hp-faq-list">
                            {filteredFaqs.map(([question, answer]) => (
                                <details key={question} className="hp-faq-item" open>
                                    <summary>{question}</summary>
                                    <p>{answer}</p>
                                </details>
                            ))}
                            {filteredFaqs.length === 0 && <p className="hp-empty">No help articles match your search.</p>}
                        </div>
                    </section>

                    <aside className="hp-panel">
                        <div className="hp-section-title">Support Options</div>
                        <div className="hp-support-row"><span>Live chat</span><strong>Available now</strong></div>
                        <div className="hp-support-row"><span>Phone support</span><strong>8 AM-8 PM CT</strong></div>
                        <div className="hp-support-row"><span>Advisor callback</span><strong>Today at 3:30 PM</strong></div>
                        <button className="hp-primary-button">Start Support Request</button>
                        <button className="t-btn-outline full" onClick={() => onNavigate('reports')}>View Reports</button>
                    </aside>
                </div>
            </main>
        </>
    );
}
