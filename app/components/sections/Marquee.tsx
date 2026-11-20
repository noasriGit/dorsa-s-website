import { focusAreas } from '@/lib/content';
import { Mark } from '../brand/Logo';

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {focusAreas.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 text-[clamp(1.5rem,1rem+2vw,2.75rem)] font-light leading-none tracking-[-0.03em] text-white/90 sm:px-12">
            {item}
          </span>
          <Mark className="h-3 w-3 text-white/35" />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Training focus areas" className="marquee overflow-hidden border-y border-white/10 py-8 sm:py-10">
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
