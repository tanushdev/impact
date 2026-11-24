import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'CMS Admin · Impact Energies',
  description: 'Impact Energies News & Media Administration Panel',
  robots: 'noindex, nofollow',
};

// This layout completely replaces the root layout for all /admin/* routes.
// No public Header or Footer is rendered here — this is a fully isolated CMS shell.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#0A0F0C] antialiased">
        {children}
      </body>
    </html>
  );
}
