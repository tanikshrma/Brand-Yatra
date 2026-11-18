import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface BrandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'gold' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function BrandButton({
  children,
  variant = 'gold',
  size = 'md',
  showArrow = true,
  icon,
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: BrandButtonProps) {
  const sizeClasses = {
    sm: 'h-[42px] px-5 text-[13px] gap-2',
    md: 'h-[52px] px-7 text-[14px] gap-2.5',
    lg: 'h-[56px] sm:h-[60px] px-8 sm:min-w-[260px] text-[14.5px] sm:text-[15px] gap-2.5',
  };

  const variantClasses = {
    gold: 'bg-[#F8C311] border border-[#F8C311] text-[#0D0D0D] font-semibold shadow-[0_12px_30px_-12px_rgba(248,195,17,0.36)] focus-visible:outline-[#F8C311]',
    dark: 'bg-[#0D0D0D] border border-[#0D0D0D] text-white font-semibold shadow-[0_14px_34px_-12px_rgba(13,13,13,0.45)] focus-visible:outline-[#0D0D0D]',
    outline:
      'bg-white/[0.04] border border-white/25 text-white font-medium focus-visible:outline-[#F8C311]',
  };

  const arrowClasses = {
    gold: 'text-[#0D0D0D]',
    dark: 'text-[#F8C311]',
    outline: 'text-[#F8C311]',
  };

  const defaultCursorTheme = variant === 'gold' ? 'light' : 'dark';
  const cursorButtonKind = variant === 'gold' ? 'yellow' : variant;
  const baseDisplay = /\bhidden\b/.test(className) ? '' : 'inline-flex';

  return (
    <button
      type={type}
      data-cursor="link"
      data-cursor-button={cursorButtonKind}
      data-cursor-theme={defaultCursorTheme}
      className={`group relative overflow-hidden ${baseDisplay} items-center justify-center rounded-none tracking-[-0.005em] transition-transform duration-200 active:scale-[0.99] disabled:opacity-65 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {icon ? (
        <span className="relative z-10 inline-flex items-center">{icon}</span>
      ) : (
        showArrow && (
          <ArrowUpRight
            className={`relative z-10 w-4 h-4 stroke-[2.3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${arrowClasses[variant]}`}
          />
        )
      )}
    </button>
  );
}
