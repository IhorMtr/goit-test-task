import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import ReactToaster from '@/components/ReactToaster/ReactToaster';

const inter = Inter({
  variable: '--font-family',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <ReactToaster />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
