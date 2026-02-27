import type {Metadata} from 'next';
import './globals.css'; // Global styles
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'BDSMBRAZIL - Moteis',
  description: 'Encontre os melhores motéis no BDSMBRAZIL',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className="bg-zinc-50 min-h-screen">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
