import { useEffect, useRef, useState } from "react";
import { Heart, Pause, Play, Volume2, VolumeX } from "lucide-react";

// Warm, royalty-free instrumental piano (Pixabay, free for commercial use).
const SONGS = [
  "https://cdn.pixabay.com/download/audio/2024/02/27/audio_71a16f9c79.mp3?filename=relaxing-piano-music-191708.mp3",
  "https://cdn.pixabay.com/download/audio/2022/10/18/audio_3eb15797b1.mp3?filename=relaxing-piano-117350.mp3",
  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=the-introvert-michael-kobrin-10959.mp3",
];

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [srcIndex, setSrcIndex] = useState(0);

  // Try to autoplay; if blocked, prompt for first interaction anywhere.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    audio.loop = true;

    const tryPlay = () => audio.play().then(() => setPlaying(true));

    tryPlay().catch(() => {
      setNeedsTap(true);
      const onFirstInteract = () => {
        tryPlay()
          .then(() => {
            setNeedsTap(false);
            cleanup();
          })
          .catch(() => {});
      };
      const cleanup = () => {
        window.removeEventListener("pointerdown", onFirstInteract);
        window.removeEventListener("keydown", onFirstInteract);
        window.removeEventListener("touchstart", onFirstInteract);
      };
      window.addEventListener("pointerdown", onFirstInteract, { once: true });
      window.addEventListener("keydown", onFirstInteract, { once: true });
      window.addEventListener("touchstart", onFirstInteract, { once: true });
      return cleanup;
    });
  }, [srcIndex]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
        setNeedsTap(false);
      } catch {
        /* ignore */
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const onError = () => {
    if (srcIndex < SONGS.length - 1) setSrcIndex((i) => i + 1);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <audio
          ref={audioRef}
          src={SONGS[srcIndex]}
          preload="auto"
          onError={onError}
          crossOrigin="anonymous"
        />
        <p className="text-base md:text-lg text-muted-foreground italic">
          A song for you, Mom <Heart className="inline w-4 h-4 text-primary fill-primary" />
        </p>
        <div
          className="flex items-center gap-3 px-6 py-4 rounded-full bg-card/80 backdrop-blur-md border border-border"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <button
            onClick={toggle}
            aria-label={playing ? "Pause music" : "Play music"}
            className="flex items-center justify-center w-14 h-14 rounded-full text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-glow)" }}
          >
            {playing ? (
              <Pause className="w-6 h-6" fill="currentColor" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
            )}
          </button>

          <div className="flex items-center gap-2 px-2">
            <Heart
              className={`w-6 h-6 text-primary fill-primary ${playing ? "heart-pulse" : ""}`}
            />
            <span className="font-medium text-foreground hidden sm:inline">
              {playing ? "Now playing" : needsTap ? "Tap to play" : "Paused"}
            </span>
          </div>

          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {needsTap && (
        <button
          onClick={toggle}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-card/95 backdrop-blur-md border border-border text-foreground font-medium flex items-center gap-2 animate-[fade-up_0.6s_ease-out]"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <Heart className="w-5 h-5 text-primary fill-primary heart-pulse" />
          Tap to play the song for Mom
        </button>
      )}
    </>
  );
}
