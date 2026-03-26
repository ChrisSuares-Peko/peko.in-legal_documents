import React, { useState, useMemo } from 'react';
import { C } from '../constants/colors';
import Breadcrumb from '../components/Breadcrumb';
import DocCard from '../components/DocCard';
import Footer from '../components/Footer';
import { SearchIcon } from '../components/Icons';

export default function DocumentsPage({ cat, onBack, onOpenDoc }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [searchFocused, setSearchFocused] = useState(false);

  const breadcrumbs = [
    { label: "More Services" },
    { label: "Legal Templates", onClick: onBack },
    { label: cat.name },
  ];

  const filtered = useMemo(() => {
    let docs = [...cat.docs];

    if (search.trim()) {
      const term = search.toLowerCase();
      docs = docs.filter((d) => d.toLowerCase().includes(term));
    }

    if (sort === 'az') {
      docs.sort((a, b) => a.localeCompare(b));
    } else if (sort === 'oldest') {
      docs.reverse();
    }
    // 'latest' = default insertion order

    return docs;
  }, [cat.docs, search, sort]);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
      <Breadcrumb items={breadcrumbs} />

      {/* Header row */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 24,
        gap: 16,
        flexWrap: 'wrap',
      }}>
        {/* Left: title + subtitle */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 6,
          }}>
            <span style={{ fontSize: 26, lineHeight: 1 }}>{cat.icon}</span>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>
              {cat.name}
            </h1>
          </div>
          <p style={{ fontSize: 13, color: C.muted }}>
            {cat.docs.length} templates in this category
          </p>
        </div>

        {/* Right: search + sort */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
          {/* Search input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: C.pageBg,
            borderRadius: 10,
            padding: '0 12px',
            height: 36,
            border: `1px solid ${searchFocused ? C.red : C.border}`,
            transition: 'all 0.15s',
            width: 220,
          }}>
            <SearchIcon c={C.muted} s={14} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search templates..."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: 13,
                color: C.text,
                width: '100%',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Sort select */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              height: 36,
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: C.cardBg,
              padding: '0 10px',
              fontSize: 13,
              color: C.text,
              cursor: 'pointer',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A–Z</option>
          </select>
        </div>
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 0',
          gap: 14,
        }}>
          <span style={{ fontSize: 36, lineHeight: 1 }}>📭</span>
          <p style={{ fontSize: 14, color: C.muted, textAlign: 'center' }}>
            No templates match your search — try a different term.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 16,
        }}>
          {filtered.map((name) => (
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
