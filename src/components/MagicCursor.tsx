import { useEffect, useRef } from 'react';

const MagicCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      // Create sparkle trail
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-trail';
      sparkle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #ff00ff, #00d4ff);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkle-fade 0.8s ease-out forwards;
      `;
      document.body.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 800);
    };

    const handleClick = () => {
      // Heart pulse effect on click
      const heart = document.createElement('div');
      heart.innerHTML = '💖';
      heart.style.cssText = `
        position: fixed;
        left: ${mousePos.current.x}px;
        top: ${mousePos.current.y}px;
        font-size: 24px;
        pointer-events: none;
        z-index: 9999;
        animation: heart-pop 0.6s ease-out forwards;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 600);
    };

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sparkle-fade {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 0;
        }
      }
      @keyframes heart-pop {
        0% {
          transform: translate(-50%, -50%) scale(0);
          opacity: 1;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.5);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -100%) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      style.remove();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-4 h-4 pointer-events-none z-[9998] hidden md:block"
      style={{
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, #ff00ff, transparent)',
        borderRadius: '50%',
        boxShadow: '0 0 20px #ff00ff, 0 0 40px #00d4ff',
      }}
    />
  );
};

export default MagicCursor;
