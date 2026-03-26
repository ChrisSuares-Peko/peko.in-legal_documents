import React, { useState } from 'react';
import { C } from '../constants/colors';
import { DownloadIcon } from './Icons';

export default function DocCard({ name, catBg, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [thumbHovered, setThumbHovered] = useState(false);
  const [dlHovered, setDlHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.cardBg,
        borderRadius: 14,
        border: `1px solid ${hovered ? '#D0D0D0' : C.border}`,
        boxShadow: hovered
          ? '0 4px 16px rgba(0,0,0,0.08)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'all 0.15s',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Thumbnail area */}
      <div
        onMouseEnter={() => setThumbHovered(true)}
        onMouseLeave={() => setThumbHovered(false)}
        style={{
          height: 110,
          background: thumbHovered ? catBg : C.subtle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: `1px solid ${C.border}`,
          transition: 'all 0.15s',
          flexShrink: 0,
        }}
      >
        <div style={{
          background: 'rgba(26,26,26,0.82)',
          color: '#fff',
          fontSize: 10,
          fontWeight: 700,
          borderRadius: 4,
          padding: '4px 9px',
          letterSpacing: '0.06em',
        }}>
          DOC
        </div>
      </div>

      {/* Footer row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 12px',
        gap: 8,
        flex: 1,
      }}>
        <span style={{
          fontSize: 13,
          fontWeight: 500,
          color: C.text,
          flex: 1,
          lineHeight: 1.35,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {name}
        </span>

        {/* Download button */}
        <button
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setDlHovered(true)}
          onMouseLeave={() => setDlHovered(false)}
          title="Download"
          style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            border: 'none',
            background: dlHovered ? C.redLight : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.15s',
            padding: 0,
            outline: 'none',
          }}
        >
          <DownloadIcon c={C.red} s={14} />
        </button>
      </div>
    </div>
  );
}
