import React, { ReactNode } from 'react';

interface SectionContainerProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export default function SectionContainer({ id, className = '', children }: SectionContainerProps) {
  return (
    <section id={id} className={`py-20 md:py-32 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
