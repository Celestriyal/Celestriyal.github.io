export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="p-4 bg-transparent relative z-20 text-white border-t border-white/10 mt-0">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {currentYear} Ashfaq. All rights reserved.</p>
        <p>Made with Next.js and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
