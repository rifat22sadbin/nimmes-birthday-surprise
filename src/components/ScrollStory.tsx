import { motion } from 'framer-motion';

const storyLines = [
  { text: "Nimme, thanks for being such a good person.", emoji: "🙏" },
  { text: "You genuinely make everyone's day better.", emoji: "☀️" },
  { text: "Nimme, your presence is a gift to everyone around you.", emoji: "🎁" },
  { text: "You bring joy wherever you go.", emoji: "🌈" },
  { text: "Here's a small surprise for your birthday, Nimme…", emoji: "🎂" },
];

const ScrollStory = () => {
  return (
    <section className="py-32 px-4 relative overflow-hidden" id="story">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(320 100% 60% / 0.2), transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-4xl md:text-5xl neon-text">
          A Little Story 📜
        </h2>
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-24">
        {storyLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
              className="text-5xl mb-6"
            >
              {line.emoji}
            </motion.div>
            <p className="font-display text-2xl md:text-3xl leading-relaxed text-gradient">
              {line.text}
            </p>
            
            {/* Sparkle decorations */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex justify-center gap-4 mt-4"
            >
              {['✨', '💫', '✨'].map((sparkle, i) => (
                <motion.span
                  key={i}
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="text-lg"
                >
                  {sparkle}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ScrollStory;
