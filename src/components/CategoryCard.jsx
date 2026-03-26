import React, { useState } from 'react';
import { THEMES } from '../constants/data';

export default function CategoryCard({ cat, onClick }) {
  const [hov, setHov] = useState(false);
  const th = THEMES[cat.id];

  const bandBg   = hov ? `${th.accent}28` : th.light;
  const cardBdr  = hov ? th.accent        : `${th.accent}55`;
  const cardShdw = hov
    ? `0 6px 24px ${th.accent}30`
    : `0 1px 6px ${th.accent}18`;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: th.light,
        border: `1.5px solid ${cardBdr}`,
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: cardShdw,
        transition: 'all 0.18s',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top band */}
      <div style={{
        height: 76,
        background: bandBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 18px',
        transition: 'background 0.18s',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Gradient orb */}
        <div style={{
          position: 'absolute',
          right: -8,
          top: -8,
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: th.grad,
          opacity: hov ? 0.18 : 0.10,
          transition: 'opacity 0.18s',
        }} />
        {/* Emoji */}
        <div style={{
          fontSize: 28,
          lineHeight: 1,
          zIndex: 1,
          transition: 'transform 0.18s',
          transform: hov ? 'scale(1.12)' : 'scale(1)',
        }}>
          {cat.icon}
        </div>
        {/* Count badge */}
        <div style={{
          background: th.accent,
          color: '#fff',
          fontSize: 11,
          fontWeight: 700,
          padding: '3px 9px',
          borderRadius: 20,
          zIndex: 1,
        }}>
          {cat.docs.length}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: `${th.accent}25`, transition: 'background 0.18s' }} />

      {/* Body */}
      <div style={{
        padding: '14px 18px 16px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
        background: hov ? `${th.accent}10` : 'transparent',
        transition: 'background 0.18s',
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.35 }}>
          {cat.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 12, color: th.accent, fontWeight: 600, opacity: 0.8 }}>
            {cat.docs.length} Templates
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
            color: th.accent,
          }}>
            View all
            <svg
              width="11" height="11" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              viewBox="0 0 24 24"
              style={{
                transition: 'transform 0.18s',
                transform: hov ? 'translateX(3px)' : 'translateX(0)',
              }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
