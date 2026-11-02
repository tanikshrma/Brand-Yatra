import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  showArrow?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  showArrow = true,
  href,
  className = '',
  children,
  onClick,
  ...props
}) => {
  // Sizing tokens ensuring standardized heights & padding (agency level)
  const sizeClasses = {
    sm: 'h-9 sm:h-10 px-4 sm:px-5 text-[11px] sm:text-xs tracking-wider gap-1.5',
    md: 'h-11 sm:h-12 px-5 sm:px-7 text-xs sm:text-sm tracking-wider gap-2',
    lg: 'h-13 sm:h-14 px-7 sm:px-9 text-xs sm:text-sm tracking-wider gap-2.5',
  }[size];

  // Variant tokens adhering strictly to official Brand Yatra palette & agency aesthetic (rounded-lg geometric)
  const variantClasses = {
    primary:
      'bg-[#F8C311] hover:bg-[#FFD13B] text-[#0E2234] border border-[#F8C311] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] font-extrabold',
    secondary:
      'bg-white hover:bg-[#F5F6F7] text-[#0E2234] border border-[#0E2234] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] font-bold',
    dark:
      'bg-[#0E2234] hover:bg-[#142f48] text-white border border-[#0E2234] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] font-bold',
    outline:
      'bg-transparent hover:bg-[#0E2234] text-[#0E2234] hover:text-white border-2 border-[#0E2234] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] font-bold',
    ghost:
      'bg-transparent hover:bg-[#F5F6F7] text-[#0E2234] border border-transparent hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] font-semibold',
  }[variant];

  const baseClasses = `group inline-flex items-center justify-center rounded-lg font-['Syne',sans-serif] uppercase transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0E2234] focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses} ${className}`;

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10 leading-none">{children}</span>
      {showArrow && (
        <ArrowUpRight
          className="w-4 h-4 shrink-0 stroke-[2.6] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick as any}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick} {...props}>
      {content}
    </button>
  );
};
