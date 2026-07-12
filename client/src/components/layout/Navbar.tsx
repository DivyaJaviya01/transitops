import React, { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiMail, FiShield, FiChevronDown, FiSun, FiMoon, FiMenu, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onToggleSidebar: () => void;
}

function Navbar({ onToggleSidebar }: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const initials = user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button 
          className="sidebar-toggle-button"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={22} />
        </button>

        <div className="search-bar">
          <FiSearch size={18} />
          <input 
            type="text" 
            placeholder="Search vehicles, drivers, trips..." 
          />
        </div>
      </div>

      <div className="navbar-right">
        <button 
          className="navbar-button theme-toggle-button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{ cursor: 'pointer' }}
        >
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>

        <button className="navbar-button notification-button">
          <FiBell size={20} />
          <span className="notification-badge">3</span>
        </button>

        <div className="navbar-divider"></div>

        <div className="user-menu">
          <button 
            className="user-profile"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="avatar">{initials}</div>
            <span className="user-name">{user?.name || 'User'}</span>
            <FiChevronDown size={18} />
          </button>

          {showUserMenu && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="dropdown-avatar">{initials}</div>
                <div>
                  <p className="dropdown-name">{user?.name}</p>
                  <p className="dropdown-email">{user?.email}</p>
                </div>
              </div>
              <hr className="dropdown-divider" />
              <div className="dropdown-item" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <FiShield size={16} />
                {user?.role}
              </div>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); logout(); }}>
                <FiLogOut size={16} />
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
