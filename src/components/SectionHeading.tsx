import Link from "next/link";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-2xl"}`}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-semibold uppercase tracking-widest mb-3 ${
            light ? "text-gold" : "text-green"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl font-bold mb-4 ${
          light ? "text-white" : "text-coffee"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-lg leading-relaxed ${light ? "text-white/80" : "text-foreground/70"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
}

export function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  const content = (
    <div className="group p-8 bg-white rounded-2xl border border-cream hover:border-green/30 hover:shadow-lg transition-all duration-300 h-full">
      <div className="w-14 h-14 rounded-xl bg-cream flex items-center justify-center text-coffee mb-6 group-hover:bg-green group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="font-display text-xl font-bold text-coffee mb-3">{title}</h3>
      <p className="text-foreground/70 leading-relaxed">{description}</p>
      {href && (
        <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-green group-hover:gap-2 transition-all">
          Conocer más
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
