import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const SecretMessage = () => {
  const [clickCount, setClickCount] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 3 && !unlocked) {
      setUnlocked(true);
    }
  };

  return (
    <section className="py-20 px-4 text-center" id="secret">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-muted-foreground mb-4">
          {!unlocked ? 'There\'s a secret here...' : 'You found it! 💖'}
        </p>

        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={unlocked ? { 
            scale: [1, 1.1, 1],
          } : {}}
          transition={unlocked ? { 
            duration: 0.8,
            repeat: Infinity,
          } : {}}
          className={`p-6 rounded-full transition-all ${
            unlocked 
              ? 'bg-primary/20' 
              : 'glass-card hover:bg-muted/60'
          }`}
          style={unlocked ? {
            boxShadow: '0 0 40px hsl(320 100% 60% / 0.6), 0 0 80px hsl(320 100% 60% / 0.3)',
          } : {}}
        >
          <Heart 
            className={`w-12 h-12 transition-all ${
              unlocked 
                ? 'text-primary fill-primary' 
                : clickCount > 0 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
            }`}
          />
        </motion.button>

        {!unlocked && clickCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            {3 - clickCount} more click{3 - clickCount !== 1 ? 's' : ''}...
          </motion.p>
        )}

        <AnimatePresence>
          {unlocked && (
            <motion.div
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              className="mt-8 overflow-hidden"
            >
              <div className="glass-card p-8 max-w-lg mx-auto neon-glow">
                <p className="font-display text-xl md:text-2xl leading-relaxed">
                  "Dear Nimme, wishing you all the joy and peace this year.
                  <br />
                  <span className="text-gradient">Stay happy, stay amazing — you deserve the world 😊✨</span>"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default SecretMessage;
