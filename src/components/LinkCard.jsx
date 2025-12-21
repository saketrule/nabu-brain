import React from 'react';
import { FaExternalLinkAlt, FaTrash } from 'react-icons/fa';

const LinkCard = ({ title, url, onDelete }) => {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-color)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            cursor: 'pointer'
        }}
            className="link-card"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{title}</h3>
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{ color: '#999' }}>
                    <FaTrash />
                </button>
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer" style={{
                fontSize: '14px',
                color: '#666',
                textDecoration: 'none',
                wordBreak: 'break-all',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
            }}>
                {url} <FaExternalLinkAlt size={10} />
            </a>

            <style>{`
        .link-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
        </div>
    );
};

export default LinkCard;
