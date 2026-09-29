import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TypewriterText from "./typewriter";

const CREAM = "#F4EFE6";
const SECONDARY = "#C4B39A";

const SCENES = [
  {
    lines: ["Some stories begin with a coincidence."],
    pause: 700,
  },
  {
    lines: ["Ours began with a game."],
    pause: 700,
  },
  {
    lines: ["Two strangers.", "Who happened to play together."],
    pause: 850,
  },
  {
    lines: [
      "We started as nothing more than teammates,",
      "then became friends...",
      "and somewhere along the way,",
      "you became someone special.",
    ],
    pause: 1600,
  },
  {
    lines: [
      "From a simple game,",
      "to countless conversations,",
      "to something neither of us expected.",
    ],
    pause: 2500,
  },
];

const FINAL_SCENE = {
  lines: ["And this...", "is where our story begins."],
  pause: 1800,
};

export default function FiveClickIntro({ onComplete, onFinalScene }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [showTapPrompt, setShowTapPrompt] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const promptTimer = useRef();
  const finalTimer = useRef();
  const isFinal = sceneIndex === SCENES.length;
  const scene = isFinal ? FINAL_SCENE : SCENES[sceneIndex];

  useEffect(() => {
    return () => {
      clearTimeout(promptTimer.current);
      clearTimeout(finalTimer.current);
    };
  }, []);

  const handleTypingComplete = () => {
    clearTimeout(promptTimer.current);
    clearTimeout(finalTimer.current);
    setCanContinue(true);

    if (isFinal) {
      finalTimer.current = setTimeout(onComplete, scene.pause);
      return;
    }

    promptTimer.current = setTimeout(() => {
      setShowTapPrompt(true);
    }, 600);
  };

  const continueScene = () => {
    if (isFinal || !canContinue) return;
    clearTimeout(promptTimer.current);
    setShowTapPrompt(false);
    setCanContinue(false);
    setSceneIndex((current) => current + 1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (canContinue) {
        continueScene();
      }
    }
  };

  return (
    <main
      role="button"
      tabIndex={isFinal || !canContinue ? -1 : 0}
      aria-label={isFinal ? "Final story message" : "Tap to continue the story"}
      aria-disabled={isFinal || !canContinue}
      onClick={continueScene}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 flex items-center justify-center overflow-hidden px-8 text-center"
      style={{
        minHeight: "100dvh",
        backgroundColor: "#000000",
        color: CREAM,
        cursor: isFinal ? "default" : canContinue ? "pointer" : "default",
      }}
    >
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIndex}
            className="flex min-h-48 flex-col items-center justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <TypewriterText
              key={sceneIndex}
              lines={scene.lines}
              speed={isFinal ? 72 : sceneIndex === 3 ? 78 : 58}
              linePause={sceneIndex === 3 ? 950 : 700}
              startDelay={450}
              onLineStart={(lineIndex) => {
                if (isFinal && lineIndex === 1) {
                  onFinalScene?.();
                }
              }}
              onDone={handleTypingComplete}
              lineStyles={scene.lines.map((_, index) => ({
                marginTop: index === 0 ? 0 : "0.45rem",
                color: isFinal && index === 1 ? CREAM : index === 0 ? CREAM : SECONDARY,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: isFinal && index === 1 ? "clamp(1.65rem, 7.5vw, 2.8rem)" : "clamp(1.45rem, 6.2vw, 2.35rem)",
                fontWeight: isFinal && index === 1 ? 500 : 400,
                lineHeight: 1.25,
                textWrap: "balance",
              }))}
              className="w-full"
            />
            <AnimatePresence>
              {showTapPrompt && !isFinal && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: [0.35, 0.8, 0.35], y: [5, 0, 5] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="mt-14 text-xs uppercase tracking-[0.18em]"
                  style={{ color: SECONDARY, fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  tap to continue
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}