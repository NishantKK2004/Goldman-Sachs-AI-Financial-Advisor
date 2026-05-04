import React, { useState } from 'react';

const GOALS = [
    { name: 'Retirement', target: 1250000, current: 582400, date: '2045', monthly: 2400, status: 'On Track', color: '#16a34a' },
    { name: 'Home Down Payment', target: 95000, current: 61250, date: 'Dec 2027', monthly: 1800, status: 'Ahead', color: '#3465f4' },
    { name: 'Emergency Reserve', target: 42000, current: 32180, date: 'Aug 2026', monthly: 950, status: 'Needs $410/mo', color: '#f59e0b' },
    { name: 'College Fund', target: 180000, current: 46800, date: '2036', monthly: 1100, status: 'Review', color: '#5049e9' },
];

const MILESTONES = [
    ['Emergency Reserve', '75% funded', 'Next projected milestone'],
    ['Home Down Payment', '$70,000 by Q3', 'Contribution pace looks strong'],
    ['Retirement', 'Increase annual step-up', 'Raises projected confidence to 89%'],
];

function money(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export default function GoalsPage({ onNavigate, TopNav }) {
    const [selected, setSelected] = useState(GOALS[0].name);
    const activeGoal = GOALS.find(goal => goal.name === selected) || GOALS[0];
    const progress = Math.round((activeGoal.current / activeGoal.target) * 100);

    return (
        <>
            <TopNav active="Goals" onNavigate={onNavigate} />
            <main className="page gp-page">
                <div className="gp-page-header">
                    <div>
                        <h1 className="gp-page-title">Goals</h1>
                        <p className="gp-page-sub">Track target dates, contributions, and funding confidence</p>
                    </div>
                    <button className="gp-primary-button">Create Goal</button>
                </div>

                <div className="gp-stats-grid">
                    {[
                        ['Total Goal Targets', '$1.57M', 'Across 4 active goals'],
                        ['Funded So Far', '$722.6K', '46% blended progress'],
                        ['Monthly Contributions', '$6,250', '+$450 from last month'],
                        ['Projected Confidence', '84%', 'Based on current pace'],
                    ].map(([label, value, detail]) => (
                        <section key={label} className="gp-stat-card">
                            <div className="gp-stat-label">{label}</div>
                            <div className="gp-stat-value">{value}</div>
                            <div className="gp-stat-detail">{detail}</div>
                        </section>
                    ))}
                </div>

                <div className="gp-main-grid">
                    <section className="gp-panel">
                        <div className="gp-section-header">
                            <div>
                                <div className="gp-section-title">Goal Portfolio</div>
                                <div className="gp-section-sub">Select a goal to review its funding plan</div>
                            </div>
                        </div>
                        <div className="gp-goal-list">
                            {GOALS.map(goal => {
                                const pct = Math.round((goal.current / goal.target) * 100);
                                return (
                                    <button
                                        key={goal.name}
                                        className={`gp-goal-row${goal.name === selected ? ' selected' : ''}`}
                                        onClick={() => setSelected(goal.name)}
                                    >
                                        <div className="gp-goal-top">
                                            <div>
                                                <div className="gp-goal-name">{goal.name}</div>
                                                <div className="gp-goal-meta">Target {money(goal.target)} by {goal.date}</div>
                                            </div>
                                            <span className="gp-goal-status" style={{ color: goal.color, background: `${goal.color}18`, borderColor: `${goal.color}44` }}>{goal.status}</span>
                                        </div>
                                        <div className="gp-goal-progress">
                                            <span>{money(goal.current)}</span>
                                            <span>{pct}%</span>
                                        </div>
                                        <div className="progress-track gp-progress-track">
                                            <div className="progress-fill" style={{ width: `${pct}%`, background: goal.color }} />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <aside className="gp-panel">
                        <div className="gp-section-title">{activeGoal.name} Plan</div>
                        <p className="gp-section-sub">Prototype projection using current contribution pace.</p>
                        <div className="gp-focus-number">{progress}%</div>
                        <div className="progress-track gp-focus-track">
                            <div className="progress-fill" style={{ width: `${progress}%`, background: activeGoal.color }} />
                        </div>
                        <div className="gp-detail-grid">
                            <div><span>Current</span><strong>{money(activeGoal.current)}</strong></div>
                            <div><span>Remaining</span><strong>{money(activeGoal.target - activeGoal.current)}</strong></div>
                            <div><span>Monthly</span><strong>{money(activeGoal.monthly)}</strong></div>
                            <div><span>Target</span><strong>{activeGoal.date}</strong></div>
                        </div>
                        <button className="gp-secondary-button" onClick={() => onNavigate('auto-investing')}>Automate Contributions</button>
                    </aside>
                </div>

                <section className="gp-panel">
                    <div className="gp-section-title">Suggested Milestones</div>
                    <div className="gp-milestone-grid">
                        {MILESTONES.map(([title, value, detail]) => (
                            <div key={title} className="gp-milestone">
                                <div className="gp-milestone-title">{title}</div>
                                <div className="gp-milestone-value">{value}</div>
                                <p>{detail}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
