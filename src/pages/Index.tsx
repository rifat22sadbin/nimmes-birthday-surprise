import ParticleBackground from '@/components/ParticleBackground';
import MusicPlayer from '@/components/MusicPlayer';
import HeroSection from '@/components/HeroSection';
import ImageGallery from '@/components/ImageGallery';
import InteractiveCake from '@/components/InteractiveCake';
import DialogueSection from '@/components/DialogueSection';
import CelebrationMode from '@/components/CelebrationMode';
import SurpriseBoxes from '@/components/SurpriseBoxes';
import ScrollStory from '@/components/ScrollStory';
import SecretMessage from '@/components/SecretMessage';
import FloatingBalloons from '@/components/FloatingBalloons';
import MagicCursor from '@/components/MagicCursor';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Background effects */}
      <ParticleBackground />
      <FloatingBalloons />
      <MagicCursor />
      
      {/* Music player */}
      <MusicPlayer />

      {/* Main content */}
      <main className="relative z-20">
        <HeroSection />
        <ImageGallery />
        <InteractiveCake />
        <DialogueSection />
        <CelebrationMode />
        <SurpriseBoxes />
        <ScrollStory />
        <SecretMessage />

        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="text-muted-foreground">
            Made with 💖 just for you
          </p>
          <p className="text-sm text-muted-foreground/60 mt-2">
            Have the best birthday ever! ✨
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
