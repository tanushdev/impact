import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ImpactLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const ImpactLogo: React.FC<ImpactLogoProps> = ({
  variant = 'light',
  className = '',
}) => {
  const isDark = variant === 'dark';
  const logoSrc = isDark ? '/images/figma_logo_dark.svg' : '/images/figma_logo_146_15635.svg';

  return (
    <Link href="/" className={`inline-block group ${className}`}>
      <Image
        src={logoSrc}
        alt="Impact Energies Limited"
        width={208}
        height={61}
        priority
        className="h-10 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
      />
    </Link>
  );
};
