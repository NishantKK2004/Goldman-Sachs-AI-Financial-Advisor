import React, { useState } from 'react';

const REPORTS = [
    { name: 'Q1 2026 Portfolio Performance', type: 'Performance Report', typeColor: '#3465f4', typeBg: '#dbeafe', date: 'Mar 28, 2026', period: 'Jan – Mar 2026' },
    { name: '2025 Annual Tax Statement',      type: 'Tax Statement',       typeColor: '#16a34a', typeBg: '#dcfce7', date: 'Mar 15, 2026', period: 'Jan – Dec 2025' },
    { name: 'February 2026 Transaction History', type: 'Transaction History', typeColor: '#f59e0b', typeBg: '#fef3c7', date: 'Mar 01, 2026', period: 'Feb 2026' },
    { name: 'Q4 2025 Investment Income',      type: 'Income Statement',    typeColor: '#5049e9', typeBg: '#ede9fe', date: 'Jan 15, 2026', period: 'Oct – Dec 2025' },
    { name: 'Year-End Portfolio Summary 2025',type: 'Portfolio Summary',   typeColor: '#0ea5e9', typeBg: '#e0f2fe', date: 'Jan 05, 2026', period: 'Jan – Dec 2025' },
    { name: 'Q3 2025 Performance Analysis',  type: 'Performance Report',  typeColor: '#3465f4', typeBg: '#dbeafe', date: 'Oct 10, 2025', period: 'Jul – Sep 2025' },
];

const SCHEDULED = [
    { name: 'Monthly Portfolio Summary',    sub: 'First day of each month',  enabled: true  },
    { name: 'Quarterly Performance Report', sub: 'End of each quarter',       enabled: true  },
    { name: 'Weekly Transaction Summary',   sub: 'Every Monday',              enabled: false },
];

const DATE_RANGES  = ['Last 30 Days', 'Last 3 Months', 'Last 6 Months', 'Last Year', 'All Time'];
const REPORT_TYPES = ['All Types', 'Performance Report', 'Tax Statement', 'Transaction History', 'Income Statement', 'Portfolio Summary'];
const ACCOUNTS     = ['All Accounts', 'Brokerage Account', 'Retirement (IRA)', 'Savings Account'];

export default function ReportsPage({ onNavigate, TopNav }) {
    const [dateRange,   setDateRange]   = useState('Last 6 Months');
    const [reportType,  setReportType]  = useState('All Types');
    const [account,     setAccount]     = useState('All Accounts');
    const [scheduled,   setScheduled]   = useState(SCHEDULED.map(s => s.enabled));
    const [toast,       setToast]       = useState(null);

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const filtered = REPORTS.filter(r =>
        (reportType === 'All Types' || r.type === reportType)
    );

    const toggleScheduled = (i) => {
        setScheduled(prev => prev.map((v, idx) => idx === i ? !v : v));
    };

    return (
        <>
            <TopNav active="Reports" onNavigate={onNavigate} />
            <main className="page rp-page">

                {/* Header */}
                <div className="rp-page-header">
                    <div>
                        <h1 className="rp-page-title">Reports</h1>
                        <p className="rp-page-sub">View and download your financial statements</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="rp-panel rp-filters">
                    <div className="rp-filter-group">
                        <label className="rp-filter-label">📅 Date Range</label>
                        <select className="rp-filter-select" value={dateRange} onChange={e => setDateRange(e.target.value)}>
                            {DATE_RANGES.map(d => <option key={d}>{d}</option>)}
                        </select>
                    </div>
                    <div className="rp-filter-group">
                        <label className="rp-filter-label">📄 Report Type</label>
                        <select className="rp-filter-select" value={reportType} onChange={e => setReportType(e.target.value)}>
                            {REPORT_TYPES.map(t => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="rp-filter-group">
                        <label className="rp-filter-label">🏦 Account</label>
                        <select className="rp-filter-select" value={account} onChange={e => setAccount(e.target.value)}>
                            {ACCOUNTS.map(a => <option key={a}>{a}</option>)}
                        </select>
                    </div>
                </div>

                {/* Past Reports Table */}
                <div className="rp-panel">
                    <div className="rp-section-header">
                        <div>
                            <div className="rp-section-title">Past Reports</div>
                            <div className="rp-section-sub">Download your generated financial reports</div>
                        </div>
                    </div>
                    <div className="rp-table-wrap">
                        <table className="rp-table">
                            <thead>
                                <tr>
                                    <th>Report Name</th>
                                    <th>Type</th>
                                    <th>Date Generated</th>
                                    <th>Period</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((r, i) => (
                                    <tr key={i} className="rp-table-row">
                                        <td className="rp-report-name">{r.name}</td>
                                        <td>
                                            <span className="rp-type-badge" style={{ color: r.typeColor, background: r.typeBg }}>
                                                {r.type}
                                            </span>
                                        </td>
                                        <td className="rp-muted">{r.date}</td>
                                        <td className="rp-muted">{r.period}</td>
                                        <td>
                                            <button className="rp-btn-download" onClick={() => showToast(`Downloading: ${r.name}`)}>
                                                ⬇ Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr><td colSpan={5} className="rp-empty">No reports match your filters.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Scheduled Reports */}
                <div className="rp-panel">
                    <div className="rp-section-header">
                        <div>
                            <div className="rp-section-title">⏱ Scheduled Reports</div>
                            <div className="rp-section-sub">Manage your automatic report generation</div>
                        </div>
                    </div>
                    <div className="rp-scheduled-list">
                        {SCHEDULED.map((s, i) => (
                            <div key={i} className="rp-scheduled-item">
                                <div>
                                    <div className="rp-scheduled-name">{s.name}</div>
                                    <div className="rp-scheduled-sub">{s.sub}</div>
                                </div>
                                <button
                                    className={`rp-toggle${scheduled[i] ? ' on' : ''}`}
                                    onClick={() => toggleScheduled(i)}
                                    aria-label={scheduled[i] ? 'Disable' : 'Enable'}
                                >
                                    <span className="rp-toggle-knob" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {toast && <div className="t-toast">{toast}</div>}
        </>
    );
}
