import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer'; // Adjust path if needed

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ashfaq - Portfolio',
  description: 'Ashfaq\'s personal portfolio website',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.className} bg-dark text-white`}>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
