import React, { useState } from 'react';
import { FaGoogle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.message || "Failed to sign in via Google.");
        } finally {
            setLoading(false);
        }
    };

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
                <h1 style={{ marginBottom: '8px', fontSize: '24px' }}>Welcome to Displai x Nabu Brain</h1>
                <p style={{ color: '#666', marginBottom: '32px' }}>Sign in to manage your digital brain</p>

                {error && (
                    <div style={{
                        marginBottom: '20px',
                        padding: '10px',
                        backgroundColor: '#FFF2F0',
                        border: '1px solid #FFCCC7',
                        borderRadius: '8px',
                        color: '#CF1322',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textAlign: 'left'
                    }}>
                        <FaExclamationTriangle />
                        <span>{error}</span>
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
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
                        transition: 'background-color 0.2s',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}>
                    {loading ? <FaSpinner className="spin" /> : <FaGoogle color="#DB4437" />}
                    {loading ? 'Signing in...' : 'Continue with Google'}
                </button>
            </div>
            <style>{`
                .spin {
                  animation: spin 1s linear infinite;
                }
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
        </div>
    );
};

export default Login;
