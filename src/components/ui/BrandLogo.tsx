import { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'white' | 'black';
  priority?: boolean;
}

export function BrandLogo({
  className = '',
  size = 'md',
  variant = 'white',
  priority = false,
}: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-[122px] h-[24px] sm:w-[142px] sm:h-[28px]',
    md: 'w-[136px] h-[27px] sm:w-[162px] sm:h-[32px] lg:w-[172px] lg:h-[34px]',
    lg: 'w-[152px] h-[30px] sm:w-[182px] sm:h-[36px]',
  };

  const src =
    variant === 'black'
      ? '/assets/brandyatra/Logo%20Black%2001.png'
      : '/assets/brandyatra/Logo%20White%2001.png';

  if (imgError) {
    return (
      <span
        className={`inline-flex items-center font-heading tracking-[0.03em] text-2xl whitespace-nowrap shrink-0 ${
          variant === 'black' ? 'text-[#0D0D0D]' : 'text-white'
        } ${className}`}
      >
        Brand<span className="text-[#F8C311]">Yatra</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src={src}
        alt="Brand Yatra"
        width={172}
        height={34}
        loading={priority ? 'eager' : undefined}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        onError={() => setImgError(true)}
        className={`${sizeClasses[size]} max-w-full object-contain object-left block`}
      />
    </span>
  );
}
