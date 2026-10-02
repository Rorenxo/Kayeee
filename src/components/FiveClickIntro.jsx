import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TypewriterText from "./typewriter";

const CREAM = "#F4EFE6";
const SECONDARY = "#C4B39A";

const SCENES = [
  {
    lines: [
      "Funny how some love stories start without you even knowing.",
      "Ours started with a simple game.",
    ],
    pause: 2200,
  },
  {
    lines: [
      "Somehow, we became a duo.",
      "Tapos, ayun...",
      "parang naging normal na na ikaw yung kasama ko.",
      "Hanggang sa nasanay na akong hinihintay kang mag-online.",
    ],
    pause: 2800,
  },
  {
    lines: [
      "Hanggang sa hindi na lang tayo naglalaro.",
      "Nag-uusap na rin tayo.",
      "About games, about life... about everything.",
      "And hindi nagtagal, naging magkaibigan tayo.",
    ],
    pause: 2800,
  },
  {
    lines: [
      "Then one ordinary night...",
      "habang busy ako sa work,",
      "you suddenly sent me a kiss.",
    ],
    pause: 2200,
  },
  {
    lines: [
      "Simple lang naman 'yun.",
      "Isang kiss lang.",
      "Pero I don't know...",
      "it felt different.",
    ],
    pause: 2400,
  },
  {
    lines: [
      "It started there...",
      "we started talking a little more.",
      "Looking for each other a little more.",
      "And somewhere between all those little moments,",
      "something started to grow.",
    ],
    pause: 3200,
  },
];

const FINAL_SCENE = {
  lines: ["And this...", "is where our story begins."],
  pause: 2200,
};

export default function FiveClickIntro({ onComplete, onFinalScene }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const advanceTimer = useRef();
  const isFinal = sceneIndex === SCENES.length;
  const scene = isFinal ? FINAL_SCENE : SCENES[sceneIndex];

  useEffect(() => {
    return () => {
      clearTimeout(advanceTimer.current);
    };
  }, []);

  const handleTypingComplete = () => {
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      if (isFinal) {
        onComplete?.();
      } else {
        setSceneIndex((current) => current + 1);
      }
    }, scene.pause);
  };

  return (
    <main
      role="region"
      aria-label="Story intro"
      aria-live="polite"
      className="fixed inset-0 flex items-center justify-center overflow-hidden px-8 text-center select-none"
      style={{
        minHeight: "100dvh",
        backgroundColor: "#000000",
        color: CREAM,
        cursor: "default",
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
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <TypewriterText
              key={sceneIndex}
              lines={scene.lines}
              speed={isFinal ? 55 : 48}
              linePause={700}
              startDelay={350}
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
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}