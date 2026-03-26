import React, { useState } from 'react';
import { C } from '../constants/colors';
import { SearchIcon, BellIcon, MapIcon, LogoutIcon } from './Icons';

export default function Topbar({ onToggleNav }) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);

  return (
    <div style={{
      height: 58,
      background: C.cardBg,
      borderBottom: `1px solid ${C.border}`,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 14,
      flexShrink: 0,
    }}>
      {/* Search bar */}
      <div style={{
        width: 300,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: C.pageBg,
        borderRadius: 10,
        padding: '0 12px',
        height: 36,
        border: `1px solid ${searchFocused ? C.red : 'transparent'}`,
        transition: 'all 0.15s',
        flexShrink: 0,
      }}>
        <SearchIcon c={C.muted} s={15} />
        <input
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search..."
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: 14,
            color: C.text,
            width: '100%',
            fontFamily: 'inherit',
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* Cashback block */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.3 }}>Cashback</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>₹ 2,450</div>
      </div>

      <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />

      {/* Peko Credits block */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.3 }}>Peko Credits</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>₹ 18,200</div>
      </div>

      <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />

      {/* Notification bell */}
      <div style={{ position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
        <BellIcon c={C.muted} s={20} />
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

      {/* Avatar + user info */}
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
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.2, whiteSpace: 'nowrap' }}>
            Sigma Logistics
          </div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.2 }}>Corporate</div>
        </div>
      </div>

      {/* Navigator icon button */}
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
          transition: 'all 0.15s',
          outline: 'none',
          padding: 0,
          flexShrink: 0,
        }}
      >
        <MapIcon c={navHovered ? C.red : C.muted} s={16} />
      </button>

      {/* Logout icon */}
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
          transition: 'all 0.15s',
          outline: 'none',
          padding: 0,
          flexShrink: 0,
        }}
      >
        <LogoutIcon c={logoutHovered ? C.text : C.muted} s={18} />
      </button>
    </div>
  );
}
