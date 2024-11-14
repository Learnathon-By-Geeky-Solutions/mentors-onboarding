'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function Confetti() {
  useEffect(() => {
    // Play success sound
    const audio = new Audio('/sounds/success.mp3');
    audio.play().catch(console.error);

    // Launch confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#1890BA', '#1B3765', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return null;
}