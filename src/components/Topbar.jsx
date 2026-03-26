import React, { useState } from 'react';
import { C } from '../constants/colors';
import { IcoSearch, IcoBell, IcoMap, IcoLogout, IcoMenu } from './Icons';

function SearchBar({ isMobile }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flex: isMobile ? 1 : 'none',
      width: isMobile ? undefined : 300,
      height: 36,
      borderRadius: 10,
      background: C.pageBg,
      border: `1px solid ${focused ? C.red : 'transparent'}`,
      padding: '0 12px',
      transition: 'border 0.18s',
      minWidth: 0,
    }}>
      <IcoSearch c={C.muted} s={15} />
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={isMobile ? 'Search...' : 'Search templates, documents...'}
        style={{
          border: 'none',
          background: 'transparent',
          outline: 'none',
          fontSize: 13,
          color: C.text,
          width: '100%',
          fontFamily: 'inherit',
          minWidth: 0,
        }}
      />
    </div>
  );
}

export default function Topbar({ onToggleNav, onToggleSidebar, isMobile }) {
  const [navHovered,    setNavHovered]    = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);

  return (
    <div style={{
      height: 58,
      background: C.cardBg,
      borderBottom: `1px solid ${C.border}`,
      display: 'flex',
      alignItems: 'center',
      padding: `0 ${isMobile ? 12 : 20}px`,
      gap: isMobile ? 8 : 14,
      flexShrink: 0,
    }}>

      {/* Hamburger — mobile only */}
      {isMobile && (
        <button
          onClick={onToggleSidebar}
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            border: 'none',
            background: C.subtle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            outline: 'none',
            flexShrink: 0,
          }}
        >
          <IcoMenu c={C.muted} s={18} />
        </button>
      )}

      {/* Search bar */}
      <SearchBar isMobile={isMobile} />

      {/* Spacer (desktop only — on mobile search has flex:1) */}
      {!isMobile && <div style={{ flex: 1 }} />}

      {/* ── Desktop-only extras ── */}
      {!isMobile && (
        <>
          {/* Cashback */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.3 }}>Cashback</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>Active</div>
          </div>

          <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />

          {/* Peko Credits */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.3 }}>Peko Credits</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>Available</div>
          </div>

          <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />
        </>
      )}

      {/* Bell — always visible */}
      <div style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
        <IcoBell c={C.muted} s={20} />
        <div style={{
          position: 'absolute',
          top: -6,
          right: -8,
          background: C.red,
          color: '#fff',
          fontSize: 9,
          fontWeight: 700,
          borderRadius: 8,
          padding: '1px 4px',
          minWidth: 16,
          textAlign: 'center',
          lineHeight: '14px',
          pointerEvents: 'none',
        }}>31</div>
      </div>

      {/* Avatar + org name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: C.redGrad,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: 14,
          flexShrink: 0,
        }}>S</div>
        {/* Org name — hide on mobile */}
        {!isMobile && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              Sigma Logistics
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.2 }}>Corporate</div>
          </div>
        )}
      </div>

      {/* Navigator button */}
      <button
        onClick={onToggleNav}
        onMouseEnter={() => setNavHovered(true)}
        onMouseLeave={() => setNavHovered(false)}
        title="Navigator"
        style={{
          width: 34,
          height: 34,
          borderRadius: 8,
          border: `1px solid ${navHovered ? C.red : 'transparent'}`,
          background: navHovered ? C.redLight : C.subtle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.18s',
          outline: 'none',
          padding: 0,
          flexShrink: 0,
        }}
      >
        <IcoMap c={navHovered ? C.red : C.muted} s={16} />
      </button>

      {/* Logout — desktop only */}
      {!isMobile && (
        <button
          onMouseEnter={() => setLogoutHovered(true)}
          onMouseLeave={() => setLogoutHovered(false)}
          title="Logout"
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            border: 'none',
            background: logoutHovered ? C.subtle : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.18s',
            outline: 'none',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <IcoLogout c={logoutHovered ? C.text : C.muted} s={18} />
        </button>
      )}
    </div>
  );
}
