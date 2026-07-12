import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Logging in with ${email}`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #60a5fa 100%)',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'flex',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 18px 45px rgba(0, 0, 0, 0.25)',
          background: '#ffffff',
        }}
      >
        <div
          style={{
            flex: 1,
            padding: '48px',
            background: 'linear-gradient(135deg, #eff6ff, #f8fafc)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: '999px',
                background: '#dbeafe',
                color: '#1d4ed8',
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              TransitOps
            </div>
            <h1 style={{ margin: '16px 0 8px', color: '#111827', fontSize: '32px' }}>
              Welcome back
            </h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '16px', lineHeight: 1.5 }}>
              Sign in to manage vehicles, trips, maintenance, and reporting in one place.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: '600' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', color: '#374151', fontWeight: '600' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
              <label style={{ color: '#4b5563' }}>
                <input type="checkbox" style={{ marginRight: '6px' }} />
                Remember me
              </label>
              <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '13px',
                border: 'none',
                borderRadius: '10px',
                background: 'linear-gradient(90deg, #2563eb, #1d4ed8)',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '15px',
              }}
            >
              Log in
            </button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
            New here? <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}>Create an account</a>
          </p>
        </div>

        <div
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
            color: 'white',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ margin: '0 0 12px', fontSize: '28px' }}>Operate smarter</h2>
          <p style={{ margin: 0, lineHeight: 1.7, color: '#dbeafe', fontSize: '16px' }}>
            Keep your fleet running smoothly with real-time visibility, efficient scheduling, and clear operational insights.
          </p>
          <div style={{ marginTop: '24px', padding: '16px 18px', borderRadius: '14px', background: 'rgba(255,255,255,0.14)' }}>
            <strong>Secure access</strong>
            <p style={{ margin: '6px 0 0', color: '#dbeafe' }}>Protected login for dispatchers, operators, and fleet managers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
