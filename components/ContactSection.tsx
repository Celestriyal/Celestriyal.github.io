import SectionContainer from './SectionContainer';
import Link from 'next/link';

export default function ContactSection() {
  return (
    <SectionContainer id="contact">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Get in <span className="text-primary">Touch</span>
        </h2>
        <div className="w-24 h-1 bg-secondary rounded-full mx-auto"></div>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          <h3 className="text-xl font-bold text-white mb-3">Email Me</h3>
          <p className="text-gray-100 mb-4">I'm always open to new opportunities and collaborations.</p>
          <a
            href="mailto:ashfaq072025@gmail.com"
            className="text-primary hover:text-secondary font-semibold text-lg transition-colors"
          >
            ashfaq072025@gmail.com
          </a>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center shadow-lg hover:shadow-secondary/20 transition-shadow duration-300">
          <h3 className="text-xl font-bold text-white mb-3">Find Me On</h3>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="https://github.com/Celestriyal" className="text-white hover:text-primary transition-colors text-3xl">
              {/* Placeholder for GitHub Icon */}
              <i className="fab fa-github"></i> {/* Requires Font Awesome, or use SVG */}
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/mohammed-ashfaq120/" className="text-white hover:text-primary transition-colors text-3xl">
              {/* Placeholder for LinkedIn Icon */}
              <i className="fab fa-linkedin"></i> {/* Requires Font Awesome, or use SVG */}
              LinkedIn
            </Link>
          </div>

        </div>
      </div>
    </SectionContainer>
  );
}
