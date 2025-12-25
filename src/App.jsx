import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Login from './pages/Login'
import LinkCard from './components/LinkCard'
import DragDropUpload from './components/DragDropUpload'
import MarkdownRenderer from './components/MarkdownRenderer'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [links, setLinks] = useState([
    { id: 1, title: 'Google', url: 'https://google.com' },
    { id: 2, title: 'GitHub', url: 'https://github.com' },
    { id: 3, title: 'Dribbble', url: 'https://dribbble.com' },
    { id: 4, title: 'Figma', url: 'https://figma.com' },
  ]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleDelete = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleUpload = (newLink) => {
    setLinks([...links, newLink]);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="layout">
      <Sidebar onLogout={() => setIsAuthenticated(false)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <header style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 600 }}>My Brain</h2>
                <p style={{ color: '#666', marginTop: '8px' }}>Manage your digital resources.</p>
              </header>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
                marginBottom: '40px'
              }}>
                {links.map(link => (
                  <LinkCard
                    key={link.id}
                    title={link.title}
                    url={link.url}
                    onDelete={() => handleDelete(link.id)}
                  />
                ))}
              </div>

              <DragDropUpload onUpload={handleUpload} />
            </>
          } />
          <Route path="/p/:slug" element={<MarkdownRenderer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
