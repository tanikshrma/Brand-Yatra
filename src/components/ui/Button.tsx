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
      'bg-[var(--color-primary)] hover:bg-[var(--color-primary)] text-[var(--color-navy)] border border-[var(--color-primary)] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 font-extrabold',
    secondary:
      'bg-[var(--color-white)] hover:bg-[var(--color-soft-grey)] text-[var(--color-navy)] border border-[var(--color-navy)] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 font-bold',
    dark:
      'bg-[var(--color-navy)] hover:bg-[var(--color-navy)] text-[var(--color-white)] border border-[var(--color-navy)] shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 font-bold',
    outline:
      'bg-transparent hover:bg-[var(--color-navy)] text-[var(--color-navy)] hover:text-[var(--color-white)] border-2 border-[var(--color-navy)] hover:-translate-y-0.5 active:translate-y-0 font-bold',
    ghost:
      'bg-transparent hover:bg-[var(--color-soft-grey)] text-[var(--color-navy)] border border-transparent hover:-translate-y-0.5 active:translate-y-0 font-semibold',
  }[variant];

  const baseClasses = `group inline-flex items-center justify-center rounded-lg font-['Syne',sans-serif] uppercase transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-navy)] focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses} ${className}`;

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
