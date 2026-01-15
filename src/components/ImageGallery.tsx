import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

import gallery1 from '@/assets/gallery-1.jpeg';
import gallery2 from '@/assets/gallery-2.jpeg';
import gallery3 from '@/assets/gallery-3.jpeg';
import gallery4 from '@/assets/gallery-4.jpeg';
import gallery5 from '@/assets/gallery-5.jpeg';

const images = [gallery1, gallery2, gallery3, gallery4, gallery5];

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let newIndex = prev + newDirection;
      if (newIndex < 0) newIndex = images.length - 1;
      if (newIndex >= images.length) newIndex = 0;
      return newIndex;
    });
  };

  const handleImageClick = () => {
    paginate(1);
  };

  return (
    <section className="py-20 px-4" id="gallery">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-4xl md:text-5xl neon-text mb-4">
          Our Moments ✨
        </h2>
        <p className="text-muted-foreground">Click on the image to see more</p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="absolute cursor-pointer group"
              onClick={handleImageClick}
            >
              <div className="relative">
                <img
                  src={images[currentIndex]}
                  alt={`Memory ${currentIndex + 1}`}
                  className="w-full max-w-md md:max-w-lg rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    boxShadow: '0 0 40px rgba(255, 0, 255, 0.3), 0 0 80px rgba(0, 212, 255, 0.2)',
                  }}
                />
                
                {/* Heart glow on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-16 h-16 text-primary fill-primary animate-pulse" />
                </motion.div>

                {/* Neon border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 group-hover:border-primary transition-colors" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 z-10 glass-card p-3 rounded-full hover:bg-muted/60 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-primary" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 z-10 glass-card p-3 rounded-full hover:bg-muted/60 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-primary" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-8 shadow-lg shadow-primary/50'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
