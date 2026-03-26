import React, { useState } from 'react';
import { C } from '../constants/colors';
import { CATEGORIES } from '../constants/data';
import { CloseIcon } from './Icons';

const NAV_PANEL_ITEMS = [
  { id: "categories", emoji: "🗂️", label: "Categories" },
  { id: "documents",  emoji: "📄", label: "Documents" },
  { id: "preview",   emoji: "👁️", label: "Document Preview" },
];

const totalTemplates = CATEGORIES.reduce((sum, cat) => sum + cat.docs.length, 0);

function NavPanelItem({ item, isActive, onNavigate, onClose }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => { onNavigate(item.id); onClose(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 14px',
        cursor: 'pointer',
        background: isActive ? C.redLight : hovered ? C.subtle : 'transparent',
        color: isActive ? C.red : C.text,
        fontWeight: isActive ? 600 : 400,
        fontSize: 13,
        transition: 'all 0.15s',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <span style={{ fontSize: 15 }}>{item.emoji}</span>
      <span style={{ flex: 1 }}>{item.label}</span>
      {isActive && (
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
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 200,
      background: C.cardBg,
      borderLeft: `1px solid ${C.border}`,
      boxShadow: '-4px 0 24px rgba(0,0,0,0.10)',
      zIndex: 200,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '14px 14px 12px',
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
          fontWeight: 800,
          fontSize: 11,
          flexShrink: 0,
        }}>P</div>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.text, flex: 1 }}>Navigator</span>
        <button
          onClick={onClose}
          style={{
            width: 24,
            height: 24,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            padding: 0,
            outline: 'none',
          }}
        >
          <CloseIcon c={C.muted} s={16} />
        </button>
      </div>

      {/* Section label */}
      <div style={{
        padding: '12px 14px 4px',
        fontSize: 11,
        fontWeight: 500,
        color: C.muted,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        Legal Templates
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {NAV_PANEL_ITEMS.map((item) => (
          <NavPanelItem
            key={item.id}
            item={item}
            isActive={screen === item.id}
            onNavigate={onNavigate}
            onClose={onClose}
          />
        ))}
      </div>

      {/* Footer stats */}
      <div style={{
        padding: '12px 14px',
        borderTop: `1px solid ${C.border}`,
        fontSize: 11,
        color: C.muted,
        lineHeight: 1.6,
        flexShrink: 0,
      }}>
        <div>{CATEGORIES.length} Categories</div>
        <div>{totalTemplates} Templates</div>
      </div>
    </div>
  );
}
