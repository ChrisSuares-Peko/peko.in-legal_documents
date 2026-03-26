import React from 'react';
import { DOC_PAGES } from '../constants/data';

export default function DocPreviewPage({ pageIndex }) {
  const blocks    = DOC_PAGES[pageIndex] || [];
  const isLastPage = pageIndex === DOC_PAGES.length - 1;

  return (
    <div style={{
      width: 595,
      background: '#fff',
      padding: '52px 56px 48px',
      fontFamily: "Georgia, 'Times New Roman', serif",
      color: '#1a1a1a',
      lineHeight: 1.75,
      position: 'relative',
      minHeight: 840,
      boxSizing: 'border-box',
    }}>
      {/* Watermark */}
      <div style={{
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-35deg)',
        fontSize: 60,
        fontWeight: 900,
        color: 'rgba(232,56,56,0.04)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        letterSpacing: 6,
        userSelect: 'none',
      }}>
        TEMPLATE
      </div>

      {/* Blocks */}
      {blocks.map((b, i) => {
        if (b.type === 'title') return (
          <div key={i} style={{
            fontSize: 15, fontWeight: 700, textAlign: 'center',
            marginBottom: 16, letterSpacing: 1.2, textTransform: 'uppercase',
            borderBottom: '1.5px solid #1a1a1a', paddingBottom: 10,
          }}>{b.text}</div>
        );
        if (b.type === 'meta') return (
          <div key={i} style={{
            fontSize: 10.5, color: '#555', marginBottom: 14,
            textAlign: 'center', fontStyle: 'italic',
          }}>{b.text}</div>
        );
        if (b.type === 'section') return (
          <div key={i} style={{
            fontSize: 11.5, fontWeight: 700, textAlign: 'center',
            margin: '18px 0 10px', textTransform: 'uppercase', letterSpacing: 0.6,
          }}>{b.text}</div>
        );
        if (b.type === 'clause') return (
          <div key={i} style={{
            fontSize: 11.5, fontWeight: 700, margin: '18px 0 5px',
            display: 'flex', gap: 5,
          }}>
            <span>{b.num}</span><span>{b.text}</span>
          </div>
        );
        if (b.type === 'bullet') return (
          <div key={i} style={{
            fontSize: 11, color: '#333', paddingLeft: 18, marginBottom: 5,
            display: 'flex', gap: 8,
          }}>
            <span style={{ flexShrink: 0 }}>•</span>
            <span>{b.text}</span>
          </div>
        );
        if (b.type === 'sig') return (
          <div key={i} style={{
            fontSize: 11, marginTop: 20, paddingTop: 14,
            borderTop: '1px solid #ccc', color: '#555', fontStyle: 'italic', marginBottom: 24,
          }}>{b.text}</div>
        );
        // body (default)
        return (
          <div key={i} style={{
            fontSize: 11, color: '#333', marginBottom: 9, textAlign: 'justify',
          }}>{b.text}</div>
        );
      })}

      {/* Signature block — last page only */}
      {isLastPage && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            marginTop: 32,
          }}>
            {['Client', 'Vendor'].map(p => (
              <div key={p}>
                <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 12 }}>
                  For the {p}
                </div>
                <div style={{ fontSize: 11, color: '#555', lineHeight: 2.2 }}>
                  <div>Signature: ___________________</div>
                  <div>Name: ______________________</div>
                  <div>Designation: ________________</div>
                  <div>Date: _______________________</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 36,
            paddingTop: 12,
            borderTop: '1px solid #ddd',
            fontSize: 9,
            color: '#999',
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}>
            Disclaimer: This template is made available for general informational purposes only
            and does not constitute legal, professional, or other advice. No lawyer-client
            relationship is created by use of this template.
          </div>
        </>
      )}

      {/* Page number */}
      <div style={{
        position: 'absolute',
        bottom: 18,
        right: 52,
        fontSize: 9.5,
        color: '#aaa',
        fontFamily: "Inter, -apple-system, sans-serif",
      }}>
        {pageIndex + 1} / {DOC_PAGES.length}
      </div>
    </div>
  );
}
