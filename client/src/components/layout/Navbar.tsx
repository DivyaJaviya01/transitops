import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiSearch, FiBell, FiShield, FiChevronDown, FiSun, FiMoon, FiMenu, FiLogOut, FiCheck, FiCheckCheck, FiInfo, FiAlertTriangle, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const typeIcons: Record<string, React.ReactNode> = {
  info: <FiInfo size={16} />,
  warning: <FiAlertTriangle size={16} />,
  error: <FiAlertCircle size={16} />,
  success: <FiCheckCircle size={16} />,
};

const typeColors: Record<string, string> = {
  info: '#3b82f6',
  warning: '#f59e0b',
  error: '#ef4444',
  success: '#10b981',
};

function Navbar({ onToggleSidebar }: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const notifRef = useRef<HTMLDivElement>(null);
  const initials = user?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '?';

  const { data: notifData } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await api.get('/notifications?limit=10');
      return res.data;
    },
    refetchInterval: 30000,
  });

  const markRead = useMutation({
    mutationFn: (id: string) => api.patch(`/notifications/${id}/read`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  const markAllRead = useMutation({
    mutationFn: () => api.patch('/notifications/read-all'),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const notifications = notifData?.notifications || [];
  const unreadCount = notifData?.unreadCount || 0;

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

        <div className="notification-wrapper" ref={notifRef}>
          <button
            className="navbar-button notification-button"
            onClick={() => setShowNotifPanel(!showNotifPanel)}
          >
            <FiBell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
            )}
          </button>

          {showNotifPanel && (
            <div className="notification-panel">
              <div className="notif-panel-header">
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <button className="notif-mark-all" onClick={() => markAllRead.mutate()}>
                    <FiCheckCheck size={14} /> Mark all read
                  </button>
                )}
              </div>
              <div className="notif-list">
                {notifications.length === 0 && (
                  <div className="notif-empty">No notifications</div>
                )}
                {notifications.map((n: any) => (
                  <div
                    key={n.id}
                    className={`notif-item ${!n.isRead ? 'unread' : ''}`}
                    onClick={() => {
                      if (!n.isRead) markRead.mutate(n.id);
                      if (n.link) navigate(n.link);
                      setShowNotifPanel(false);
                    }}
                  >
                    <div className="notif-icon" style={{ color: typeColors[n.type] || '#6b7280' }}>
                      {typeIcons[n.type] || <FiInfo size={16} />}
                    </div>
                    <div className="notif-content">
                      <p className="notif-title">{n.title}</p>
                      <p className="notif-message">{n.message}</p>
                      <span className="notif-time">
                        {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {!n.isRead && <span className="notif-dot"></span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

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
