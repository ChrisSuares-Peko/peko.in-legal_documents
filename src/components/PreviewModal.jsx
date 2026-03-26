import React, { useEffect, useRef, useState } from 'react';
import { C } from '../constants/colors';
import { IcoClose, IcoDownload } from './Icons';
import DocPreviewPage from './DocPreviewPage';
import { DOC_PAGES, THEMES } from '../constants/data';
import { useBreakpoint } from '../hooks/useBreakpoint';

/* ── Inline icons ────────────────────────────────────────────────────── */

const IcoPan = ({ active }) => (
  <svg width="15" height="15" fill="none" stroke={active ? '#E83838' : '#8A8A8A'} strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 11V8a2 2 0 0 0-4 0v3" />
    <path d="M14 11V6a2 2 0 0 0-4 0v5" />
    <path d="M10 11V8a2 2 0 0 0-4 0v6a8 8 0 0 0 16 0v-5a2 2 0 0 0-4 0v3" />
  </svg>
);

const IcoChevLeft = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IcoChevRight2 = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ── Button atoms ────────────────────────────────────────────────────── */

function ZoomStepBtn({ onClick, children }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: 30, height: 30, border: 'none',
        background: h ? C.subtle : 'transparent',
        cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 18, color: C.text,
        outline: 'none', transition: 'background 0.15s', padding: 0,
        fontFamily: 'inherit', lineHeight: 1,
      }}
    >{children}</button>
  );
}

function ResetBtn({ onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        height: 30, padding: '0 10px', borderRadius: 8,
        border: `1px solid ${h ? C.red : C.border}`,
        background: 'transparent', color: h ? C.red : C.muted,
        fontSize: 11, fontWeight: 600, cursor: 'pointer',
        outline: 'none', transition: 'all 0.15s', fontFamily: 'inherit',
        whiteSpace: 'nowrap', flexShrink: 0,
      }}
    >Reset</button>
  );
}

function PanToggleBtn({ active, onClick, isMobile }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        height: 30, padding: '0 10px', borderRadius: 8,
        border: `1px solid ${active ? C.red : C.border}`,
        background: active ? C.redLight : 'transparent',
        color: active ? C.red : h ? C.text : C.muted,
        fontSize: 11, fontWeight: 600, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 5,
        outline: 'none', transition: 'all 0.15s', fontFamily: 'inherit',
        whiteSpace: 'nowrap', flexShrink: 0,
      }}
    >
      <IcoPan active={active} />
      {!isMobile && 'Pan'}
    </button>
  );
}

function NavPageBtn({ onClick, disabled, children }) {
  const [h, setH] = useState(false);
  const active = !disabled && h;
  return (
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: 28, height: 28, borderRadius: 7,
        border: `1px solid ${active ? C.red : C.border}`,
        background: 'transparent', color: active ? C.red : C.muted,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.3 : 1,
        transition: 'all 0.18s', outline: 'none', padding: 0, flexShrink: 0,
      }}
    >{children}</button>
  );
}

function CloseBtn({ onClose }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClose} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: 30, height: 30, borderRadius: 8,
        border: `1px solid ${C.border}`,
        background: h ? C.subtle : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', padding: 0, outline: 'none',
        transition: 'background 0.15s', flexShrink: 0,
      }}
    >
      <IcoClose c={C.muted} s={14} />
    </button>
  );
}

function DownloadBtn({ isMobile, grad }) {
  const [h, setH] = useState(false);
  return (
    <button onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding: isMobile ? '9px 20px' : '10px 24px',
        borderRadius: 10, border: 'none',
        background: grad,
        boxShadow: '0 2px 8px rgba(0,0,0,0.20)',
        color: '#fff', fontSize: 14, fontWeight: 700,
        cursor: 'pointer', display: 'flex', alignItems: 'center',
        gap: 7, opacity: h ? 0.88 : 1,
        transition: 'opacity 0.15s', fontFamily: 'inherit',
        whiteSpace: 'nowrap', outline: 'none',
        ...(isMobile ? { flex: 1, justifyContent: 'center' } : {}),
      }}
    >
      <IcoDownload c="#fff" s={15} />
      Download
    </button>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */

