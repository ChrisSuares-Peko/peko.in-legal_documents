import React, { useState } from 'react';
import { C } from '../constants/colors';
import { NAV_ITEMS } from '../constants/data';
import { IcoClose } from './Icons';

const ACTIVE_ITEM = 'More Services';

function NavItem({ label, onClose, isMobile }) {
  const [hovered, setHovered] = useState(false);
  const active = label === ACTIVE_ITEM;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={active ? undefined : (isMobile ? onClose : undefined)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 16px',
        cursor: active ? 'default' : 'pointer',
        background: active ? C.redLight : hovered ? C.pageBg : 'transparent',
        color: active ? C.red : hovered ? C.text : C.muted,
        fontWeight: active ? 600 : 400,
        fontSize: 13,
        transition: 'all 0.18s',
        userSelect: 'none',
      }}
    >
      <div style={{
        width: 16,
        height: 16,
        borderRadius: 3,
        background: active ? C.redGrad : '#E2E2E2',
        flexShrink: 0,
        transition: 'all 0.18s',
      }} />
      {label}
    </div>
  );
}

export default function Sidebar({ isMobile, isOpen, onClose }) {
  return (
    <div style={{
      width: 210,
      height: '100vh',
      background: C.cardBg,
      borderRight: `1px solid ${C.border}`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0,
      /* Mobile: fixed overlay that slides in from left */
      ...(isMobile ? {
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 300,
        transform: isOpen ? 'translateX(0)' : 'translateX(-210px)',
        transition: 'transform 0.25s ease',
        boxShadow: isOpen ? '4px 0 24px rgba(0,0,0,0.15)' : 'none',
      } : {
        position: 'relative',
      }),
    }}>
      {/* Logo row — with close button on mobile */}
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
        <span style={{ fontWeight: 800, fontSize: 16, color: C.text, flex: 1 }}>Peko</span>
        {isMobile && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 4,
              outline: 'none',
              borderRadius: 6,
            }}
          >
            <IcoClose c={C.muted} s={16} />
          </button>
        )}
      </div>

      {/* Nav list */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {NAV_ITEMS.map(item => (
          <NavItem key={item} label={item} isMobile={isMobile} onClose={onClose} />
        ))}
      </nav>
    </div>
  );
}
