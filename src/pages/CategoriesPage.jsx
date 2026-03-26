import React from 'react';
import { C } from '../constants/colors';
import { CATEGORIES } from '../constants/data';
import Breadcrumb from '../components/Breadcrumb';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';

const totalTemplates = CATEGORIES.reduce((sum, cat) => sum + cat.docs.length, 0);

const BREADCRUMBS = [
  { label: "More Services" },
  { label: "Legal Templates" },
];

export default function CategoriesPage({ onOpen }) {
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '24px 28px',
    }}>
      <Breadcrumb items={BREADCRUMBS} />

      <div style={{ marginTop: 20, marginBottom: 24 }}>
        <h1 style={{
          fontSize: 22,
          fontWeight: 700,
          color: C.text,
          marginBottom: 6,
          lineHeight: 1.2,
        }}>
          Legal Templates
        </h1>
        <p style={{ fontSize: 13, color: C.muted }}>
          {CATEGORIES.length} categories · {totalTemplates} templates
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap: 16,
      }}>
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} onClick={() => onOpen(cat)} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
