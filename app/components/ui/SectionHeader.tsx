import type { ReactNode } from 'react';
import { delay } from './motion';

type SectionHeaderProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Put the intro beside the title on large screens. */
  split?: boolean;
  className?: string;
};

export default function SectionHeader({
  index,
  eyebrow,
  title,
  intro,
  split = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div
      className={`${split ? 'grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10' : ''} ${className}`}
    >
      <div className={split ? 'lg:col-span-7' : ''}>
        <p className="eyebrow" data-reveal>
          {index && <span className="tabular-nums">{index}</span>}
          {index && (
            <span aria-hidden className="opacity-40">
              /
            </span>
          )}
          <span>{eyebrow}</span>
        </p>
        <h2 className="display-lg mt-7 text-balance" data-reveal style={delay(80)}>
          {title}
        </h2>
      </div>
      {intro && (
        <div
          className={split ? 'lg:col-span-4 lg:col-start-9' : 'mt-8 max-w-2xl'}
          data-reveal
          style={delay(160)}
        >
          <div className="lede">{intro}</div>
        </div>
      )}
    </div>
  );
}
