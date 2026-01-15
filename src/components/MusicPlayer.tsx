import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  defaultVideoId?: string;
}

interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
  loadVideoById: (options: { videoId: string; startSeconds: number }) => void;
}

const MusicPlayer = ({ defaultVideoId = "Br6wuwH9UHM" }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [videoId, setVideoId] = useState(defaultVideoId);
  const [inputUrl, setInputUrl] = useState('');
  const playerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady: () => {
            console.log('YouTube player ready');
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              playerRef.current?.playVideo();
            }
          },
        },
      });
    };

    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && (playerRef.current as any).loadVideoById) {
      (playerRef.current as any).loadVideoById({
        videoId: videoId,
        startSeconds: 0,
      });
      if (!isPlaying) {
        setTimeout(() => playerRef.current?.pauseVideo(), 500);
      }
    }
  }, [videoId]);

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleUrlSubmit = () => {
    const id = extractVideoId(inputUrl);
    if (id) {
      setVideoId(id);
      setInputUrl('');
      setShowSettings(false);
    }
  };

  return (
    <>
      <div id="youtube-player" className="youtube-audio" />
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="flex flex-col items-end gap-2">
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-4 mb-2"
            >
              <p className="text-sm text-muted-foreground mb-2">Change Song</p>
              <input
                type="text"
                placeholder="Paste YouTube URL"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="bg-muted/50 border border-border rounded-lg px-3 py-2 text-sm w-48 mb-2"
              />
              <button
                onClick={handleUrlSubmit}
                className="btn-neon text-sm w-full py-2"
              >
                Update
              </button>
            </motion.div>
          )}
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="glass-card p-3 rounded-full hover:bg-muted/60 transition-all"
            >
              <Music className="w-5 h-5 text-secondary" />
            </button>
            
            <button
              onClick={togglePlay}
              className={`glass-card p-3 rounded-full transition-all ${
                isPlaying ? 'pulse-glow' : 'hover:bg-muted/60'
              }`}
            >
              {isPlaying ? (
                <Volume2 className="w-5 h-5 text-primary" />
              ) : (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
