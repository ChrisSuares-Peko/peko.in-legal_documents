import React, { useState, useMemo } from 'react';
import { C } from '../constants/colors';
import Breadcrumb from '../components/Breadcrumb';
import DocCard from '../components/DocCard';
import Footer from '../components/Footer';
import { IcoSearch } from '../components/Icons';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function DocumentsPage({ cat, onBack, onOpenDoc }) {
  const [search, setSearch]               = useState('');
  const [sort, setSort]                   = useState('latest');
  const [searchFocused, setSearchFocused] = useState(false);
  const { isMobile, isTablet }            = useBreakpoint();

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

  const px = isMobile ? 16 : 32;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: `24px ${px}px` }}>
      <Breadcrumb items={[
        { label: 'More Services' },
        { label: 'Legal Templates', onClick: onBack },
        { label: cat.name },
      ]} />

      {/* Page header card */}
      <div style={{
        background: C.cardBg,
        borderRadius: 14,
        padding: isMobile ? '16px' : '20px 24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 14,
        marginBottom: 20,
      }}>
        {/* Category identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: cat.bg,
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
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: isMobile ? 'normal' : 'nowrap',
            }}>
              {cat.name}
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 3 }}>
              {cat.docs.length} templates in this category
            </div>
          </div>
        </div>

        {/* Controls */}
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
            border: `1px solid ${searchFocused ? C.red : C.border}`,
            padding: '0 10px',
            transition: 'border 0.18s',
            minWidth: 0,
          }}>
            <IcoSearch c={C.muted} s={13} />
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

      {/* Results count (search active only) */}
      {search.trim() && (
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>
          {filtered.length} results for{' '}
          <strong style={{ color: C.text }}>"{search}"</strong>
        </div>
      )}

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div style={{
          background: C.cardBg,
          borderRadius: 14,
          border: `1px solid ${C.border}`,
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
              catBg={cat.bg}
              onClick={() => onOpenDoc(name)}
            />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
