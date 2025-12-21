import React from 'react';
import { FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ onLogout }) => {
  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      backgroundColor: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--border-color)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>Nabu Brain</h1>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: '8px' }}>
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '8px',
              color: 'var(--text-color)',
              textDecoration: 'none',
              backgroundColor: 'var(--bg-color)',
              fontWeight: 500
            }}>
              <FaHome /> Home
            </a>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <a href="#" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '8px',
              color: '#666',
              textDecoration: 'none',
              fontWeight: 500
            }}>
              <FaCog /> Settings
            </a>
          </li>
        </ul>
      </nav>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
        <button onClick={onLogout} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          padding: '10px 12px',
          color: '#666',
          fontSize: '14px'
        }}>
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
