import React, { useEffect, useState } from 'react';
import { C } from '../constants/colors';
import { CloseIcon, DownloadIcon } from './Icons';

function UseTemplateButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '9px 18px',
        borderRadius: 10,
        border: `1.5px solid ${C.border}`,
        background: C.cardBg,
        fontSize: 13,
        fontWeight: 600,
        color: C.text,
        cursor: 'pointer',
        opacity: hovered ? 0.88 : 1,
        transition: 'all 0.15s',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
    >
      Use Template
    </button>
  );
}

function DownloadButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '9px 18px',
        borderRadius: 10,
        border: 'none',
        background: C.redGrad,
        boxShadow: '0 2px 8px rgba(200,40,40,0.25)',
        fontSize: 13,
        fontWeight: 600,
        color: '#fff',
        cursor: 'pointer',
        opacity: hovered ? 0.88 : 1,
        transition: 'all 0.15s',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
    >
      <DownloadIcon c="#fff" s={14} />
      Download
    </button>
  );
}

export default function PreviewModal({ docName, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,26,26,0.45)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 620,
          maxWidth: '92vw',
          borderRadius: 20,
          background: C.cardBg,
          boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '18px 20px',
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>
              Document Preview
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Legal Template</div>
          </div>
          <CloseButton onClose={onClose} />
        </div>

        {/* Preview body */}
        <div style={{
          height: 380,
          background: '#2C2C2A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 40, lineHeight: 1 }}>📄</span>
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            color: '#C0C0C0',
            fontSize: 13,
            borderRadius: 8,
            padding: '8px 18px',
          }}>
            No preview available
          </div>
        </div>

        {/* Modal footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          borderTop: `1px solid ${C.border}`,
          gap: 12,
          flexShrink: 0,
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: C.text,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {docName}
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
              DOC · Legal Template
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <UseTemplateButton />
            <DownloadButton />
          </div>
        </div>
      </div>
    </div>
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
        width: 32,
        height: 32,
        borderRadius: 8,
        border: 'none',
        background: hovered ? C.subtle : C.subtle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        transition: 'all 0.15s',
        opacity: hovered ? 0.88 : 1,
        flexShrink: 0,
      }}
    >
      <CloseIcon c={C.muted} s={16} />
    </button>
  );
}
