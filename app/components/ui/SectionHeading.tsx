type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
};

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const titleColor = light ? 'text-white' : 'text-[var(--color-charcoal)]';
  const subtitleColor = light ? 'text-white/85' : 'text-[var(--color-muted)]';

  return (
    <div className={`max-w-3xl mb-10 sm:mb-12 ${alignClass}`}>
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed font-light ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
