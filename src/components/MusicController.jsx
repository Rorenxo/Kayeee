import { useEffect, useRef } from "react";

const YOUTUBE_VIDEO_ID = "6YAF3ayyeE4";

export default function MusicController({ active, ducked = false, fadeOut = false }) {
  const audioRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const isYtReadyRef = useRef(false);
  const fadeIntervalRef = useRef(null);

  // 1. Setup HTML5 Audio element for downloaded MP3 file (e.g. public/music.mp3)
  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = ducked ? 0.1 : 0.6;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Adjust volume dynamically when ducked state changes (keeps 10% volume during voice memo)
  useEffect(() => {
    if (fadeOut) return;
    if (audioRef.current) {
      audioRef.current.volume = ducked ? 0.1 : 0.6;
    }
    if (ytPlayerRef.current && isYtReadyRef.current) {
      try {
        ytPlayerRef.current.setVolume(ducked ? 10 : 50);
      } catch {}
    }
  }, [ducked, fadeOut]);

  // Smooth fade out when ending screen appears
  useEffect(() => {
    if (!fadeOut) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        if (audioRef.current.volume > 0.015) {
          audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.015);
        } else {
          audioRef.current.volume = 0;
          audioRef.current.pause();
          clearInterval(fadeIntervalRef.current);
        }
      }

      if (ytPlayerRef.current && isYtReadyRef.current) {
        try {
          const cur = ytPlayerRef.current.getVolume();
          if (cur > 2) {
            ytPlayerRef.current.setVolume(cur - 2);
          } else {
            ytPlayerRef.current.pauseVideo();
            clearInterval(fadeIntervalRef.current);
          }
        } catch {}
      }
    }, 120);

    return () => clearInterval(fadeIntervalRef.current);
  }, [fadeOut]);

  // 2. Setup Invisible YouTube Player as alternative/fallback
  useEffect(() => {
    const initYT = () => {
      if (!window.YT || !window.YT.Player || ytPlayerRef.current) return;

      try {
        ytPlayerRef.current = new window.YT.Player("invisible-yt-player", {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            playsinline: 1,
            rel: 0,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              isYtReadyRef.current = true;
              event.target.unMute();
              event.target.setVolume(50);
              if (active) {
                event.target.playVideo();
              }
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      } catch {}
    };

    if (window.YT && window.YT.Player) {
      initYT();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === "function") prevCallback();
        initYT();
      };

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.head.appendChild(tag);
      }
    }

    return () => {
      if (ytPlayerRef.current?.destroy) {
        try {
          ytPlayerRef.current.destroy();
          ytPlayerRef.current = null;
        } catch {}
      }
    };
  }, [active]);

  // 3. Play audio automatically when active
  useEffect(() => {
    if (!active) return;

    const playSound = () => {
      // First try local HTML5 audio (public/music.mp3)
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If local file is missing or blocked, trigger YouTube player
            if (ytPlayerRef.current && isYtReadyRef.current) {
              try {
                ytPlayerRef.current.unMute();
                ytPlayerRef.current.setVolume(50);
                ytPlayerRef.current.playVideo();
              } catch {}
            }
          });
        }
      }
    };

    playSound();

    // Unlock on any user tap / click if browser blocked first attempt
    const unlockOnInteraction = () => {
      playSound();
    };

    window.addEventListener("click", unlockOnInteraction, { passive: true });
    window.addEventListener("touchstart", unlockOnInteraction, { passive: true });
    window.addEventListener("keydown", unlockOnInteraction, { passive: true });

    return () => {
      window.removeEventListener("click", unlockOnInteraction);
      window.removeEventListener("touchstart", unlockOnInteraction);
      window.removeEventListener("keydown", unlockOnInteraction);
    };
  }, [active]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        width: "100px",
        height: "100px",
        overflow: "hidden",
        opacity: 0.001,
        pointerEvents: "none",
        zIndex: -999,
      }}
    >
      <div id="invisible-yt-player" />
    </div>
  );
}
