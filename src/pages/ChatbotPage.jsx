import React, { useState, useEffect, useRef } from 'react';

const SUGGESTED = [
    'How is my portfolio performing?',
    'Where am I overspending?',
    'Should I rebalance now?',
    'What are my biggest risks?',
    'How can I reduce my tax liability?',
];

const HISTORY = [
    { title: 'Portfolio Performance Review',   date: 'Today' },
    { title: 'Tax Optimization Strategies',    date: 'Yesterday' },
    { title: 'Retirement Planning Advice',     date: 'Mar 29' },
    { title: 'Investment Recommendations',     date: 'Mar 28' },
    { title: 'Monthly Budget Analysis',        date: 'Mar 27' },
    { title: 'Market Trends Discussion',       date: 'Mar 26' },
];

const AI_RESPONSES = {
    portfolio:   "Your portfolio is performing exceptionally well! Over the past 6 months, you've seen a 26.4% return, translating to $53,000 in gains. This outpaces the S&P 500 by 8.2%. Your tech sector allocation has been the main driver — particularly your positions in cloud computing and AI-focused companies.",
    overspending:"Based on your last 3 months of transactions, your top overspending categories are: Dining (+34% vs your budget), Entertainment (+28%), and Subscriptions (+$142 in unused services). I recommend setting a $400/month dining cap and auditing your subscriptions this week.",
    rebalance:   "Your current allocation is 85% US equities, which is above your target of 70%. I recommend shifting 10–15% into international equities and 5% into bonds to bring your risk profile back in line. This could reduce portfolio volatility by ~12% without significantly impacting expected returns.",
    risk:        "Your top 3 risks right now are: (1) Concentration in US tech — 45% of your portfolio. (2) Rising interest rate exposure on your bond holdings. (3) Currency risk from your VXUS position. Consider adding commodities or REITs as a hedge.",
    tax:         "You have $3,400 in potential tax-loss harvesting opportunities in GOOGL. Additionally, maxing out your IRA contribution for 2026 ($7,000) could save you ~$1,540 in taxes. I can generate a full tax optimization report if you'd like.",
    default:     "That's a great question! Based on your current financial data, I can help you analyze your portfolio, spending habits, tax situation, and more. Could you provide a bit more detail about what you'd like to explore? I'm here to give you personalized, data-driven guidance.",
};

function getAIResponse(input) {
    const q = input.toLowerCase();
    if (q.includes('portfolio') || q.includes('performing') || q.includes('return')) return AI_RESPONSES.portfolio;
    if (q.includes('overspend') || q.includes('spending') || q.includes('budget'))   return AI_RESPONSES.overspending;
    if (q.includes('rebalance') || q.includes('allocation') || q.includes('diversif')) return AI_RESPONSES.rebalance;
    if (q.includes('risk') || q.includes('safe') || q.includes('volatile'))          return AI_RESPONSES.risk;
    if (q.includes('tax') || q.includes('liability') || q.includes('harvest'))       return AI_RESPONSES.tax;
    return AI_RESPONSES.default;
}

export default function ChatbotPage({ onNavigate, TopNav }) {
    const [messages,    setMessages]    = useState([]);
    const [input,       setInput]       = useState('');
    const [loading,     setLoading]     = useState(false);
    const [activeHistory, setActiveHistory] = useState(0);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const sendMessage = (text) => {
        const q = (text || input).trim();
        if (!q) return;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: q }]);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setMessages(prev => [...prev, { role: 'ai', text: getAIResponse(q) }]);
        }, 1200);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <TopNav active="AI Advisor" onNavigate={onNavigate} />
            <main className="page cb-page">

                <div className="cb-layout">

                    {/* Sidebar: chat history */}
                    <aside className="cb-sidebar">
                        <div className="cb-sidebar-title">Chat History</div>
                        <div className="cb-history-list">
                            {HISTORY.map((h, i) => (
                                <button
                                    key={i}
                                    className={`cb-history-item${activeHistory === i ? ' active' : ''}`}
                                    onClick={() => { setActiveHistory(i); setMessages([]); }}
                                >
                                    <span className="cb-history-icon">💬</span>
                                    <div className="cb-history-info">
                                        <div className="cb-history-name">{h.title}</div>
                                        <div className="cb-history-date">{h.date}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Main chat panel */}
                    <div className="cb-main">

                        {/* Welcome or conversation */}
                        <div className="cb-chat-area">
                            {messages.length === 0 ? (
                                <div className="cb-welcome">
                                    <div className="cb-welcome-text">
                                        Hi Nishant, what would you like to know about your finances today?
                                    </div>
                                    <div className="cb-suggestions">
                                        {SUGGESTED.map((s, i) => (
                                            <button key={i} className="cb-suggestion-chip" onClick={() => sendMessage(s)}>
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="cb-messages">
                                    {messages.map((m, i) => (
                                        <div key={i} className={`cb-msg cb-msg-${m.role}`}>
                                            <div className="cb-msg-sender">
                                                {m.role === 'user' ? 'You' : '◈ AI Financial Advisor'}
                                            </div>
                                            <div className="cb-msg-bubble">{m.text}</div>
                                        </div>
                                    ))}
                                    {loading && (
                                        <div className="cb-msg cb-msg-ai">
                                            <div className="cb-msg-sender">◈ AI Financial Advisor</div>
                                            <div className="cb-msg-bubble cb-msg-loading">Thinking…</div>
                                        </div>
                                    )}
                                    <div ref={chatEndRef} />
                                </div>
                            )}
                        </div>

                        {/* Input row */}
                        <div className="cb-input-area">
                            <input
                                type="text"
                                className="cb-input"
                                placeholder="Ask me anything about your finances…"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button className="cb-btn-send" onClick={() => sendMessage()}>
                                ➤
                            </button>
                        </div>
                        <div className="cb-disclaimer">
                            AI responses are for informational purposes only and do not constitute financial advice.
                        </div>

                    </div>
                </div>

            </main>
        </>
    );
}
