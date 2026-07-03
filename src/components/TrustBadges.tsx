export function TrustBadges() {
  const badges = [
    { label: "Trazabilidad 100%", icon: "✓" },
    { label: "SCA 85+ pts", icon: "★" },
    { label: "Logística global", icon: "🌍" },
    { label: "Datos retail", icon: "📊" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur border border-cream rounded-full text-xs font-medium text-coffee"
        >
          <span aria-hidden>{badge.icon}</span>
          {badge.label}
        </span>
      ))}
    </div>
  );
}
