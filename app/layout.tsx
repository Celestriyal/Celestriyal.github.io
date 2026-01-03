import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar'; // Adjust path if needed
import Footer from '../components/Footer'; // Adjust path if needed

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ashfaq - Portfolio',
  description: 'Ashfaq\'s personal portfolio website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${inter.className} bg-dark text-white`}>
        <Navbar />
        <main className="min-h-screen pt-16"> {/* pt-16 for fixed navbar height */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
