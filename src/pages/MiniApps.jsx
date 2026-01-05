import React, { useState } from 'react';
import registry from '../data/registry.json';
import { FaPlay, FaTimes, FaCheck, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

const MiniApps = () => {
    const [selectedApp, setSelectedApp] = useState(null);
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const openApp = (app) => {
        setSelectedApp(app);
        setInputs({});
        setResult(null);
        setError(null);
    };

    const closeApp = () => {
        setSelectedApp(null);
        setInputs({});
        setResult(null);
        setError(null);
    };

    const handleInputChange = (name, value) => {
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const executeWorkflow = async (e) => {
        e.preventDefault();
        if (!selectedApp) return;

        setLoading(true);
        setResult(null);
        setError(null);

        try {
            // Construct payload based on inputs
            // The inputs state maps field names to values.
            const payload = { ...inputs };

            const response = await fetch(selectedApp.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Try to parse JSON response, even if status is not 200 (n8n might return 400 with json error)
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
            }

            setResult(data);
        } catch (err) {
            console.error("Workflow execution failed:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mini-apps-container">
            <header style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 600 }}>Displai Workflows</h2>
                <p style={{ color: '#666', marginTop: '8px' }}>
                    Collection of utilities powered by n8n workflows.
                </p>
            </header>

            {/* App Grid */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                marginBottom: '40px'
            }}>
                {registry.map(app => (
                    <div
                        key={app.id}
                        onClick={() => openApp(app)}
                        style={{
                            background: 'white',
                            borderRadius: '16px',
                            padding: '24px',
                            cursor: 'pointer',
                            border: '1px solid var(--border-color)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                        }}
                    >
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{app.name}</h3>
                        <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.5' }}>{app.description}</p>
                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', color: 'var(--primary-color)', fontSize: '14px', fontWeight: 500 }}>
                            <FaPlay style={{ marginRight: '6px', fontSize: '10px' }} /> Run App
                        </div>
                    </div>
                ))}
            </div>

            {/* App Modal / Runner */}
            {selectedApp && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }} onClick={closeApp}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        padding: '32px',
                        position: 'relative',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                    }} onClick={e => e.stopPropagation()}>

                        <button
                            onClick={closeApp}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#999',
                                fontSize: '20px'
                            }}
                        >
                            <FaTimes />
                        </button>

                        <h2 style={{ marginBottom: '8px' }}>{selectedApp.name}</h2>
                        <p style={{ color: '#666', marginBottom: '24px' }}>{selectedApp.description}</p>

                        <form onSubmit={executeWorkflow}>
                            {selectedApp.inputFields.map(field => (
                                <div key={field.name} style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, fontSize: '14px' }}>
                                        {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                                    </label>

                                    {field.type === 'textarea' ? (
                                        <textarea
                                            value={inputs[field.name] || ''}
                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            rows={6}
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                                fontFamily: 'monospace',
                                                fontSize: '13px',
                                                resize: 'vertical',
                                                minHeight: '100px'
                                            }}
                                        />
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            value={inputs[field.name] || ''}
                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                borderRadius: '8px',
                                                border: '1px solid #ddd',
                                            }}
                                        />
                                    )}
                                </div>
                            ))}

                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    style={{
                                        backgroundColor: '#000',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: '8px',
                                        fontWeight: 500,
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        opacity: loading ? 0.7 : 1
                                    }}
                                >
                                    {loading ? <FaSpinner className="spin" /> : <FaPlay />}
                                    {loading ? 'Running...' : 'Run Workflow'}
                                </button>
                            </div>
                        </form>

                        {/* Results Area */}
                        {(result || error) && (
                            <div style={{ marginTop: '32px', borderTop: '1px solid #eee', paddingTop: '24px' }}>
                                <h4 style={{ marginBottom: '12px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.5px', color: '#999' }}>
                                    Output
                                </h4>

                                {error && (
                                    <div style={{
                                        padding: '12px',
                                        backgroundColor: '#FFF2F0',
                                        border: '1px solid #FFCCC7',
                                        borderRadius: '8px',
                                        color: '#CF1322',
                                        display: 'flex',
                                        alignItems: 'start',
                                        gap: '10px'
                                    }}>
                                        <FaExclamationTriangle style={{ marginTop: '3px' }} />
                                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{error}</pre>
                                    </div>
                                )}

                                {result && (
                                    <div style={{ position: 'relative' }}>
                                        <div style={{
                                            backgroundColor: '#F8F9FA',
                                            padding: '16px',
                                            borderRadius: '8px',
                                            overflowX: 'auto',
                                            border: '1px solid #E9ECEF'
                                        }}>
                                            <pre style={{ margin: 0, fontSize: '13px', fontFamily: 'monospace' }}>
                                                {JSON.stringify(result, null, 2)}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            )}
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

export default MiniApps;
