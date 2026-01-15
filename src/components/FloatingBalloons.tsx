import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
}

const balloonColors = ['#ff00ff', '#00d4ff', '#a855f7', '#fbbf24', '#ec4899', '#06b6d4'];

const messages = [
  "Happy Birthday! 🎂",
  "You're amazing! ✨",
  "Have a blast! 🎉",
  "Stay awesome! 💫",
  "Best wishes! 🌟",
  "You rock! 🎸",
];

const FloatingBalloons = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppedMessage, setPoppedMessage] = useState<string | null>(null);

  useEffect(() => {
    const initialBalloons: Balloon[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }));
    setBalloons(initialBalloons);
  }, []);

  const popBalloon = (id: number, x: number) => {
    // Play pop sound
    const audio = new Audio('data:audio/wav;base64,UklGRlQFAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAFAABkAGQAZABkAGQAZABkAGQAZABkAGQA');
    audio.volume = 0.3;
    audio.play().catch(() => {});

    // Confetti burst
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: x / 100, y: 0.5 },
      colors: [balloonColors[Math.floor(Math.random() * balloonColors.length)]],
    });

    // Show message
    setPoppedMessage(messages[Math.floor(Math.random() * messages.length)]);
    setTimeout(() => setPoppedMessage(null), 2000);

    // Remove balloon
    setBalloons((prev) => prev.filter((b) => b.id !== id));

    // Add new balloon after delay
    setTimeout(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 90 + 5,
          color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
          delay: 0,
          duration: 15 + Math.random() * 10,
        },
      ]);
    }, 3000);
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <AnimatePresence>
          {balloons.map((balloon) => (
            <motion.div
              key={balloon.id}
              initial={{ y: '120vh' }}
              animate={{ y: '-20vh' }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: balloon.duration,
                delay: balloon.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ left: `${balloon.x}%` }}
              className="absolute pointer-events-auto cursor-pointer"
              onClick={() => popBalloon(balloon.id, balloon.x)}
            >
              <motion.div
                animate={{
                  x: [0, 20, -20, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                <svg width="50" height="70" viewBox="0 0 50 70">
                  <ellipse
                    cx="25"
                    cy="25"
                    rx="20"
                    ry="25"
                    fill={balloon.color}
                    style={{
                      filter: `drop-shadow(0 0 10px ${balloon.color})`,
                    }}
                  />
                  <polygon points="25,50 22,55 28,55" fill={balloon.color} />
                  <path
                    d="M25 55 Q30 60 25 70"
                    stroke="#aaa"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {poppedMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 glass-card px-8 py-4 neon-glow"
          >
            <p className="text-2xl font-display neon-text">{poppedMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingBalloons;
