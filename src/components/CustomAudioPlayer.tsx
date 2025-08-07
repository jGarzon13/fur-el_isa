import { useEffect, useRef, useState } from "react";

interface CustomAudioPlayerProps {
  src: string;
  autoPlay?: boolean;
}

const CustomAudioPlayer = ({ src, autoPlay = true }: CustomAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setDuration(audio.duration);
      if (autoPlay) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {
          console.warn("Autoplay falló");
        });
      }
    };

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [src, autoPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => null);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md mt-6 transition-all duration-300">
      <audio ref={audioRef} src={src} preload="auto" />

      <div className="flex items-center gap-4 justify-between">
        <button
          onClick={togglePlay}
          className={`bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
            isPlaying ? "animate-pulse" : ""
          }`}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          className="w-full accent-red-500 transition-all duration-300"
        />

        <span className="text-sm text-red-700 w-12 text-right">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
