import React from 'react';
import { C } from '../constants/colors';

export default function Breadcrumb({ items }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, marginBottom: 20 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <span style={{ opacity: 0.4, margin: '0 6px', userSelect: 'none' }}>›</span>
            )}
            <span
              onClick={item.onClick}
              style={{
                color: isLast ? C.red : C.muted,
                fontWeight: isLast ? 500 : 400,
                cursor: item.onClick ? 'pointer' : 'default',
                textDecoration: (!isLast && item.onClick) ? 'underline' : 'none',
                transition: 'color 0.15s',
              }}
            >
              {item.label}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
}
