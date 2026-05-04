import React, { useState } from 'react';
import { authenticateUser, createUser } from '../authDb';

const PASSWORD_RULES = [
    'At least 8 characters',
    'Includes a number',
    'Includes an uppercase letter',
];

function passwordIsStrong(password) {
    return password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password);
}

export default function LoginPage({ onAuthenticated }) {
    const [mode, setMode] = useState('login');
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setMessage('');
    };

    const submit = async (event) => {
        event.preventDefault();
        setMessage('');

        if (!form.email.trim() || !form.password) {
            setMessage('Enter your email and password.');
            return;
        }

        if (mode === 'signup') {
            if (!form.firstName.trim() || !form.lastName.trim()) {
                setMessage('Enter your first and last name.');
                return;
            }
            if (!passwordIsStrong(form.password)) {
                setMessage('Choose a stronger password.');
                return;
            }
            if (form.password !== form.confirmPassword) {
                setMessage('Passwords do not match.');
                return;
            }
        }

        setLoading(true);
        try {
            const user = mode === 'signup'
                ? await createUser(form)
                : await authenticateUser(form.email, form.password);
            onAuthenticated(user);
        } catch (error) {
            setMessage(error.message || 'Unable to sign in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-shell">
                <div className="auth-brand-panel">
                    <div className="auth-brand">FinanceHub</div>
                    <h1>Secure access to your financial dashboard</h1>
                    <p>Sign in or create a protected local profile for this prototype.</p>
                    <div className="auth-security-list">
                        <div><strong>PBKDF2</strong><span>Salted password hashing</span></div>
                        <div><strong>IndexedDB</strong><span>Local browser database</span></div>
                        <div><strong>Session</strong><span>Clears when the browser session ends</span></div>
                    </div>
                </div>

                <form className="auth-card" onSubmit={submit}>
                    <div className="auth-tabs">
                        <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Log In</button>
                        <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Create Account</button>
                    </div>

                    <div className="auth-card-head">
                        <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
                        <p>{mode === 'login' ? 'Use your FinanceHub credentials.' : 'Your password is hashed before storage.'}</p>
                    </div>

                    {mode === 'signup' && (
                        <div className="auth-name-grid">
                            <label className="auth-field">
                                <span>First Name</span>
                                <input value={form.firstName} onChange={e => updateField('firstName', e.target.value)} autoComplete="given-name" />
                            </label>
                            <label className="auth-field">
                                <span>Last Name</span>
                                <input value={form.lastName} onChange={e => updateField('lastName', e.target.value)} autoComplete="family-name" />
                            </label>
                        </div>
                    )}

                    <label className="auth-field">
                        <span>Email</span>
                        <input type="email" value={form.email} onChange={e => updateField('email', e.target.value)} autoComplete="email" />
                    </label>
                    <label className="auth-field">
                        <span>Password</span>
                        <input type="password" value={form.password} onChange={e => updateField('password', e.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
                    </label>

                    {mode === 'signup' && (
                        <>
                            <label className="auth-field">
                                <span>Confirm Password</span>
                                <input type="password" value={form.confirmPassword} onChange={e => updateField('confirmPassword', e.target.value)} autoComplete="new-password" />
                            </label>
                            <div className="auth-rules">
                                {PASSWORD_RULES.map(rule => <span key={rule}>{rule}</span>)}
                            </div>
                        </>
                    )}

                    {message && <div className="auth-message">{message}</div>}

                    <button className="auth-submit" disabled={loading}>
                        {loading ? 'Securing...' : mode === 'login' ? 'Log In' : 'Create Secure Account'}
                    </button>
                </form>
            </section>
        </main>
    );
}
