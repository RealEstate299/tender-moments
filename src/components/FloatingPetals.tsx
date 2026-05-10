import { useMemo } from "react";

const ICONS = ["🌸", "🌷", "🌹", "💗", "❤️", "🌼"];

export function FloatingPetals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 18,
        duration: 18 + Math.random() * 18,
        size: 18 + Math.random() * 28,
        drift: (Math.random() - 0.5) * 200,
        icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute block"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            // @ts-expect-error CSS var
            "--drift": `${p.drift}px`,
            opacity: 0,
            filter: "drop-shadow(0 4px 10px rgba(180, 80, 90, 0.15))",
          }}
        >
          {p.icon}
        </span>
      ))}
    </div>
  );
}
