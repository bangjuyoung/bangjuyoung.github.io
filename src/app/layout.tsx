import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bangjuyoung',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex gap-4 p-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/records">Records</Link>
        </nav>

        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
