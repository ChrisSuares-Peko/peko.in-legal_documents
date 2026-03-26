import React, { useEffect, useState } from 'react';
import { C } from '../constants/colors';
import { IcoClose, IcoDownload } from './Icons';
import DocPreviewPage from './DocPreviewPage';
import { useBreakpoint } from '../hooks/useBreakpoint';

/* ── Sub-components ─────────────────────────────────────────────────── */

function ZoomStepButton({ onClick, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 30,
        height: 30,
        border: 'none',
        background: hovered ? C.subtle : 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 400,
        color: C.text,
        outline: 'none',
        transition: 'background 0.15s',
        padding: 0,
        fontFamily: 'inherit',
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}

function ResetButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: 30,
        padding: '0 10px',
        borderRadius: 8,
        border: `1px solid ${hovered ? C.red : C.border}`,
        background: 'transparent',
        color: hovered ? C.red : C.muted,
        fontSize: 11,
        fontWeight: 600,
        cursor: 'pointer',
        outline: 'none',
        transition: 'all 0.15s',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
    >
      Reset
    </button>
  );
}

function CloseButton({ onClose }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        background: hovered ? C.subtle : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        transition: 'background 0.15s',
        flexShrink: 0,
      }}
    >
      <IcoClose c={C.muted} s={14} />
    </button>
  );
}

function UseTemplateButton({ isMobile }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: isMobile ? '8px 14px' : '9px 20px',
        borderRadius: 10,
        border: `1.5px solid ${hovered ? C.text : C.border}`,
        background: C.cardBg,
        color: hovered ? C.text : C.muted,
        fontSize: isMobile ? 13 : 14,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.15s',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        outline: 'none',
        flex: isMobile ? 1 : 'none',
      }}
    >
      Use Template
    </button>
  );
}

function DownloadButton({ isMobile }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: isMobile ? '8px 14px' : '9px 20px',
        borderRadius: 10,
        border: 'none',
        background: C.redGrad,
        boxShadow: '0 2px 8px rgba(200,40,40,0.25)',
        color: '#fff',
        fontSize: isMobile ? 13 : 14,
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        opacity: hovered ? 0.88 : 1,
        transition: 'opacity 0.15s',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        outline: 'none',
        flex: isMobile ? 1 : 'none',
      }}
    >
      <IcoDownload c="#fff" s={15} />
      Download
    </button>
  );
}

/* ── Main modal ─────────────────────────────────────────────────────── */

export default function PreviewModal({ docName, cat, onClose }) {
  const [zoom, setZoom]  = useState(85);
  const { isMobile }     = useBreakpoint();

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Auto-reduce zoom on mobile for better fit
  useEffect(() => {
    setZoom(isMobile ? 60 : 85);
  }, [isMobile]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
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
          width: isMobile ? '100%' : 'min(900px, 96vw)',
          height: isMobile ? '92vh' : 'min(92vh, 860px)',
          borderRadius: isMobile ? '20px 20px 0 0' : 20,
          background: C.cardBg,
          boxShadow: '0 20px 64px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '12px 16px' : '14px 22px',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
          gap: 10,
          flexWrap: 'wrap',
        }}>
          {/* Category icon tile */}
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: cat.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            flexShrink: 0,
          }}>
            {cat.icon}
          </div>

          {/* Doc info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: isMobile ? 13 : 14,
              fontWeight: 700,
              color: C.text,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {docName}
            </div>
            {!isMobile && (
              <div style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>
                {cat.name} · DOCX
              </div>
            )}
          </div>

          {/* Zoom control group */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <ZoomStepButton onClick={() => setZoom(z => Math.max(50, z - 10))}>−</ZoomStepButton>
            <div style={{
              width: 46,
              height: 30,
              borderLeft: `1px solid ${C.border}`,
              borderRight: `1px solid ${C.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 600,
              color: C.text,
              userSelect: 'none',
            }}>
              {zoom}%
            </div>
            <ZoomStepButton onClick={() => setZoom(z => Math.min(150, z + 10))}>+</ZoomStepButton>
          </div>

          {!isMobile && <ResetButton onClick={() => setZoom(85)} />}
          <CloseButton onClose={onClose} />
        </div>

        {/* ── A4 Preview area ── */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          background: '#404040',
          padding: isMobile ? 12 : 24,
          WebkitOverflowScrolling: 'touch',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 595,
              minWidth: 595,
              boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
              overflow: 'hidden',
            }}>
              <DocPreviewPage zoom={zoom} />
            </div>
          </div>
        </div>

        {/* ── Info strip ── */}
        <div style={{
          background: C.pageBg,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: isMobile ? '10px 16px' : '10px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 12 : 24,
          flexShrink: 0,
          flexWrap: 'wrap',
        }}>
          {(isMobile
            ? [{ label: 'Format', val: 'DOCX / PDF' }, { label: 'Jurisdiction', val: 'India' }]
            : [
                { label: 'Format',       val: 'DOCX / PDF' },
                { label: 'Language',     val: 'English' },
                { label: 'Jurisdiction', val: 'India' },
                { label: 'Last Updated', val: 'Jan 2025' },
              ]
          ).map(({ label, val }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{val}</span>
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              background: '#DCFCE7',
              color: '#16A34A',
              fontSize: 11,
              fontWeight: 700,
              borderRadius: 20,
              padding: '2px 10px',
            }}>Free</span>
            {!isMobile && (
              <span style={{ fontSize: 12, color: C.muted }}>Instant download</span>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: isMobile ? '12px 16px' : '14px 22px',
          display: 'flex',
          justifyContent: isMobile ? 'stretch' : 'flex-end',
          gap: 10,
          flexShrink: 0,
        }}>
          <UseTemplateButton isMobile={isMobile} />
          <DownloadButton isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}
