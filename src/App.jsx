import React, { useState, useCallback, useEffect } from 'react';
import { CATEGORIES, THEMES } from './constants/data';
import { C } from './constants/colors';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import NavPanel from './components/NavPanel';
import PreviewModal from './components/PreviewModal';
import AcknowledgeModal from './components/AcknowledgeModal';
import CategoriesPage from './pages/CategoriesPage';
import DocumentsPage from './pages/DocumentsPage';
import { useBreakpoint } from './hooks/useBreakpoint';

export default function App() {
  const [screen,      setScreen]      = useState('categories');
  const [cat,         setCat]         = useState(null);
  const [modalDoc,    setModalDoc]    = useState(null);
  const [navOpen,     setNavOpen]     = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ackDoc,      setAckDoc]      = useState(null);

  const { isMobile } = useBreakpoint();

  // Auto-close sidebar when returning to desktop
  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const openCat = useCallback((c) => {
    setCat(c);
    setScreen('documents');
    setSidebarOpen(false);
  }, []);

  const goBack = useCallback(() => {
    setScreen('categories');
    setCat(null);
  }, []);

  const openDoc = useCallback((name) => {
    setModalDoc(name);
    setScreen('preview');
  }, []);

  const closeModal = useCallback(() => {
    setScreen('documents');
    setModalDoc(null);
  }, []);

  const triggerDownload = useCallback(name => setAckDoc(name), []);
  const confirmDownload = useCallback(() => { setAckDoc(null); }, []);
  const cancelAck       = useCallback(() => setAckDoc(null), []);

  const handleNavigate = useCallback((id) => {
    if (id === 'categories') {
      setScreen('categories');
      setCat(null);
      setModalDoc(null);
    } else if (id === 'documents') {
      setCat(c => c || CATEGORIES[0]);
      setModalDoc(null);
      setScreen('documents');
    } else if (id === 'preview') {
      const targetCat = cat || CATEGORIES[0];
      setCat(targetCat);
      setModalDoc(prev => prev || targetCat.docs[0]);
      setScreen('preview');
    }
    setNavOpen(false);
  }, [cat]);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: '#F7F7F7',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Mobile sidebar backdrop */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.40)',
            zIndex: 250,
          }}
        />
      )}

      <Sidebar
        isMobile={isMobile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Topbar
          onToggleNav={() => setNavOpen(v => !v)}
          onToggleSidebar={() => setSidebarOpen(v => !v)}
          isMobile={isMobile}
        />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
          {screen === 'categories' && <CategoriesPage onOpen={openCat} />}

          {(screen === 'documents' || screen === 'preview') && cat && (
            <DocumentsPage
              cat={cat}
              onBack={goBack}
              onOpenDoc={openDoc}
              onDownload={triggerDownload}
            />
          )}

          {navOpen && (
            <NavPanel screen={screen} onNavigate={handleNavigate} onClose={() => setNavOpen(false)} />
          )}
        </div>
      </div>

      {screen === 'preview' && modalDoc && cat && (
        <PreviewModal
          docName={modalDoc}
          cat={cat}
          onClose={closeModal}
          onDownload={() => triggerDownload(modalDoc)}
        />
      )}

      {ackDoc && (
        <AcknowledgeModal
          docName={ackDoc}
          accentColor={cat ? THEMES[cat.id].accent : '#E83838'}
          grad={cat ? THEMES[cat.id].grad : 'linear-gradient(135deg,#F76B6B,#C62828)'}
          onConfirm={confirmDownload}
          onClose={cancelAck}
        />
      )}
    </div>
  );
}
