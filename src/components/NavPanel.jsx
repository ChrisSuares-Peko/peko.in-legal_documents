import React, { useState } from 'react';
import { C } from '../constants/colors';
import { IcoClose } from './Icons';
import { CATEGORIES } from '../constants/data';

const ITEMS = [
  { id: 'categories', emoji: '🗂️', label: 'Categories' },
  { id: 'documents',  emoji: '📄', label: 'Documents' },
  { id: 'preview',    emoji: '👁️', label: 'Document Preview' },
];

const totalTemplates = CATEGORIES.reduce((s, c) => s + c.docs.length, 0);

function NavPanelItem({ item, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(item.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        borderRadius: 8,
        cursor: 'pointer',
        background: active ? C.redLight : hovered ? C.pageBg : 'transparent',
        color: active ? C.red : C.text,
        fontWeight: active ? 600 : 400,
        fontSize: 13,
        transition: 'all 0.18s',
      }}
    >
      <span style={{ fontSize: 14 }}>{item.emoji}</span>
      <span style={{ flex: 1 }}>{item.label}</span>
      {active && (
        <div style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: C.red,
          flexShrink: 0,
        }} />
      )}
    </div>
  );
}

export default function NavPanel({ screen, onNavigate, onClose }) {
  const activeId = screen === 'preview' ? 'preview' : screen === 'documents' ? 'documents' : 'categories';

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 200,
      zIndex: 200,
      background: C.cardBg,
      borderLeft: `1px solid ${C.border}`,
      boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '14px 12px',
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
      }}>
        <div style={{
          width: 22,
          height: 22,
          borderRadius: 5,
          background: C.redGrad,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 11,
          fontWeight: 800,
          flexShrink: 0,
        }}>P</div>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.text }}>Navigator</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            outline: 'none',
            borderRadius: 6,
          }}
        >
          <IcoClose c={C.muted} s={14} />
        </button>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: C.muted,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          padding: '0 12px',
          marginBottom: 8,
        }}>
          Legal Templates
        </div>
        {ITEMS.map(item => (
          <NavPanelItem
            key={item.id}
            item={item}
            active={activeId === item.id}
            onClick={onNavigate}
          />
        ))}
      </div>

      {/* Footer stats */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: 12, flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>
          <span style={{ fontWeight: 600, color: C.text }}>{CATEGORIES.length}</span> categories
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>
          <span style={{ fontWeight: 600, color: C.text }}>{totalTemplates}</span> templates
        </div>
      </div>
    </div>
  );
}
