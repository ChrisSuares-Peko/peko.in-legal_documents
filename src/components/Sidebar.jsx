import React, { useState } from 'react';
import { C } from '../constants/colors';
import { NAV_ITEMS } from '../constants/data';

const ACTIVE_ITEM = "More Services";

export default function Sidebar() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      width: 210,
      minWidth: 210,
      height: '100vh',
      background: C.cardBg,
      borderRight: `1px solid ${C.border}`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '18px 16px 16px',
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
      }}>
        <div style={{
          width: 30,
          height: 30,
          borderRadius: 7,
          background: C.redGrad,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 800,
          fontSize: 14,
          flexShrink: 0,
        }}>P</div>
        <span style={{ fontWeight: 800, fontSize: 16, color: C.text }}>Peko</span>
      </div>

      {/* Nav list */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = item === ACTIVE_ITEM;
          const isHovered = hovered === item && !isActive;
          return (
            <div
              key={item}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 16px',
                cursor: isActive ? 'default' : 'pointer',
                background: isActive ? C.redLight : isHovered ? C.pageBg : 'transparent',
                color: isActive ? C.red : isHovered ? C.text : C.muted,
                fontWeight: isActive ? 600 : 400,
                fontSize: 13,
                transition: 'all 0.15s',
                userSelect: 'none',
              }}
            >
              <div style={{
                width: 16,
                height: 16,
                borderRadius: 3,
                background: isActive ? C.redGrad : '#E2E2E2',
                flexShrink: 0,
                transition: 'all 0.15s',
              }} />
              {item}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
