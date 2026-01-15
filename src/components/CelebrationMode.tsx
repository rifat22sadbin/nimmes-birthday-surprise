import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PartyPopper, Sparkles } from 'lucide-react';

const CelebrationMode = () => {
  const [celebrating, setCelebrating] = useState(false);

  const triggerCelebration = () => {
    setCelebrating(true);

    // Fireworks
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    const firework = () => {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: ['#ff00ff', '#00d4ff', '#fbbf24', '#a855f7', '#ec4899'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(firework);
      } else {
        setCelebrating(false);
      }
    };

    // Confetti cannons
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff00ff', '#00d4ff', '#fbbf24'],
    });
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff00ff', '#00d4ff', '#fbbf24'],
    });

    setTimeout(firework, 500);
  };

  return (
    <section className="py-20 px-4 text-center" id="celebrate">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-4xl md:text-5xl neon-text mb-8">
          Ready to Celebrate? 🎊
        </h2>

        <motion.button
          onClick={triggerCelebration}
          disabled={celebrating}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`btn-neon text-xl px-10 py-5 flex items-center gap-3 mx-auto ${
            celebrating ? 'animate-pulse' : ''
          }`}
        >
          <PartyPopper className="w-6 h-6" />
          {celebrating ? 'Celebrating! 🎉' : 'Celebrate 🎊'}
          <Sparkles className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Glow shockwave effect */}
      {celebrating && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none z-40"
          style={{
            background: 'radial-gradient(circle, hsl(320 100% 60% / 0.6), transparent)',
          }}
        />
      )}
    </section>
  );
};

export default CelebrationMode;
