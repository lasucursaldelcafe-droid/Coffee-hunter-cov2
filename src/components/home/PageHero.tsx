import Link from "next/link";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-trade-ink text-white ${compact ? "py-14 lg:py-16" : "py-16 lg:py-24"}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse at 80% 20%, rgba(45,90,39,0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 10% 90%, rgba(104,25,14,0.45) 0%, transparent 45%)
          `,
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-4 block">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-white/75 max-w-2xl leading-relaxed mb-8">{description}</p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row gap-4">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn-trade btn-trade-primary btn-trade-pill bg-white text-trade-ink hover:bg-cream">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="btn-trade btn-trade-secondary btn-trade-pill text-white border-white/30 hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
