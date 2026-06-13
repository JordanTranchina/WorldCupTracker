import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'World Cup 2026 Tracker',
  description: 'Live match tracker for USA, England, Spain & Brazil at World Cup 2026',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ background: '#0f172a', color: '#f1f5f9' }}>
        {children}
      </body>
    </html>
  );
}
