import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CREAM = "#F4EFE6";
const BROWN = "#6B4C3A";

const DARKEN_DELAY = 0.6;
const DARKEN_TIME = 2.2;
const BLACK_PAUSE = 0.8;

export default function PortalIntro({ onEnter, onDone }) {
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef();

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const enter = () => {
    if (!ready || leaving) return;
    onEnter?.();
    setLeaving(true);
    timer.current = setTimeout(
      onDone,
      (DARKEN_DELAY + DARKEN_TIME + BLACK_PAUSE) * 500,
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      enter();
    }
  };

  return (
    <motion.main
      role="button"
      tabIndex={ready && !leaving ? 0 : -1}
      aria-label="Enter the private story"
      aria-disabled={!ready || leaving}
      onClick={enter}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 flex items-center justify-center overflow-hidden px-8 text-center"
      style={{ height: "100dvh", cursor: ready && !leaving ? "pointer" : "default" }}
      initial={{ backgroundColor: CREAM }}
      animate={{ backgroundColor: leaving ? "#000000" : CREAM }}
      transition={{
        duration: DARKEN_TIME,
        delay: leaving ? DARKEN_DELAY : 0,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="flex max-w-full flex-col items-center"
        animate={{ opacity: leaving ? 0 : 1, y: leaving ? -6 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <motion.h1
          className="font-light"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: BROWN,
            fontSize: "clamp(1.75rem, 8vw, 2.75rem)",
            lineHeight: 1.25,
            textWrap: "balance",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
        >
          I made a little place for you.
        </motion.h1>

        <motion.p
          className="mt-5 italic"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: BROWN,
            opacity: 0.8,
            fontSize: "clamp(1.25rem, 5.5vw, 1.75rem)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
        >
          Come in.
        </motion.p>

        <motion.span
          aria-hidden={!ready}
          className="mt-12 inline-flex min-h-12 items-center justify-center px-8 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            color: ready ? BROWN : "transparent",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: ready && !leaving ? 1 : 0, y: leaving ? -4 : 0, scale: leaving ? 0.96 : 1 }}
          transition={{ duration: leaving ? 0.4 : 1.4, delay: leaving ? 0 : 0.1, ease: "easeOut" }}
        >
          <motion.span
            animate={ready && !leaving ? { opacity: [0.55, 1, 0.55], y: [0, -2, 0] } : { opacity: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            Enter →
          </motion.span>
        </motion.span>
      </motion.div>
    </motion.main>
  );
}