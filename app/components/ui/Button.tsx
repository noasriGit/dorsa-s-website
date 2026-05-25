import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant;
  href?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-taupe)] text-[var(--color-charcoal)] hover:bg-[#c4a67a] shadow-sm border border-black/5',
  secondary:
    'bg-white text-[var(--color-charcoal)] hover:bg-[var(--color-cream)] border border-black/10 shadow-sm',
  ghost:
    'bg-transparent text-[var(--color-charcoal)] hover:bg-black/5 border border-transparent',
};

const baseClasses =
  'inline-flex items-center justify-center rounded-full px-6 py-3 min-h-[3rem] text-sm sm:text-base font-medium tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-taupe)] disabled:opacity-50 disabled:pointer-events-none';

export default function Button({
  variant = 'primary',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} className={classes} {...(props as ComponentPropsWithoutRef<'a'>)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
