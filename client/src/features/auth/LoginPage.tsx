import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const roles = ['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'];

const LoginPage = () => {
  const [email, setEmail] = useState('Ravenk@transitops.in');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Dispatcher');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials. Account locked after 5 failed attempts.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-center">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="60" rx="14" fill="white" />
            <rect x="8" y="8" width="44" height="44" rx="10" fill="#1f2937" />
            <path d="M30 16L40 22.5V35.5L30 42L20 35.5V22.5L30 16Z" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M24 25L30 21L36 25" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 21V32" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            <path d="M24 29.5L30 34L36 29.5" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="login-brand">
            <h1>TransitOps</h1>
            <p>Smart Transport Operations Platform</p>
          </div>
        </div>
        <div className="login-footer">TRANSITOPS &copy; 2026 - RBAC EX4</div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <h2>Sign in to your account</h2>
          <p className="form-subtitle">Enter your credentials to continue</p>

          {error && (
            <div className="error-callout">
              <span className="error-label">Error state</span>
              <span className="error-msg">
                <span style={{ color: '#ef4444', fontWeight: 700 }}>X</span>
                {' '}{error}
              </span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Role (RBAC)</label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label className="checkbox-group">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="scope-notes">
            <strong>Access is scoped by role after login</strong><br />
            Fleet Manager &rarr; Fleet, Maintenance<br />
            Dispatcher &rarr; Dashboard, Trips<br />
            Safety Officer &rarr; Drivers, Compliance<br />
            Financial Analyst &rarr; Fuel &amp; Expenses, Analytics
          </div>
        </div>

        <div className="watermark">Actual Dogfish</div>
      </div>
    </div>
  );
};

export default LoginPage;
