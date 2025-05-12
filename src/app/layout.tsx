import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InnerView - Твій AI-портрет',
  description: 'Створи унікальний поетичний портрет, який відображає твою внутрішню сутність',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
} 