import React, { useState, useMemo } from 'react';
import { C } from '../constants/colors';
import { THEMES } from '../constants/data';
import Breadcrumb from '../components/Breadcrumb';
import DocCard from '../components/DocCard';
import Footer from '../components/Footer';
import { IcoSearch } from '../components/Icons';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function DocumentsPage({ cat, onBack, onOpenDoc, onDownload }) {
  const [search, setSearch]               = useState('');
  const [sort, setSort]                   = useState('latest');
  const [searchFocused, setSearchFocused] = useState(false);
  const { isMobile, isTablet }            = useBreakpoint();

  const th = THEMES[cat.id];
  const px = isMobile ? 16 : 32;

  const filtered = useMemo(() => {
    let docs = [...cat.docs];
    if (search.trim()) {
      docs = docs.filter(d => d.toLowerCase().includes(search.toLowerCase()));
    }
    if (sort === 'az') {
      docs = docs.slice().sort((a, b) => a.localeCompare(b));
    } else if (sort === 'oldest') {
      docs = docs.slice().reverse();
    }
    return docs;
  }, [cat.docs, search, sort]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: `24px ${px}px` }}>
      <Breadcrumb
        items={[
          { label: 'Legal Templates', onClick: onBack },
          { label: cat.name },
        ]}
        accentColor={th.accent}
      />

      {/* Page header card — themed */}
      <div style={{
        background: th.light,
        border: `1px solid ${th.accent}40`,
        borderRadius: 14,
        marginBottom: 20,
        overflow: 'hidden',
        boxShadow: `0 1px 6px ${th.accent}18`,
      }}>
        {/* Gradient accent stripe */}
        <div style={{ height: 5, background: th.grad }} />

        {/* Content row */}
        <div style={{
          padding: isMobile ? '14px 16px' : '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 14,
        }}>
          {/* Left: icon + name + count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: `${th.accent}18`,
              border: `1.5px solid ${th.accent}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              flexShrink: 0,
            }}>
              {cat.icon}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: isMobile ? 16 : 20,
                fontWeight: 700,
                color: C.text,
                lineHeight: 1.2,
              }}>
                {cat.name}
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>
                {cat.desc}
              </div>
            </div>
          </div>

          {/* Right: search + sort */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
            width: isMobile ? '100%' : 'auto',
          }}>
            {/* Search */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              flex: isMobile ? 1 : 'none',
              width: isMobile ? undefined : 190,
              height: 36,
              borderRadius: 10,
              background: C.pageBg,
              border: `1px solid ${searchFocused ? th.accent : C.border}`,
              padding: '0 10px',
              transition: 'border 0.18s',
              minWidth: 0,
            }}>
              <IcoSearch c={searchFocused ? th.accent : C.muted} s={13} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search templates..."
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: 13,
                  color: C.text,
                  fontFamily: 'inherit',
                  minWidth: 0,
                }}
              />
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                height: 36,
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                background: C.cardBg,
                fontSize: 13,
                color: C.text,
                padding: '0 8px',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                flexShrink: 0,
              }}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      {search.trim() && (
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>
          {filtered.length} results for{' '}
          <strong style={{ color: C.text }}>"{search}"</strong>
        </div>
      )}

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div style={{
          background: th.light,
          borderRadius: 14,
          border: `1px solid ${th.accent}30`,
          padding: '56px 24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 36, marginBottom: 14 }}>📭</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: C.text, marginBottom: 6 }}>
            No templates match your search
          </div>
          <div style={{ fontSize: 13, color: C.muted }}>
            Try a different term or clear the search
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(auto-fill, minmax(150px, 1fr))'
            : isTablet
              ? 'repeat(auto-fill, minmax(180px, 1fr))'
              : 'repeat(4, minmax(0, 1fr))',
          gap: isMobile ? 12 : 16,
        }}>
          {filtered.map(name => (
            <DocCard
              key={name}
              name={name}
              theme={th}
              onClick={() => onOpenDoc(name)}
              onDownload={() => onDownload(name)}
            />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
