import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';

const inter = Inter({
  variable: '--font-family',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
