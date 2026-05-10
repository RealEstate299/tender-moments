import { useEffect, useRef, useState } from "react";
import { Heart, Pause, Play, Volume2, VolumeX } from "lucide-react";

const SONG_URL =
  "https://cdn.pixabay.com/download/audio/2022/10/30/audio_347111d265.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3";
// Soft instrumental fallback. Replace with any preferred track.

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.55;
    audio.loop = true;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setNeedsTap(true));
  }, []);

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

  return (
    <div className="flex flex-col items-center gap-4">
      <audio ref={audioRef} src={SONG_URL} preload="auto" />
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
  );
}
