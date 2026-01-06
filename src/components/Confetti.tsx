import { useState } from "react";

const COLORS = ["bg-primary", "bg-secondary", "bg-third", "bg-sparkle"];

type GlitterPiece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
};

export const Confetti = () => {
  const [glitter] = useState<GlitterPiece[]>(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: Math.random() * 2,
    }))
  );

  return (
    <>
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
        {glitter.map((g, i) => (
          <span
            key={g.id}
            className={`absolute w-2 h-3 animate-confetti ${
              COLORS[i % COLORS.length]
            }`}
            style={{
              left: `${g.left}%`,
              animationDelay: `${g.delay}s`,
              animationDuration: `${g.duration}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};
