import React, { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiChevronDown } from 'react-icons/fi';

function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="search-bar">
          <FiSearch size={18} />
          <input 
            type="text" 
            placeholder="Search vehicles, drivers, trips..." 
          />
        </div>
      </div>

      <div className="navbar-right">
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
            <div className="avatar">JM</div>
            <span className="user-name">John Manager</span>
            <FiChevronDown size={18} />
          </button>

          {showUserMenu && (
            <div className="user-dropdown">
              <a href="#" className="dropdown-item">
                <FiUser size={16} />
                Profile
              </a>
              <a href="#" className="dropdown-item">
                Settings
              </a>
              <hr className="dropdown-divider" />
              <a href="#" className="dropdown-item logout">
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
