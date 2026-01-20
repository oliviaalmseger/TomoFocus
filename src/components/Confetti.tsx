import React, { useState } from "react";

const COLORS = ["bg-confetti-pink", "bg-confetti-purple", "bg-confetti-blue", "bg-confetti-green", "bg-confetti-yellow"];

type GlitterPiece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  horizontal: number;
  vertical: number;
};

export const Confetti = () => {
  const [glitter] = useState<GlitterPiece[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: Math.random() * 2.5,
      horizontal: (Math.random() - 0.50) * 60,
      vertical: 40 + Math.random() * 50,
    }))
  );

  return (
    <>
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
        {glitter.map((glitter, i) => (
          <span
            key={glitter.id}
            className={`absolute bottom-0 w-2 h-3 rounded-md animate-confetti ${COLORS[i % COLORS.length]}`}
            style={{
              left: `${glitter.left}%`,
              animationDelay: `${glitter.delay}s`,
              animationDuration: `${5.5 + glitter.duration}s`,
              "--x": `${glitter.horizontal}vw`,
              "--y": `${glitter.vertical}vh`
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
};
