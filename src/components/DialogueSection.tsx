import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';

const dialogues = [
  "Tumhari smile literally brightens the room. ✨",
  "Aaj ka din special hai… just like you. 🌟",
  "Tumhari vibe → genuinely positive. 💫",
  "Birthday girl ho, toh thoda spotlight toh banta hai. 🎂",
  "You're effortlessly cool, honestly. 😎",
  "Tumhare saath baat karna = instant good mood. 🌸",
  "Hope this website made you smile today. 😊",
  "You make everything better just by being you. 💖",
  "Duniya mein teri jaisi koi nahi. 🦋",
  "Stay amazing, stay you. Always. ⭐",
  "Tumhari energy is contagious in the best way. ☀️",
  "You deserve all the happiness in the world. 🌈",
  "Tera har din aise hi khaas ho. 💝",
  "Being around you is always refreshing. 🍃",
  "Here's to another year of you being awesome! 🎉",
  "May all your dreams come true this year. 🌙",
];

const DialogueSection = () => {
  const [selectedDialogue, setSelectedDialogue] = useState<string | null>(null);
  const [typedText, setTypedText] = useState('');
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  const openDialogue = (dialogue: string) => {
    setSelectedDialogue(dialogue);
    setTypedText('');
    
    // Add floating hearts
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
    }));
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 3000);

    // Typing effect
    let index = 0;
    const interval = setInterval(() => {
      if (index < dialogue.length) {
        setTypedText(dialogue.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    // Play chime sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ==');
    audio.volume = 0.2;
    audio.play().catch(() => {});
  };

  const closeDialogue = () => {
    setSelectedDialogue(null);
    setTypedText('');
  };

  return (
    <section className="py-20 px-4" id="dialogues">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl neon-text mb-4">
          Sweet Messages 💬
        </h2>
        <p className="text-muted-foreground">Click a button to reveal a message</p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {dialogues.map((dialogue, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openDialogue(dialogue)}
            className="btn-glass flex items-center justify-center gap-2 py-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm">Message {index + 1}</span>
          </motion.button>
        ))}
      </div>

      {/* Dialogue Modal */}
      <AnimatePresence>
        {selectedDialogue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeDialogue}
          >
            {/* Backdrop blur */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

            {/* Floating hearts */}
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -200 }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                className="absolute bottom-20"
                style={{ left: `${heart.x}%` }}
              >
                <Heart className="w-6 h-6 text-primary fill-primary" />
              </motion.div>
            ))}

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-card p-8 md:p-12 max-w-lg w-full neon-glow"
            >
              <button
                onClick={closeDialogue}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <Heart className="w-12 h-12 text-primary fill-primary mx-auto mb-6 animate-pulse" />
                <p className="text-xl md:text-2xl font-display leading-relaxed">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DialogueSection;
