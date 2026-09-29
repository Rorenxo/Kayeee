import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import MuseumEnvironment from "./MuseumEnvironment";
import MuseumFrame from "./MuseumFrame";
import { museumMemories, finaleMessage } from "./memoriesData";

export default function MemoryStory({
  memories = museumMemories,
  onProceedToLetter,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExploreHint, setShowExploreHint] = useState(true);
  const [initialPullback, setInitialPullback] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showForYou, setShowForYou] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const total = memories.length;
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastWheelTime = useRef(0);

  // Smooth entrance: Start slightly pulled back, then smoothly focus on artwork 1
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialPullback(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const goTo = useCallback(
    (newIndex) => {
      if (isFinishing) return;
      setShowExploreHint(false);

      if (newIndex >= total) {
        // Reached end beyond Mayon -> trigger fade to black & final message
        setIsFinishing(true);
        setTimeout(() => setShowForYou(true), 600);
        return;
      }

      if (newIndex < 0) return;
      setCurrentIndex(newIndex);
    },
    [isFinishing, total]
  );

  // Keyboard navigation (Arrow keys & Space)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goTo(currentIndex + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(currentIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, goTo]);

  // Touch Swipe navigation (Mobile-first)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (isFinishing) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Must be a horizontal gesture with minimum threshold
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goTo(currentIndex + 1);
      } else {
        goTo(currentIndex - 1);
      }
    }
  };

  // Desktop Mouse Wheel navigation (smooth throttled)
  const handleWheel = (e) => {
    if (isFinishing) return;
    const now = Date.now();
    if (now - lastWheelTime.current < 500) return;

    if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
      lastWheelTime.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) {
        goTo(currentIndex + 1);
      } else {
        goTo(currentIndex - 1);
      }
    }
  };

  const activeMemory = memories[currentIndex] || memories[0];
  const targetZoom = initialPullback
    ? 0.94
    : activeMemory.zoom || 1.08;
  const targetY = -(activeMemory.offsetY || 0) * 0.35;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="fixed inset-0 h-[100dvh] w-full overflow-hidden bg-[#0B0B0E] select-none"
      style={{ touchAction: "none" }}
    >
      {/* 1. Museum Wall & Lighting Environment */}
      <MuseumEnvironment />

      {/* 2. Continuous Horizontal Camera Canvas */}
      <motion.div
        className="relative z-10 flex h-full w-full items-center"
        animate={{
          x: `-${currentIndex * 100}vw`,
          y: targetY,
        }}
        transition={{
          duration: 0.85,
          ease: [0.25, 1, 0.5, 1],
        }}
        style={{
          width: `${total * 100}vw`,
          willChange: "transform",
        }}
      >
        {memories.map((memory, index) => {
          const isActive = index === currentIndex;
          const isNear = Math.abs(index - currentIndex) === 1;

          return (
            <MuseumFrame
              key={memory.id || index}
              memory={memory}
              index={index}
              isActive={isActive}
              isNear={isNear}
              onClick={() => {
                if (!isActive) goTo(index);
              }}
            />
          );
        })}
      </motion.div>

      {/* 3. Unobtrusive Museum Progress Indicator (Top-Right) */}
      <div className="pointer-events-none fixed top-5 right-5 sm:top-7 sm:right-7 z-30">
        <span
          className="text-xs sm:text-[0.78rem] font-medium tracking-[0.25em] select-none"
          style={{
            color: "#C4B39A",
            fontFamily: "Inter, system-ui, sans-serif",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)",
          }}
        >
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* 4. Subtle "SWIPE TO EXPLORE" Initial Hint */}
      <AnimatePresence>
        {showExploreHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.35, 0.85, 0.35], y: [0, -3, 0] }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2"
          >
            <span
              className="text-[0.68rem] sm:text-xs uppercase tracking-[0.26em] font-medium"
              style={{
                color: "#C4B39A",
                fontFamily: "Inter, system-ui, sans-serif",
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              Swipe to explore →
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Left & Right Touch / Click Arrows for Easy Navigation */}
      {currentIndex > 0 && !isFinishing && (
        <button
          type="button"
          aria-label="Previous artwork"
          onClick={() => goTo(currentIndex - 1)}
          className="fixed left-1.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-white/40 hover:text-white/90 hover:bg-white/[0.06] active:scale-95 transition-all cursor-pointer"
        >
          <span className="text-xl sm:text-2xl">‹</span>
        </button>
      )}

      {currentIndex < total - 1 && !isFinishing && (
        <button
          type="button"
          aria-label="Next artwork"
          onClick={() => goTo(currentIndex + 1)}
          className="fixed right-1.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full text-white/40 hover:text-white/90 hover:bg-white/[0.06] active:scale-95 transition-all cursor-pointer"
        >
          <span className="text-xl sm:text-2xl">›</span>
        </button>
      )}

      {/* If on final Mayon piece, show prominent elegant button to transition */}
      {currentIndex === total - 1 && !isFinishing && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
        >
          <button
            type="button"
            onClick={() => goTo(total)}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.22em] transition-all duration-300 cursor-pointer shadow-xl active:scale-95"
            style={{
              color: "#F5F2EA",
              border: "1px solid rgba(223, 205, 180, 0.45)",
              backgroundColor: "rgba(20, 19, 18, 0.9)",
              backdropFilter: "blur(12px)",
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 500,
            }}
          >
            <span>Continue</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      )}

      {/* 6. Finale: Fade to Pitch Black + Message + Transition */}
      <AnimatePresence>
        {isFinishing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 text-center select-none"
          >
            {showForYou && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col items-center max-w-md"
              >
                <span
                  className="text-xs sm:text-sm uppercase tracking-[0.35em] font-light"
                  style={{
                    color: "#C4B39A",
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  {finaleMessage.tagline}
                </span>

                <p
                  className="mt-6 text-base sm:text-xl italic font-light whitespace-pre-line leading-relaxed"
                  style={{
                    color: "#F5F2EA",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {finaleMessage.message}
                </p>

                <motion.button
                  type="button"
                  onClick={() => onProceedToLetter?.()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.8 }}
                  className="mt-10 group inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs uppercase tracking-[0.24em] transition-all duration-300 cursor-pointer shadow-2xl"
                  style={{
                    color: "#F5F2EA",
                    border: "1px solid rgba(223, 205, 180, 0.5)",
                    backgroundColor: "rgba(25, 24, 22, 0.85)",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontWeight: 500,
                  }}
                  whileHover={{ scale: 1.04, borderColor: "rgba(223, 205, 180, 0.9)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span>{finaleMessage.buttonText}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
