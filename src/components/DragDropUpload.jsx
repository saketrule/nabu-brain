import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

const DragDropUpload = ({ onUpload }) => {
    const [urlInput, setUrlInput] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            onUpload({
                id: Date.now(),
                title: file.name,
                url: URL.createObjectURL(file)
            });
        }
    }, [onUpload]);

    const handleManualAdd = (e) => {
        e.stopPropagation(); // Prevent dropzone click
        if (!urlInput.trim()) return;

        onUpload({
            id: Date.now(),
            title: 'New Link',
            url: urlInput
        });
        setUrlInput('');
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        noClick: true // Disable click on container to allow clicking input/button
    });

    return (
        <div {...getRootProps()} style={{
            border: '2px dashed var(--border-color)',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            backgroundColor: isDragActive ? '#f0f9ff' : 'var(--card-bg)',
            color: isDragActive ? '#0070f3' : '#666',
            transition: 'all 0.2s',
            marginTop: '40px',
            position: 'relative'
        }}>
            <input {...getInputProps()} />
            <FaCloudUploadAlt size={32} style={{ marginBottom: '16px', color: 'inherit' }} />
            {
                isDragActive ?
                    <p style={{ margin: 0 }}>Drop the files here ...</p> :
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <p style={{ margin: 0 }}>Drag 'n' drop some files here</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>-- OR --</p>

                        <div style={{ display: 'flex', gap: '8px', maxWidth: '300px', width: '100%' }}>
                            <input
                                type="text"
                                placeholder="https://example.com"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid var(--border-color)',
                                    fontSize: '14px'
                                }}
                            />
                            <button
                                onClick={handleManualAdd}
                                style={{
                                    backgroundColor: '#333',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: 500
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
            }
        </div>
    );
};

export default DragDropUpload;
