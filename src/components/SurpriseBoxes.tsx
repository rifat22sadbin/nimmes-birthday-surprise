import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const surprises = [
  {
    type: 'compliment',
    message: "You have the most amazing energy! People light up when you're around. ✨",
    emoji: '💫',
  },
  {
    type: 'affirmation',
    message: "You are capable of achieving anything you set your mind to. Keep believing in yourself! 💪",
    emoji: '🌟',
  },
  {
    type: 'funny',
    message: "If being awesome was a crime, you'd be serving a life sentence! 😂",
    emoji: '🎭',
  },
];

const SurpriseBoxes = () => {
  const [revealedBox, setRevealedBox] = useState<number | null>(null);
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);

  const openBox = (index: number) => {
    if (openedBoxes.includes(index)) return;

    setRevealedBox(index);
    setOpenedBoxes([...openedBoxes, index]);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff00ff', '#00d4ff', '#fbbf24'],
    });
  };

  const closeReveal = () => {
    setRevealedBox(null);
  };

  return (
    <section className="py-20 px-4" id="surprise">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl neon-text mb-4">
          Surprise Boxes 🎁
        </h2>
        <p className="text-muted-foreground">Click a box to reveal your surprise!</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
        {surprises.map((surprise, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative"
          >
            <motion.button
              onClick={() => openBox(index)}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-32 h-32 md:w-40 md:h-40 ${
                openedBoxes.includes(index) ? 'opacity-50' : 'floating'
              }`}
              disabled={openedBoxes.includes(index)}
            >
              {/* Gift box */}
              <div className="relative w-full h-full">
                {/* Box body */}
                <div 
                  className="absolute bottom-0 w-full h-3/4 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${
                      index === 0 ? '#ff00ff' : index === 1 ? '#00d4ff' : '#fbbf24'
                    }, ${
                      index === 0 ? '#a855f7' : index === 1 ? '#06b6d4' : '#f59e0b'
                    })`,
                    boxShadow: `0 0 30px ${
                      index === 0 ? '#ff00ff50' : index === 1 ? '#00d4ff50' : '#fbbf2450'
                    }`,
                  }}
                />
                
                {/* Ribbon horizontal */}
                <div className="absolute bottom-0 w-full h-3/4 flex items-center justify-center">
                  <div className="w-4 h-full bg-gold/80 rounded" />
                </div>
                
                {/* Ribbon vertical */}
                <div className="absolute bottom-0 w-full h-3/4 flex items-center justify-center">
                  <div className="w-full h-4 bg-gold/80 rounded" />
                </div>

                {/* Lid */}
                <motion.div
                  animate={openedBoxes.includes(index) ? { rotateX: -30, y: -20 } : {}}
                  className="absolute top-0 w-full h-1/3 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${
                      index === 0 ? '#ff00ff' : index === 1 ? '#00d4ff' : '#fbbf24'
                    }, ${
                      index === 0 ? '#a855f7' : index === 1 ? '#06b6d4' : '#f59e0b'
                    })`,
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Bow */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Gift className="w-8 h-8 text-gold" />
                  </div>
                </motion.div>
              </div>

              {openedBoxes.includes(index) && (
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {surprise.emoji}
                </div>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Reveal Modal */}
      <AnimatePresence>
        {revealedBox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeReveal}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
            
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-card p-8 md:p-12 max-w-lg w-full neon-glow text-center"
            >
              <button
                onClick={closeReveal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-6xl mb-6">{surprises[revealedBox].emoji}</div>
              <p className="text-lg md:text-xl font-display leading-relaxed">
                {surprises[revealedBox].message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SurpriseBoxes;
