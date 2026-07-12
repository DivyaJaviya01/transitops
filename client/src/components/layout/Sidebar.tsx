import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiTruck, FiUsers, FiNavigation, FiDollarSign, FiTool, FiFileText, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  to: string;
}

interface SidebarProps {
  isCollapsed: boolean;
}

function Sidebar({ isCollapsed }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const mainMenuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome size={20} />, to: '/' },
    { id: 'vehicles', label: 'Vehicles', icon: <FiTruck size={20} />, to: '/vehicles' },
    { id: 'drivers', label: 'Drivers', icon: <FiUsers size={20} />, to: '/drivers' },
    { id: 'trips', label: 'Trips', icon: <FiNavigation size={20} />, to: '/trips' },
    { id: 'expenses', label: 'Expenses', icon: <FiDollarSign size={20} />, to: '/expenses' },
    { id: 'maintenance', label: 'Maintenance', icon: <FiTool size={20} />, to: '/maintenance' },
    { id: 'reports', label: 'Reports', icon: <FiFileText size={20} />, to: '/reports' },
  ];

  const getIsActive = (to: string) => {
    if (to === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(to);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <FiTruck size={32} />
          </div>
          {!isCollapsed && (
            <div className="logo-text">
              <h1>TransitOps</h1>
              <p>Fleet Management</p>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-section">
        {!isCollapsed && <h3 className="section-title">MAIN MENU</h3>}
        <nav className="sidebar-menu">
          {mainMenuItems.map((item) => {
            const isActive = getIsActive(item.to);
            return (
              <Link
                key={item.id}
                to={item.to}
                className={`menu-item ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                <span className="menu-icon">{item.icon}</span>
                {!isCollapsed && <span className="menu-label">{item.label}</span>}
                {isActive && <span className="active-indicator"></span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-section">
        {!isCollapsed && <h3 className="section-title">SETTINGS</h3>}
        <div className="sidebar-footer-menu">
          <div className="menu-item settings" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="menu-icon"><FiSettings size={20} /></span>
            {!isCollapsed && <span className="menu-label">Settings</span>}
          </div>
          <div className="menu-item logout" onClick={() => logout()} style={{ cursor: 'pointer' }}>
            <span className="menu-icon"><FiLogOut size={20} /></span>
            {!isCollapsed && <span className="menu-label">Logout</span>}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