export default function PreviewModal({ docName, cat, onClose }) {
  const { isMobile } = useBreakpoint();
  const th    = THEMES[cat.id];
  const total = DOC_PAGES.length;

  const [zoom,      setZoom]      = useState(100);
  const [panMode,   setPanMode]   = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [pan,       setPan]       = useState({ x: 0, y: 0 });
  const [page,      setPage]      = useState(0);

  const panStartRef = useRef(null);

  useEffect(() => {
    setPage(0); setPan({ x: 0, y: 0 }); setZoom(isMobile ? 60 : 100);
    setPanMode(false);
  }, [docName]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setZoom(z => isMobile ? Math.min(z, 70) : z);
  }, [isMobile]);

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const handleReset = () => { setZoom(100); setPan({ x: 0, y: 0 }); };
  const goPage  = dir => { setPage(p => Math.min(total - 1, Math.max(0, p + dir))); setPan({ x: 0, y: 0 }); };
  const goToPage = i  => { setPage(i); setPan({ x: 0, y: 0 }); };

  const onMD = e => {
    if (!panMode) return;
    panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    setIsPanning(true);
    e.preventDefault();
  };
  const onMM = e => {
    if (!isPanning || !panStartRef.current) return;
    setPan({ x: e.clientX - panStartRef.current.x, y: e.clientY - panStartRef.current.y });
  };
  const onMU = () => { setIsPanning(false); panStartRef.current = null; };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(26,26,26,0.55)',
        zIndex: 1000,
        display: 'flex',
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: isMobile ? 0 : '16px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: isMobile ? '100%' : 'min(940px, 96vw)',
          height: isMobile ? '92vh' : 'min(93vh, 880px)',
          borderRadius: isMobile ? '20px 20px 0 0' : 20,
          background: C.cardBg,
          boxShadow: '0 20px 64px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* ── 1. Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: isMobile ? '12px 14px' : '13px 20px',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0, gap: 10, flexWrap: 'wrap',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: cat.bg, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 16, flexShrink: 0,
          }}>
            {cat.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 14, fontWeight: 700, color: C.text,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{docName}</div>
            {!isMobile && (
              <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>
                {cat.name} · DOCX
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <PanToggleBtn active={panMode} onClick={() => setPanMode(v => !v)} isMobile={isMobile} />
            <div style={{ width: 1, height: 20, background: C.border }} />
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden',
            }}>
              <ZoomStepBtn onClick={() => setZoom(z => Math.max(50, z - 10))}>−</ZoomStepBtn>
              <div style={{
                width: 48, height: 30,
                borderLeft: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 600, color: C.text, userSelect: 'none',
              }}>{zoom}%</div>
              <ZoomStepBtn onClick={() => setZoom(z => Math.min(200, z + 10))}>+</ZoomStepBtn>
            </div>
            {!isMobile && <ResetBtn onClick={handleReset} />}
            <div style={{ width: 1, height: 20, background: C.border }} />
            <CloseBtn onClose={onClose} />
          </div>
        </div>

        {/* ── 2. A4 Viewport ── */}
        <div
          onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
          style={{
            flex: 1,
            overflow: panMode ? 'hidden' : 'auto',
            background: '#3A3A3A',
            position: 'relative',
            cursor: panMode ? (isPanning ? 'grabbing' : 'grab') : 'default',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div style={{
            position: panMode ? 'absolute' : 'relative',
            top: panMode ? pan.y : 0,
            left: panMode ? `calc(50% + ${pan.x}px)` : 0,
            transform: panMode ? 'translateX(-50%)' : 'none',
            padding: 24,
            display: 'flex',
            justifyContent: panMode ? 'flex-start' : 'center',
            userSelect: 'none',
          }}>
            <div style={{
              transformOrigin: 'top center',
              transform: `scale(${zoom / 100})`,
              transition: 'transform 0.15s ease',
            }}>
              <DocPreviewPage pageIndex={page} />
            </div>
          </div>
        </div>

        {/* ── 3. Pagination strip ── */}
        <div style={{
          height: 46, flexShrink: 0,
          background: '#FFFFFF',
          borderTop: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 10,
          position: 'relative', padding: '0 20px',
        }}>
          <NavPageBtn onClick={() => goPage(-1)} disabled={page === 0}>
            <IcoChevLeft />
          </NavPageBtn>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {DOC_PAGES.map((_, i) => (
              <div key={i} onClick={() => goToPage(i)} style={{
                width: i === page ? 22 : 8,
                height: 8, borderRadius: 20,
                background: i === page ? th.accent : '#CECECE',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }} />
            ))}
          </div>

          <NavPageBtn onClick={() => goPage(1)} disabled={page === total - 1}>
            <IcoChevRight2 />
          </NavPageBtn>

          {!isMobile && (
            <div style={{
              position: 'absolute', right: 20,
              fontSize: 12, color: C.muted,
              fontWeight: 500, whiteSpace: 'nowrap',
            }}>
              Page {page + 1} of {total}
            </div>
          )}
        </div>

        {/* ── 4. Info strip ── */}
        <div style={{
          background: C.pageBg,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: isMobile ? '9px 14px' : '10px 20px',
          display: 'flex', alignItems: 'center',
          gap: isMobile ? 16 : 28,
          flexShrink: 0, flexWrap: 'wrap',
        }}>
          {(isMobile
            ? [{ label: 'FORMAT', val: 'DOCX / PDF' }, { label: 'JURISDICTION', val: 'India' }]
            : [
                { label: 'FORMAT',       val: 'DOCX / PDF' },
                { label: 'LANGUAGE',     val: 'English' },
                { label: 'JURISDICTION', val: 'India' },
                { label: 'LAST UPDATED', val: 'Jan 2025' },
              ]
          ).map(({ label, val }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.4, color: C.muted }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{val}</span>
            </div>
          ))}
        </div>

        {/* ── 5. Footer ── */}
        <div style={{
          padding: isMobile ? '12px 14px' : '13px 20px',
          display: 'flex',
          justifyContent: isMobile ? 'stretch' : 'flex-end',
          flexShrink: 0,
        }}>
          <DownloadBtn isMobile={isMobile} grad={th.grad} />
        </div>
      </div>
    </div>
  );
}
