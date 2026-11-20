import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonVariant = 'solid' | 'outline' | 'ink' | 'ghost';
type ButtonSize = 'md' | 'sm';

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps & { href: string } & Omit<
    ComponentPropsWithoutRef<'a'>,
    'href' | 'className' | 'children'
  >;
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<'button'>,
    'className' | 'children'
  >;

const variants: Record<ButtonVariant, string> = {
  solid: 'bg-white text-ink hover:bg-white/85',
  outline:
    'border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink',
  ink: 'bg-ink text-white hover:bg-ink/85',
  ghost: 'text-white/70 hover:text-white',
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-[3.25rem] px-7 py-3 gap-3 text-[0.72rem] max-[359px]:px-5',
  sm: 'min-h-10 px-5 py-2 gap-2.5 text-[0.66rem]',
};

// Labels stay on one line, except on very narrow phones (< 360px) where they
// may wrap instead of overflowing their container.
const base =
  'group/btn relative inline-flex max-w-full shrink-0 select-none items-center justify-center text-center whitespace-nowrap max-[359px]:whitespace-normal font-medium uppercase tracking-[0.22em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50';

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`h-2.5 w-5 ${className}`}
      aria-hidden
    >
      <path d="M0 5h18.5M14.5 1l4 4-4 4" />
    </svg>
  );
}

export default function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = 'solid',
    size = 'md',
    arrow = false,
    className = '',
    children,
    ...rest
  } = props;

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <Arrow className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1" />
      )}
    </>
  );

  if (typeof rest.href === 'string') {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof BaseProps>;
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
