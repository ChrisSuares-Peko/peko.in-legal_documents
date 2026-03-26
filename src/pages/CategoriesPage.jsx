import React, { useState, useMemo } from 'react';
import { C } from '../constants/colors';
import { CATEGORIES } from '../constants/data';
import Breadcrumb from '../components/Breadcrumb';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';
import { IcoSearch } from '../components/Icons';
import { useBreakpoint } from '../hooks/useBreakpoint';

const total        = CATEGORIES.reduce((s, c) => s + c.docs.length, 0);
const mostTemplates = Math.max(...CATEGORIES.map(c => c.docs.length));

const STATS = [
  { label: 'Total Categories', val: CATEGORIES.length,  emoji: '🗂️', bg: '#EEF4FF', tc: '#1A5FD4' },
  { label: 'Total Templates',  val: total,               emoji: '📄', bg: '#EDFBF3', tc: '#1A8A4A' },
  { label: 'Most Templates',   val: mostTemplates,       emoji: '📊', bg: '#FFF8EC', tc: '#C97A0A' },
  { label: 'Newly Added',      val: 12,                  emoji: '✨', bg: '#F3EEFF', tc: '#5E35B1' },
];

function StatCard({ stat: s }) {
  return (
    <div style={{
      background: s.bg,
      border: '1px solid #EBEBEB',
      borderRadius: 12,
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}>
      <div style={{ fontSize: 22, lineHeight: 1 }}>{s.emoji}</div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: s.tc, lineHeight: 1 }}>{s.val}</div>
        <div style={{ fontSize: 12, color: '#8A8A8A', marginTop: 3 }}>{s.label}</div>
      </div>
    </div>
  );
}

export default function CategoriesPage({ onOpen }) {
  const [search, setSearch]               = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const { isMobile, isTablet }            = useBreakpoint();

  const filtered = useMemo(() => {
    if (!search.trim()) return CATEGORIES;
    return CATEGORIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const px = isMobile ? 16 : 32;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: `24px ${px}px` }}>
      {/* Single-item breadcrumb */}
      <Breadcrumb items={[{ label: 'Legal Templates' }]} />

      {/* Hero card */}
      <div style={{
        background: C.cardBg,
        borderRadius: 16,
        padding: isMobile ? '18px 16px' : '24px 28px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 20,
      }}>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: C.redLight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="26" height="28" viewBox="0 0 26 28" fill="none">
            <rect x="1" y="1" width="20" height="26" rx="2" fill="white" stroke="#E83838" strokeWidth="1.5" />
            <path d="M21 1 L25 5 L21 5 Z" fill="#FFF0F0" stroke="#E83838" strokeWidth="1.5" />
            <rect x="4" y="10" width="13" height="1.5" rx="0.75" fill="#E83838" />
            <rect x="4" y="14" width="13" height="1.5" rx="0.75" fill="#E83838" />
            <rect x="4" y="18" width="9"  height="1.5" rx="0.75" fill="#E83838" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ fontSize: isMobile ? 17 : 20, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>
            Legal Templates
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
            {CATEGORIES.length} categories · {total} templates
          </div>
        </div>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: isMobile ? '100%' : 260,
          height: 38,
          borderRadius: 10,
          background: C.pageBg,
          border: `1px solid ${searchFocused ? C.red : C.border}`,
          padding: '0 12px',
          transition: 'border 0.18s',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}>
          <IcoSearch c={C.muted} s={14} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search categories..."
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
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        {STATS.map(s => <StatCard key={s.label} stat={s} />)}
      </div>

      {/* Category grid */}
      {filtered.length === 0 ? (
        <div style={{
          background: C.cardBg,
          borderRadius: 14,
          padding: '48px 24px',
          textAlign: 'center',
          border: `1px solid ${C.border}`,
        }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 14, color: C.muted }}>No categories match '{search}'</div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? 'repeat(auto-fill, minmax(150px, 1fr))'
            : isTablet
              ? 'repeat(auto-fill, minmax(200px, 1fr))'
              : 'repeat(4, minmax(0, 1fr))',
          gap: isMobile ? 12 : 16,
        }}>
          {filtered.map(cat => (
            <CategoryCard key={cat.id} cat={cat} onClick={() => onOpen(cat)} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}
