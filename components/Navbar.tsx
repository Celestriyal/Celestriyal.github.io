import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-dark text-white border-b border-gray-800 fixed w-full z-50 top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary hover:text-secondary transition-colors duration-300">
          Ashfaq
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="#about" className="hover:text-primary transition-colors duration-300">
              About
            </Link>
          </li>
          <li>
            <Link href="#projects" className="hover:text-primary transition-colors duration-300">
              Projects
            </Link>
          </li>
          <li>
            <Link href="#skills" className="hover:text-primary transition-colors duration-300">
              Skills
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-primary transition-colors duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
