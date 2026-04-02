import { useState } from 'react';
import { IcoDownload } from './Icons';

export default function DocCard({ name, theme: th, onClick, onDownload }) {
  const [hov, setHov] = useState(false);

  const thumbBg  = hov ? `${th.accent}28` : `${th.accent}14`;
  const cardBdr  = hov ? th.accent        : `${th.accent}50`;
  const cardShdw = hov
    ? `0 6px 24px ${th.accent}30`
    : `0 1px 6px ${th.accent}18`;

  return (
    <div
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
      {/* Thumbnail */}
      <div
        onClick={onClick}
        style={{
          height: 120,
          background: thumbBg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transition: 'background 0.18s',
          flexShrink: 0,
        }}
      >
        <svg
          width="38" height="46" viewBox="0 0 38 46" fill="none"
          style={{ opacity: hov ? 1 : 0.55, transition: 'opacity 0.18s' }}
        >
          <rect x="1" y="1" width="36" height="44" rx="5" fill="white" stroke={th.accent} strokeWidth="1.5" />
          <path d="M24 1v11h12" stroke={th.accent} strokeWidth="1.5" fill="none" />
          <rect x="7"  y="18" width="14" height="2" rx="1" fill={th.accent} opacity={hov ? 1 : 0.5} />
          <rect x="7"  y="23" width="22" height="2" rx="1" fill={th.accent} opacity={hov ? 1 : 0.5} />
          <rect x="7"  y="28" width="18" height="2" rx="1" fill={th.accent} opacity={hov ? 1 : 0.5} />
          <rect x="7"  y="33" width="10" height="2" rx="1" fill={th.accent} opacity={hov ? 1 : 0.5} />
        </svg>
        <div style={{
          background: th.accent,
          color: '#fff',
          fontSize: 10,
          fontWeight: 700,
          padding: '3px 10px',
          borderRadius: 4,
          letterSpacing: 0.6,
          opacity: hov ? 1 : 0.75,
          transition: 'opacity 0.18s',
        }}>
          DOC
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: `${th.accent}25` }} />

      {/* Footer */}
      <div style={{
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        flex: 1,
        background: hov ? `${th.accent}10` : 'transparent',
        transition: 'background 0.18s',
      }}>
        <span
          onClick={onClick}
          style={{
            flex: 1,
            fontSize: 13,
            fontWeight: 500,
            color: '#1A1A1A',
            lineHeight: 1.45,
          }}
        >
          {name}
        </span>
        <button
          onClick={e => { e.stopPropagation(); onDownload(); }}
          onMouseEnter={e => {
            e.currentTarget.style.background = `${th.accent}20`;
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            transition: 'all 0.15s',
            padding: 0,
            outline: 'none',
          }}
        >
          <IcoDownload c={th.accent} s={14} />
        </button>
      </div>
    </div>
  );
}
