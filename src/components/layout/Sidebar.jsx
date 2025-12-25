import React, { useState, useEffect } from 'react';
import { FaHome, FaCog, FaSignOutAlt, FaFileAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const [pages, setPages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const modules = import.meta.glob('/src/content/*.md', { query: '?raw' });
    const pageList = Object.keys(modules).map(path => {
      // Extract slug from path: /src/content/my-page.md -> my-page
      const slug = path.split('/').pop().replace('.md', '');
      return {
        slug,
        title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      };
    });
    setPages(pageList);
  }, []);

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '8px',
    color: isActive(path) ? 'var(--text-color)' : '#666',
    textDecoration: 'none',
    backgroundColor: isActive(path) ? 'var(--bg-color)' : 'transparent',
    fontWeight: 500,
    transition: 'all 0.2s'
  });

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
            <Link to="/" style={linkStyle('/')}>
              <FaHome /> Home
            </Link>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <Link to="/settings" style={linkStyle('/settings')}>
              <FaCog /> Settings
            </Link>
          </li>
        </ul>

        {pages.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#999', marginBottom: '16px', fontWeight: 600, letterSpacing: '0.5px' }}>Pages</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {pages.map(page => (
                <li key={page.slug} style={{ marginBottom: '8px' }}>
                  <Link to={`/p/${page.slug}`} style={linkStyle(`/p/${page.slug}`)}>
                    <FaFileAlt /> {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
        <button onClick={onLogout} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          padding: '10px 12px',
          color: '#666',
          fontSize: '14px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer'
        }}>
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
