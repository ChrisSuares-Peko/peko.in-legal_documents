import React, { useState } from 'react';
import { C } from '../constants/colors';

function BreadcrumbItem({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onClick={item.onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: C.muted,
        cursor: item.onClick ? 'pointer' : 'default',
        textDecoration: item.onClick && hovered ? 'underline' : 'none',
        transition: 'all 0.15s',
      }}
    >
      {item.label}
    </span>
  );
}

export default function Breadcrumb({ items }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, flexWrap: 'wrap', gap: 2 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <span style={{ color: C.muted, opacity: 0.4, margin: '0 6px' }}>›</span>
            )}
            {isLast ? (
              <span style={{ color: C.red, fontWeight: 500 }}>{item.label}</span>
            ) : (
              <BreadcrumbItem item={item} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
