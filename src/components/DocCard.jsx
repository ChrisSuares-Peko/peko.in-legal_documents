import React, { useState } from 'react';
import { C } from '../constants/colors';
import { IcoDownload } from './Icons';

function DocSvgIcon({ hovered }) {
  const stroke    = hovered ? '#E83838' : '#CCCCCC';
  const foldFill  = hovered ? 'rgba(232,56,56,0.06)' : '#EBEBEB';
  const lineColor = hovered ? '#E83838' : '#CCCCCC';

  return (
    <svg
      width="38"
      height="46"
      viewBox="0 0 38 46"
      fill="none"
      style={{ opacity: hovered ? 1 : 0.45, transition: 'opacity 0.18s' }}
    >
      <path
        d="M4 0 H26 L36 10 V44 A2 2 0 0 1 34 46 H4 A2 2 0 0 1 2 44 V2 A2 2 0 0 1 4 0Z"
        fill="white"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <path
        d="M26 0 L26 10 L36 10"
        fill={foldFill}
        stroke={stroke}
        strokeWidth="1.5"
      />
      <rect x="7" y="18" width="18" height="2" rx="1" fill={lineColor} />
      <rect x="7" y="23" width="18" height="2" rx="1" fill={lineColor} />
      <rect x="7" y="28" width="18" height="2" rx="1" fill={lineColor} />
      <rect x="7" y="33" width="12" height="2" rx="1" fill={lineColor} />
    </svg>
  );
}

export default function DocCard({ name, catBg, onClick }) {
  const [hovered,   setHovered]   = useState(false);
  const [dlHovered, setDlHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height: 130,
        background: hovered ? catBg : '#F3F4F6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        transition: 'background 0.18s',
        borderBottom: `1px solid ${hovered ? 'rgba(232,56,56,0.15)' : C.border}`,
      }}>
        <DocSvgIcon hovered={hovered} />
        <div style={{
          background: hovered ? C.red : C.text,
          color: '#fff',
          fontSize: 9,
          fontWeight: 700,
          borderRadius: 4,
          padding: '2px 7px',
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          transition: 'background 0.18s',
        }}>
          DOC
        </div>
      </div>

      {/* Name + download */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 12px',
        gap: 6,
        minHeight: 52,
      }}>
        <div style={{
          flex: 1,
          fontSize: 13,
          fontWeight: 500,
          color: C.text,
          lineHeight: 1.35,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minWidth: 0,
        }}>
          {name}
        </div>
        <button
          onClick={e => e.stopPropagation()}
          onMouseEnter={() => setDlHovered(true)}
          onMouseLeave={() => setDlHovered(false)}
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: 'none',
            background: dlHovered ? C.redLight : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.18s',
            transform: dlHovered ? 'scale(1.1)' : 'scale(1)',
            outline: 'none',
            padding: 0,
          }}
        >
          <IcoDownload c={dlHovered ? C.red : C.muted} s={14} />
        </button>
      </div>
    </div>
  );
}
