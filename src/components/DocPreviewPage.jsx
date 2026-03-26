import React from 'react';
import { VENDOR_DOC_CONTENT } from '../constants/data';

function renderBlock(block, i) {
  switch (block.type) {
    case 'title':
      return (
        <div key={i} style={{
          fontSize: 16,
          fontWeight: 700,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          borderBottom: '2px solid #1a1a1a',
          paddingBottom: 10,
          marginBottom: 18,
        }}>
          {block.text}
        </div>
      );

    case 'meta':
      return (
        <div key={i} style={{
          fontSize: 11,
          color: '#555',
          textAlign: 'center',
          fontStyle: 'italic',
          marginBottom: 16,
        }}>
          {block.text}
        </div>
      );

    case 'section':
      return (
        <div key={i} style={{
          fontSize: 12,
          fontWeight: 700,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          margin: '16px 0 10px',
        }}>
          {block.text}
        </div>
      );

    case 'clause':
      return (
        <div key={i} style={{
          fontSize: 12,
          fontWeight: 700,
          margin: '18px 0 6px',
          display: 'flex',
          gap: 6,
        }}>
          <span>{block.num}</span>
          <span>{block.text}</span>
        </div>
      );

    case 'bullet':
      return (
        <div key={i} style={{
          fontSize: 11,
          color: '#333',
          paddingLeft: 16,
          marginBottom: 6,
          display: 'flex',
          gap: 8,
        }}>
          <span>•</span>
          <span>{block.text}</span>
        </div>
      );

    case 'body':
      return (
        <div key={i} style={{
          fontSize: 11,
          color: '#333',
          marginBottom: 8,
          textAlign: 'justify',
        }}>
          {block.text}
        </div>
      );

    case 'sig':
      return (
        <div key={i} style={{
          fontSize: 11,
          marginTop: 28,
          paddingTop: 16,
          borderTop: '1px solid #ccc',
          color: '#555',
          fontStyle: 'italic',
        }}>
          {block.text}
        </div>
      );

    default:
      return null;
  }
}

const sigLineStyle = {
  borderBottom: '1px solid #999',
  width: '80%',
  height: 24,
  marginTop: 16,
  marginBottom: 4,
};

export default function DocPreviewPage({ zoom }) {
  return (
    <div style={{
      transformOrigin: 'top center',
      transform: `scale(${zoom / 100})`,
      width: zoom < 100 ? `${10000 / zoom}%` : '100%',
      transition: 'transform 0.2s ease',
    }}>
      <div style={{
        background: '#fff',
        padding: '48px 52px',
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: '#1a1a1a',
        minHeight: 800,
        lineHeight: 1.7,
        position: 'relative',
      }}>
        {/* Watermark */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-35deg)',
          fontSize: 52,
          fontWeight: 900,
          color: 'rgba(232,56,56,0.05)',
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}>
          TEMPLATE
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {VENDOR_DOC_CONTENT.map((block, i) => renderBlock(block, i))}

          {/* Signature block */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            marginTop: 40,
          }}>
            {['For the Client', 'For the Vendor'].map(label => (
              <div key={label} style={{ fontSize: 11, color: '#333' }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
                <div style={sigLineStyle} />
                <div style={{ fontSize: 10, color: '#888' }}>Signature</div>
                <div style={{ ...sigLineStyle, marginTop: 20 }} />
                <div style={{ fontSize: 10, color: '#888' }}>Name</div>
                <div style={{ ...sigLineStyle, marginTop: 20 }} />
                <div style={{ fontSize: 10, color: '#888' }}>Designation</div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{
            marginTop: 32,
            borderTop: '1px solid #ddd',
            paddingTop: 12,
            fontSize: 9.5,
            color: '#888',
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}>
            Disclaimer: This document is a general template for informational purposes only and does not
            constitute legal advice. Parties are advised to seek independent legal counsel before executing
            this Agreement. Peko Payment Services LLC makes no representations as to the legal sufficiency
            of this template in any particular jurisdiction or for any particular transaction.
          </div>
        </div>
      </div>
    </div>
  );
}
