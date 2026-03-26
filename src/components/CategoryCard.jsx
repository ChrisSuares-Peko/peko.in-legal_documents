import React, { useState } from 'react';
import { C } from '../constants/colors';

export default function CategoryCard({ cat, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.cardBg,
        borderRadius: 14,
        padding: '20px 22px',
        border: `1px solid ${hovered ? '#D0D0D0' : C.border}`,
        boxShadow: hovered
          ? '0 4px 16px rgba(0,0,0,0.08)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        transition: 'all 0.15s',
        userSelect: 'none',
      }}
    >
      {/* Icon tile */}
      <div style={{
        width: 42,
        height: 42,
        borderRadius: 10,
        background: cat.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        marginBottom: 14,
        flexShrink: 0,
      }}>
        {cat.icon}
      </div>

      {/* Category name */}
      <div style={{
        fontSize: 14,
        fontWeight: 700,
        color: C.text,
        lineHeight: 1.35,
        marginBottom: 6,
      }}>
        {cat.name}
      </div>

      {/* Template count */}
      <div style={{ fontSize: 13, color: C.muted }}>
        {cat.docs.length} Templates
      </div>
    </div>
  );
}
