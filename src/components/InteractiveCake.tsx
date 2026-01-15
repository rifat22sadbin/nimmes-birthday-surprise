import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const InteractiveCake = () => {
  const [candleLit, setCandleLit] = useState(true);
  const [showWish, setShowWish] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleCakeClick = () => {
    if (candleLit) {
      setShowWish(true);
      // Add sparkles
      const newSparkles = Array.from({ length: 10 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 200 - 100,
        y: Math.random() * -100,
      }));
      setSparkles(newSparkles);
      setTimeout(() => setSparkles([]), 2000);
    } else {
      // Blow out candle with smoke
      setCandleLit(false);
      setShowWish(false);
      
      // Celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff00ff', '#00d4ff', '#fbbf24'],
      });

      // Relight after delay
      setTimeout(() => setCandleLit(true), 3000);
    }
  };

  const blowCandle = () => {
    if (showWish && candleLit) {
      setCandleLit(false);
      setShowWish(false);
      
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff00ff', '#00d4ff', '#fbbf24', '#a855f7'],
      });

      setTimeout(() => setCandleLit(true), 4000);
    }
  };

  return (
    <section className="py-20 px-4" id="cake">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl neon-text mb-4">
          Birthday Cake 🎂
        </h2>
        <p className="text-muted-foreground">Click the cake to make a wish!</p>
      </motion.div>

      <div className="flex flex-col items-center">
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCakeClick}
        >
          {/* Sparkles */}
          <AnimatePresence>
            {sparkles.map((sparkle) => (
              <motion.div
                key={sparkle.id}
                initial={{ opacity: 1, y: 0, x: 0 }}
                animate={{ opacity: 0, y: sparkle.y, x: sparkle.x }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute top-0 left-1/2 text-2xl z-10"
              >
                ✨
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Cake SVG */}
          <svg width="200" height="250" viewBox="0 0 200 250" className="drop-shadow-2xl">
            {/* Cake base layers */}
            <ellipse cx="100" cy="230" rx="90" ry="15" fill="#8b4513" />
            <rect x="10" y="180" width="180" height="50" fill="#d2691e" rx="5" />
            <ellipse cx="100" cy="180" rx="90" ry="15" fill="#f4a460" />
            
            <rect x="25" y="130" width="150" height="50" fill="#ff69b4" rx="5" />
            <ellipse cx="100" cy="130" rx="75" ry="12" fill="#ffb6c1" />
            
            <rect x="40" y="85" width="120" height="45" fill="#dda0dd" rx="5" />
            <ellipse cx="100" cy="85" rx="60" ry="10" fill="#e6e6fa" />

            {/* Frosting drips */}
            {[30, 50, 70, 90, 110, 130, 150, 170].map((x, i) => (
              <ellipse
                key={i}
                cx={x}
                cy={180 + (i % 2 === 0 ? 10 : 5)}
                rx="8"
                ry="12"
                fill="#ffb6c1"
              />
            ))}

            {/* Candle */}
            <rect x="95" y="45" width="10" height="40" fill="#fbbf24" rx="2" />
            
            {/* Flame */}
            <AnimatePresence>
              {candleLit && (
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0, y: -10 }}
                >
                  <motion.ellipse
                    cx="100"
                    cy="35"
                    rx="8"
                    ry="15"
                    fill="#ff6600"
                    animate={{
                      scaleY: [1, 1.2, 0.9, 1],
                      scaleX: [1, 0.9, 1.1, 1],
                    }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    style={{ filter: 'drop-shadow(0 0 10px #ff6600)' }}
                  />
                  <motion.ellipse
                    cx="100"
                    cy="35"
                    rx="4"
                    ry="10"
                    fill="#ffff00"
                    animate={{
                      scaleY: [1, 1.3, 0.8, 1],
                    }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    style={{ filter: 'drop-shadow(0 0 15px #ffff00)' }}
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Smoke when blown out */}
            <AnimatePresence>
              {!candleLit && (
                <motion.g
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0, y: -30 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.circle
                      key={i}
                      cx={100 + (i - 1) * 10}
                      cy={30}
                      r={5 + i * 2}
                      fill="#888"
                      initial={{ opacity: 0.6, y: 0 }}
                      animate={{ opacity: 0, y: -40 - i * 10 }}
                      transition={{ duration: 1.5, delay: i * 0.2 }}
                    />
                  ))}
                </motion.g>
              )}
            </AnimatePresence>

            {/* Decorations */}
            {[20, 60, 100, 140, 180].map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy={205}
                r="5"
                fill={['#ff00ff', '#00d4ff', '#fbbf24', '#a855f7', '#ec4899'][i]}
                style={{ filter: `drop-shadow(0 0 5px ${['#ff00ff', '#00d4ff', '#fbbf24', '#a855f7', '#ec4899'][i]})` }}
              />
            ))}
          </svg>

          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-30 blur-3xl -z-10"
            style={{ background: 'radial-gradient(circle, #ff00ff, transparent)' }}
          />
        </motion.div>

        {/* Wish message */}
        <AnimatePresence>
          {showWish && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <p className="text-2xl font-display neon-text mb-4">
                Make a Wish 🎂✨
              </p>
              <button
                onClick={blowCandle}
                className="btn-neon"
              >
                Blow the Candle 💨
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveCake;
