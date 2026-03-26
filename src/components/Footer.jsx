import React from 'react';
import { C } from '../constants/colors';
import { FOOTER_LINKS } from '../constants/data';

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
      fontSize: 13,
      color: C.muted,
      flexWrap: 'wrap',
      gap: 12,
    }}>
      <span>© 2024-2026 Peko Payment Services LLC. All Rights Reserved.</span>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {FOOTER_LINKS.map((link) => (
          <FooterLink key={link} label={link} />
        ))}
      </div>
    </div>
  );
}

function FooterLink({ label }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'underline',
        cursor: 'pointer',
        color: hovered ? C.text : C.muted,
        transition: 'all 0.15s',
      }}
    >
      {label}
    </span>
  );
}
