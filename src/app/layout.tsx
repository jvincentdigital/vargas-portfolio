import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Christian A. Vargas Valentín — Social Media Manager & Content Creator',
  description: 'Portfolio de Christian A. Vargas Valentín, Social Media Manager y creador de contenido en Puerto Rico.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
