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
        border: `1.5px solid ${hovered ? C.red : C.border}`,
        boxShadow: hovered
          ? '0 4px 20px rgba(232,56,56,0.10)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'all 0.18s',
      }}
    >
      {/* Colored band */}
      <div style={{
        height: 72,
        background: hovered ? cat.bg : '#F3F4F6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        transition: 'background 0.18s',
        borderBottom: `1px solid ${hovered ? 'rgba(232,56,56,0.15)' : C.border}`,
      }}>
        <span style={{
          fontSize: 28,
          display: 'inline-block',
          transition: 'transform 0.18s',
          transform: hovered ? 'scale(1.12)' : 'scale(1)',
        }}>
          {cat.icon}
        </span>
        <div style={{
          background: hovered ? C.red : C.text,
          color: '#fff',
          fontSize: 11,
          fontWeight: 700,
          borderRadius: 20,
          padding: '3px 8px',
          transition: 'background 0.18s',
        }}>
          {cat.docs.length}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{
          fontSize: 14,
          fontWeight: 700,
          color: C.text,
          lineHeight: 1.3,
          marginBottom: 8,
        }}>
          {cat.name}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 12, color: C.muted }}>{cat.docs.length} Templates</span>
          <span style={{
            fontSize: 12,
            color: hovered ? C.red : C.muted,
            fontWeight: 500,
            transition: 'color 0.18s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
          }}>
            View all
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.18s',
              transform: hovered ? 'translateX(2px)' : 'translateX(0)',
            }}>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
