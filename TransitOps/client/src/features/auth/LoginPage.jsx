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
        background: '#0a1931',
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
          boxShadow: '0 18px 45px rgba(0, 0, 0, 0.35)',
          background: '#ffffff',
          border: '4px solid #ffffff',
        }}
      >
        <div
          style={{
            flex: 1,
            padding: '48px',
            background: '#ffffff',
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
                background: '#0a1931',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '700',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              TransitOps
            </div>
            <h1 style={{ margin: '16px 0 8px', color: '#0a1931', fontSize: '32px', fontWeight: '800' }}>
              Welcome back
            </h1>
            <p style={{ margin: 0, color: '#0a1931', opacity: 0.7, fontSize: '16px', lineHeight: 1.5 }}>
              Sign in to manage vehicles, trips, maintenance, and reporting in one place.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: '#0a1931', fontWeight: '600' }}>
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
                  border: '2px solid #0a1931',
                  color: '#0a1931',
                  background: '#ffffff',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', color: '#0a1931', fontWeight: '600' }}>
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
                  border: '2px solid #0a1931',
                  color: '#0a1931',
                  background: '#ffffff',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
              <label style={{ color: '#0a1931', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginRight: '6px', accentColor: '#0a1931' }} />
                Remember me
              </label>
              <a href="#" style={{ color: '#0a1931', fontWeight: '600', textDecoration: 'none' }}>
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
                background: '#0a1931',
                color: '#ffffff',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '15px',
                transition: 'background-color 0.2s',
              }}
            >
              Log in
            </button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center', color: '#0a1931', opacity: 0.8, fontSize: '14px' }}>
            New here? <a href="#" style={{ color: '#0a1931', fontWeight: '700', textDecoration: 'underline' }}>Create an account</a>
          </p>
        </div>

        <div
          style={{
            flex: 1,
            background: '#0a1931',
            color: '#ffffff',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ margin: '0 0 12px', fontSize: '28px', fontWeight: '700' }}>Operate smarter</h2>
          <p style={{ margin: 0, lineHeight: 1.7, color: '#ffffff', opacity: 0.9, fontSize: '16px' }}>
            Keep your fleet running smoothly with real-time visibility, efficient scheduling, and clear operational insights.
          </p>
          <div style={{ marginTop: '24px', padding: '16px 18px', borderRadius: '14px', background: 'rgba(255,255,255,0.1)' }}>
            <strong style={{ color: '#ffffff' }}>Secure access</strong>
            <p style={{ margin: '6px 0 0', color: '#ffffff', opacity: 0.8 }}>Protected login for dispatchers, operators, and fleet managers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
