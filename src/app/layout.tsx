import { Inter } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'VaSa',
  description: 'AI-Powered Job Matching',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-brand-50 text-gray-900 m-0 p-0`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
