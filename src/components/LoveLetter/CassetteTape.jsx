import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, RotateCcw } from "lucide-react";

export default function CassetteTape({
  audioSrc = "/message.m4a",
  title = "A Special Message",
  subtitle = "For You ❤️",
  onPlayStateChange,
  onEnded,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.preload = "auto";
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onPlayStateChange?.(false);
      onEnded?.();
    };

    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.src = "";
    };
  }, [audioSrc, onPlayStateChange]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      onPlayStateChange?.(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          onPlayStateChange?.(true);
        })
        .catch((err) => {
          console.warn("Audio play blocked or failed:", err);
        });
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col items-center w-full max-w-[340px] sm:max-w-[380px] mx-auto select-none">
      {/* 1. Vintage Cassette Shell */}
      <motion.div
        onClick={togglePlay}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-full aspect-[1.58/1] rounded-xl bg-[#1a1918] p-3 shadow-2xl cursor-pointer transition-shadow duration-300"
        style={{
          boxShadow: isPlaying
            ? "0 22px 50px -10px rgba(107, 76, 58, 0.4), 0 0 25px rgba(212, 175, 55, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.12)"
            : "0 18px 40px -10px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.08)",
          backgroundImage:
            "radial-gradient(#282624 1px, transparent 1px), radial-gradient(#282624 1px, #1c1b1a 1px)",
          backgroundSize: "6px 6px",
          border: "2px solid #2d2b28",
        }}
      >
        {/* Corner Screws */}
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#52504c] border border-[#2b2a28] shadow-inner flex items-center justify-center">
          <div className="w-1 h-[1px] bg-[#1a1918]" />
        </div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#52504c] border border-[#2b2a28] shadow-inner flex items-center justify-center">
          <div className="w-1 h-[1px] bg-[#1a1918]" />
        </div>
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#52504c] border border-[#2b2a28] shadow-inner flex items-center justify-center">
          <div className="w-1 h-[1px] bg-[#1a1918]" />
        </div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#52504c] border border-[#2b2a28] shadow-inner flex items-center justify-center">
          <div className="w-1 h-[1px] bg-[#1a1918]" />
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#52504c] border border-[#2b2a28] shadow-inner flex items-center justify-center">
          <div className="w-1 h-[1px] bg-[#1a1918]" />
        </div>

        {/* Outer Label Outline */}
        <div className="relative w-full h-full rounded-lg bg-[#242321] border border-[#3b3834] overflow-hidden flex flex-col p-2.5 shadow-inner">
          {/* Top Vintage Cream Label */}
          <div className="relative w-full bg-[#ECE5D8] rounded-[3px] p-2 border border-[#d6ccb8] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#cfc4af] pb-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-wider text-[#3d3229]">
                  A
                </span>
                <span className="text-[0.55rem] font-semibold uppercase tracking-widest text-[#786b5f]">
                  INDEX
                </span>
              </div>
              <span className="text-[0.62rem] font-serif italic text-[#5c4a3d]">
                {subtitle}
              </span>
            </div>
            {/* Lined area for title */}
            <div className="pt-1 flex items-center justify-between">
              <span className="text-xs sm:text-[0.8rem] font-medium font-serif tracking-wide text-[#3d3229] truncate">
                {title}
              </span>
              <span className="text-[0.58rem] font-mono tracking-wider text-[#8a7a6c]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Middle Clear Cassette Window */}
          <div className="relative my-2 w-full flex-1 rounded bg-[#121110] border border-[#302e2b] shadow-inner overflow-hidden flex items-center justify-center px-4">
            {/* Dark Acrylic Tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

            {/* Magnetic Tape Spool Body */}
            <div className="relative w-full flex items-center justify-between z-10 px-3">
              {/* Left Spool */}
              <div className="relative w-12 h-12 rounded-full bg-[#2a2018] border border-[#3d2e22] shadow-md flex items-center justify-center overflow-hidden">
                {/* Magnetic Tape Thickness Left */}
                <div
                  className="absolute inset-1 rounded-full bg-[#3d2518]"
                  style={{
                    transform: `scale(${Math.max(0.65, 1 - (progressPercent / 100) * 0.35)})`,
                  }}
                />
                {/* White Toothed Hub Reel (SPINS WHEN PLAYING) */}
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "linear",
                  }}
                  className="relative w-8 h-8 rounded-full bg-[#F4F1EA] border border-[#D5CEC2] shadow-inner flex items-center justify-center"
                >
                  {/* 6 Gear Spokes/Teeth */}
                  {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <div
                      key={deg}
                      className="absolute w-1.5 h-3 bg-[#D8D0C3] rounded-sm"
                      style={{ transform: `rotate(${deg}deg)` }}
                    />
                  ))}
                  {/* Center Hole */}
                  <div className="relative w-3.5 h-3.5 rounded-full bg-[#121110] border border-[#8a8074]" />
                </motion.div>
              </div>

              {/* Center Tape Gauge / Level Lines */}
              <div className="flex flex-col items-center justify-center text-center opacity-70">
                <div className="flex items-center gap-1 mb-0.5">
                  <div className="w-1 h-2 bg-[#706a61]" />
                  <div className="w-1 h-3 bg-[#948c80]" />
                  <div className="w-1 h-2 bg-[#706a61]" />
                </div>
                <span className="text-[0.55rem] font-mono text-[#a39a8e] font-bold">
                  {isPlaying ? "PLAY" : "CHF60"}
                </span>
              </div>

              {/* Right Spool */}
              <div className="relative w-12 h-12 rounded-full bg-[#2a2018] border border-[#3d2e22] shadow-md flex items-center justify-center overflow-hidden">
                {/* Magnetic Tape Thickness Right */}
                <div
                  className="absolute inset-1 rounded-full bg-[#3d2518]"
                  style={{
                    transform: `scale(${Math.min(1, 0.65 + (progressPercent / 100) * 0.35)})`,
                  }}
                />
                {/* White Toothed Hub Reel (SPINS WHEN PLAYING) */}
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "linear",
                  }}
                  className="relative w-8 h-8 rounded-full bg-[#F4F1EA] border border-[#D5CEC2] shadow-inner flex items-center justify-center"
                >
                  {/* 6 Gear Spokes/Teeth */}
                  {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <div
                      key={deg}
                      className="absolute w-1.5 h-3 bg-[#D8D0C3] rounded-sm"
                      style={{ transform: `rotate(${deg}deg)` }}
                    />
                  ))}
                  {/* Center Hole */}
                  <div className="relative w-3.5 h-3.5 rounded-full bg-[#121110] border border-[#8a8074]" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Vintage Bronze Banner */}
          <div className="w-full bg-[#7a4f32] rounded-[2px] px-2 py-1 flex items-center justify-between border border-[#5e3c25]">
            <div className="flex flex-col">
              <span className="text-[0.6rem] font-black tracking-widest text-[#F5EFE6]">
                VOICE MEMO
              </span>
              <span className="text-[0.45rem] font-mono text-[#E2D2C1]">
                TYPE I (NORMAL)
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[0.5rem] font-mono text-[#F5EFE6]">
                ➡ 120µs EQ
              </span>
            </div>
            <span className="text-[0.75rem] font-black tracking-wider text-[#F5EFE6]">
              CHF60
            </span>
          </div>
        </div>

        {/* Play / Pause Floating Overlay Indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={false}
            animate={{
              scale: isPlaying ? 0.9 : 1,
              opacity: isPlaying ? 0 : 0.85,
            }}
            transition={{ duration: 0.25 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#F5EFE6] shadow-xl group-hover:opacity-100"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* 2. Interactive Audio Progress Bar & Control Row */}
      <div className="mt-4 w-full flex flex-col gap-2">
        {/* Progress Slider */}
        <div className="relative w-full flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercent || 0}
            onChange={handleSeek}
            aria-label="Seek voice memo"
            className="w-full h-1.5 bg-[#d6ccb8]/40 rounded-lg appearance-none cursor-pointer accent-[#6B4C3A]"
          />
        </div>

        {/* Time and Control Actions */}
        <div className="flex items-center justify-between text-xs text-[#8D6F5E] font-medium font-sans">
          <span>{formatTime(currentTime)}</span>
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#6B4C3A] text-[#F4EFE6] text-xs font-semibold shadow-md hover:bg-[#583e2f] active:scale-95 transition-all cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Message</span>
              </>
            )}
          </button>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
