import React, { useState } from 'react';
import { FiHome, FiTruck, FiUsers, FiNavigation, FiDollarSign, FiTool, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const mainMenuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome size={20} />, href: '#' },
    { id: 'vehicles', label: 'Vehicles', icon: <FiTruck size={20} />, href: '#' },
    { id: 'drivers', label: 'Drivers', icon: <FiUsers size={20} />, href: '#' },
    { id: 'trips', label: 'Trips', icon: <FiNavigation size={20} />, href: '#' },
    { id: 'expenses', label: 'Expenses', icon: <FiDollarSign size={20} />, href: '#' },
    { id: 'maintenance', label: 'Maintenance', icon: <FiTool size={20} />, href: '#' },
    { id: 'reports', label: 'Reports', icon: <FiFileText size={20} />, href: '#' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <FiTruck size={32} />
          </div>
          <div className="logo-text">
            <h1>TransitOps</h1>
            <p>Fleet Management</p>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">MAIN MENU</h3>
        <nav className="sidebar-menu">
          {mainMenuItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.id)}
              title={item.label}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
              {activeMenu === item.id && <span className="active-indicator"></span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">SETTINGS</h3>
        <div className="sidebar-footer-menu">
          <a href="#" className="menu-item settings">
            <span className="menu-icon"><FiSettings size={20} /></span>
            <span className="menu-label">Settings</span>
          </a>
          <a href="#" className="menu-item logout">
            <span className="menu-icon"><FiLogOut size={20} /></span>
            <span className="menu-label">Logout</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
