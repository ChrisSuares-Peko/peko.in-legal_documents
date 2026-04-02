import React, { useState } from 'react';
import { C } from '../constants/colors';
import { FOOTER_LINKS, DISCLAIMER } from '../constants/data';
import { IcoShield } from './Icons';

export default function Footer() {
  return (
    <div style={{ marginTop: 40, borderTop: `1px solid #EBEBEB`, paddingTop: 16 }}>

      {/* Disclaimer card */}
      <div style={{
        background: '#FAFAFA',
        border: `1px solid #EBEBEB`,
        borderRadius: 10,
        padding: '12px 16px',
        marginBottom: 16,
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <IcoShield c="#8A8A8A" />
        <div style={{ fontSize: 11, color: '#8A8A8A', lineHeight: 1.6 }}>
          <span style={{ fontWeight: 700 }}>Disclaimer: </span>
          {DISCLAIMER}
        </div>
      </div>

      {/* Copyright row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        flexWrap: 'wrap', fontSize: 13, color: '#8A8A8A', gap: 8,
        paddingBottom: 28,
      }}>
        <span>&copy; 2024-2026 Peko Payment Services LLC. All Rights Reserved.</span>
        <span style={{ display: 'flex', gap: 20 }}>
          {FOOTER_LINKS.map(l => (
            <FooterLink key={l} label={l} />
          ))}
        </span>
      </div>
    </div>
  );
}

function FooterLink({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? C.text : '#8A8A8A',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: 13,
        transition: 'color 0.15s',
      }}
    >
      {label}
    </span>
  );
}
