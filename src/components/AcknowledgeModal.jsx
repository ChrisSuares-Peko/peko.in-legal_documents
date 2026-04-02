import React, { useState, useEffect } from 'react';
import { DISCLAIMER } from '../constants/data';
import { IcoShield, IcoCheck, IcoDownload } from './Icons';

export default function AcknowledgeModal({ docName, accentColor, grad, onConfirm, onClose }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(26,26,26,0.55)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: 'min(520px, 94vw)',
          borderRadius: 20,
          background: '#FFFFFF',
          boxShadow: '0 20px 64px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Accent stripe */}
        <div style={{ height: 4, background: grad }} />

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px 16px',
          borderBottom: '1px solid #EBEBEB',
          gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${accentColor}15`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <IcoShield c={accentColor} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>
                Before You Download
              </div>
              <div style={{
                fontSize: 12, color: '#8A8A8A', marginTop: 2,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {docName}
              </div>
            </div>
          </div>
          <CloseBtn onClick={onClose} />
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px' }}>

          {/* Disclaimer scroll box */}
          <div style={{
            background: `${accentColor}08`,
            border: `1px solid ${accentColor}25`,
            borderRadius: 10,
            padding: '14px 16px',
            marginBottom: 18,
            maxHeight: 200,
            overflowY: 'auto',
          }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: accentColor,
              marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.4,
            }}>
              Legal Disclaimer
            </div>
            <div style={{ fontSize: 12, color: '#1A1A1A', lineHeight: 1.7, opacity: 0.85 }}>
              {DISCLAIMER}
            </div>
          </div>

          {/* Acknowledgement checkbox row */}
          <div
            onClick={() => setChecked(v => !v)}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 12,
              cursor: 'pointer', padding: '10px 14px', borderRadius: 10,
              border: `1.5px solid ${checked ? accentColor : '#EBEBEB'}`,
              background: checked ? `${accentColor}08` : '#FFFFFF',
              transition: 'all 0.15s',
            }}
          >
            {/* Custom checkbox */}
            <div style={{
              width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
              border: `2px solid ${checked ? accentColor : '#C8C8C8'}`,
              background: checked ? accentColor : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s', color: '#fff',
            }}>
              {checked && <IcoCheck />}
            </div>

            {/* Label */}
            <div style={{ fontSize: 13, color: '#1A1A1A', lineHeight: 1.55 }}>
              I have read and understood the disclaimer. I acknowledge that this template does not constitute legal advice and I will seek independent legal counsel before relying on it.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '0 24px 20px',
          display: 'flex', gap: 10, justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{
              border: '1.5px solid #EBEBEB', borderRadius: 10,
              background: '#FFFFFF', color: '#8A8A8A',
              fontWeight: 600, cursor: 'pointer',
              padding: '9px 20px', fontSize: 14,
              transition: 'all 0.15s', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A1A1A'; e.currentTarget.style.color = '#1A1A1A'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#EBEBEB'; e.currentTarget.style.color = '#8A8A8A'; }}
          >
            Cancel
          </button>

          <button
            onClick={() => { if (checked) onConfirm(); }}
            disabled={!checked}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              border: 'none', borderRadius: 10,
              background: checked ? grad : '#F3F4F6',
              color: checked ? '#fff' : '#8A8A8A',
              fontWeight: 600,
              cursor: checked ? 'pointer' : 'not-allowed',
              padding: '9px 20px', fontSize: 14,
              boxShadow: checked ? `0 2px 8px ${accentColor}40` : 'none',
              transition: 'all 0.18s', fontFamily: 'inherit',
            }}
            onMouseEnter={e => { if (checked) e.currentTarget.style.opacity = '0.88'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            <IcoDownload c={checked ? '#fff' : '#8A8A8A'} s={14} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

function CloseBtn({ onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        width: 28, height: 28, borderRadius: 6,
        border: '1px solid #EBEBEB',
        background: h ? '#F3F4F6' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', padding: 0, outline: 'none',
        transition: 'background 0.15s', flexShrink: 0,
        fontSize: 16, color: '#8A8A8A', fontFamily: 'inherit',
      }}
    >
      ×
    </button>
  );
}
