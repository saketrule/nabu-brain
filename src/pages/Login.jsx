import React from 'react';
import { FaGoogle } from 'react-icons/fa';

const Login = ({ onLogin }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: 'var(--bg-color)'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-md)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h1 style={{ marginBottom: '8px', fontSize: '24px' }}>Welcome to Nabu Brain</h1>
                <p style={{ color: '#666', marginBottom: '32px' }}>Sign in to manage your digital brain</p>

                <button onClick={onLogin} style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    backgroundColor: 'white',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#333',
                    transition: 'background-color 0.2s'
                }}>
                    <FaGoogle color="#DB4437" /> Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
