import React, { useState, useCallback } from 'react';
import { CATEGORIES } from './constants/data';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import NavPanel from './components/NavPanel';
import PreviewModal from './components/PreviewModal';
import CategoriesPage from './pages/CategoriesPage';
import DocumentsPage from './pages/DocumentsPage';

export default function App() {
  const [screen, setScreen]     = useState("categories"); // "categories" | "documents" | "preview"
  const [cat, setCat]           = useState(null);          // selected CATEGORY object
  const [modalDoc, setModalDoc] = useState(null);          // previewed doc name string
  const [navOpen, setNavOpen]   = useState(false);         // NavPanel toggle

  const openCat = useCallback((c) => {
    setCat(c);
    setScreen("documents");
  }, []);

  const goBack = useCallback(() => {
    setScreen("categories");
    setCat(null);
  }, []);

  const openDoc = useCallback((name) => {
    setModalDoc(name);
    setScreen("preview");
  }, []);

  const closeModal = useCallback(() => {
    setScreen("documents");
  }, []);

  const handleNavigate = useCallback((id) => {
    if (id === "categories") {
      goBack();
    } else if (id === "documents") {
      // Default to first category if none selected
      if (!cat) setCat(CATEGORIES[0]);
      setScreen("documents");
    } else if (id === "preview") {
      const targetCat = cat || CATEGORIES[0];
      if (!cat) setCat(CATEGORIES[0]);
      setModalDoc((prev) => prev || targetCat.docs[0]);
      setScreen("preview");
    }
    setNavOpen(false);
  }, [cat, goBack]);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: '#F7F7F7',
      overflow: 'hidden',
    }}>
      <Sidebar />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0,
      }}>
        <Topbar onToggleNav={() => setNavOpen((v) => !v)} />

        {/* Content area — position:relative so NavPanel can anchor absolutely */}
        <div style={{
          flex: 1,
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {screen === "categories" && (
            <CategoriesPage onOpen={openCat} />
          )}

          {(screen === "documents" || screen === "preview") && cat && (
            <DocumentsPage cat={cat} onBack={goBack} onOpenDoc={openDoc} />
          )}

          {navOpen && (
            <NavPanel
              screen={screen}
              onNavigate={handleNavigate}
              onClose={() => setNavOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Preview modal rendered at root so it overlays everything */}
      {screen === "preview" && modalDoc && (
        <PreviewModal docName={modalDoc} onClose={closeModal} />
      )}
    </div>
  );
}
