import { useState, ImgHTMLAttributes } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ResilientImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  wrapperClassName?: string;
}

export function ResilientImage({
  src,
  alt = '',
  fallbackLabel,
  className = '',
  wrapperClassName = '',
  ...rest
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#141617] text-[#A5A5A5] p-6 text-center ${wrapperClassName} ${className}`}
        role="img"
        aria-label={alt || fallbackLabel || 'Brand Yatra visual'}
      >
        <ImageIcon className="w-7 h-7 text-[#F8C311]/70 mb-2" />
        <span className="text-xs font-medium tracking-wide text-white/70">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
}
