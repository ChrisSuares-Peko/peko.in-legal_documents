import React, { useState } from 'react';
import { C } from '../constants/colors';
import { FOOTER_LINKS } from '../constants/data';

function FooterLink({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? C.text : C.muted,
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

export default function Footer() {
  return (
    <div style={{
      marginTop: 48,
      borderTop: `1px solid ${C.border}`,
      paddingTop: 20,
      paddingBottom: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12,
    }}>
      <span style={{ fontSize: 13, color: C.muted }}>
        &copy; 2024-2026 Peko Payment Services LLC. All Rights Reserved.
      </span>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {FOOTER_LINKS.map(link => <FooterLink key={link} label={link} />)}
      </div>
    </div>
  );
}
