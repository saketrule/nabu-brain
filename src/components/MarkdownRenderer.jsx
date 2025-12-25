import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';

const MarkdownRenderer = () => {
    const { slug } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Dynamic import of markdown content
                // Note: Vite needs explicit literal strings for glob/imports usually, 
                // but we can assume the file exists based on the slug for now.
                // However, standard dynamic import with variables is tricky in Vite without glob.
                // A better approach for this scale is to use import.meta.glob

                const modules = import.meta.glob('/src/content/*.md', { query: '?raw', import: 'default' });
                const path = `/src/content/${slug}.md`;

                if (modules[path]) {
                    const mod = await modules[path]();
                    setContent(mod);
                } else {
                    console.error('File not found:', path);
                    setContent('# 404 Not Found\nDocument not found.');
                }

            } catch (error) {
                console.error('Error loading markdown:', error);
                setContent('# Error\nFailed to load content.');
            }
        };

        loadContent();
    }, [slug]);

    return (
        <div className="markdown-content" style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px',
            color: '#333',
            lineHeight: '1.6'
        }}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }} {...props} />,
                    h2: ({ node, ...props }) => <h2 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
                    h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem' }} {...props} />,
                    p: ({ node, ...props }) => <p style={{ marginBottom: '1rem' }} {...props} />,
                    ul: ({ node, ...props }) => <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
                    li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                    img: ({ node, ...props }) => <img style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', margin: '20px 0' }} {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
