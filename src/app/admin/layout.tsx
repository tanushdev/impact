import React from 'react';

// Isolated layout for all /admin/* routes.
// Header and Footer are completely suppressed in Header.tsx and Footer.tsx.
// App router root layout already supplies <html> and <body>.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#141C16] antialiased">
      {children}
    </div>
  );
}
