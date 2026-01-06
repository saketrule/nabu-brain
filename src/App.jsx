import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Sidebar from './components/layout/Sidebar'
import Login from './pages/Login'
import LinkCard from './components/LinkCard'
import DragDropUpload from './components/DragDropUpload'
import MarkdownRenderer from './components/MarkdownRenderer'
import MiniApps from './pages/MiniApps'
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([
    { id: 1, title: 'Google', url: 'https://google.com' },
    { id: 2, title: 'GitHub', url: 'https://github.com' },
    { id: 3, title: 'Dribbble', url: 'https://dribbble.com' },
    { id: 4, title: 'Figma', url: 'https://figma.com' },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = (id) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleUpload = (newLink) => {
    setLinks([...links, newLink]);
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="layout">
      <Sidebar user={user} onLogout={() => auth.signOut()} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <header style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 600 }}>Displai x Nabu Brain</h2>
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
          <Route path="/apps" element={<MiniApps />} />
          <Route path="/p/:slug" element={<MarkdownRenderer />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
