import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CassetteTape from "./CassetteTape";

// Floating ambient bokeh particles for a cozy, dreamy environment
const FLOATING_PARTICLES = [
  { id: 1, top: "12%", left: "10%", size: 6, duration: 6.5, delay: 0 },
  { id: 2, top: "25%", left: "85%", size: 8, duration: 8.2, delay: 1.2 },
  { id: 3, top: "45%", left: "15%", size: 5, duration: 7.1, delay: 2.5 },
  { id: 4, top: "60%", left: "88%", size: 7, duration: 9.0, delay: 0.8 },
  { id: 5, top: "78%", left: "8%", size: 6, duration: 7.8, delay: 3.1 },
  { id: 6, top: "88%", left: "80%", size: 5, duration: 8.5, delay: 1.7 },
];

export default function LoveLetter({
  onVoiceMessagePlayStateChange,
  onOutroStart,
}) {
  const [showOutro, setShowOutro] = useState(false);
  const [showOutroMessage, setShowOutroMessage] = useState(false);
  const [isFadingOutFinal, setIsFadingOutFinal] = useState(false);

  const handleVoiceEnded = () => {
    onOutroStart?.();
    setShowOutro(true);
    setTimeout(() => {
      setShowOutroMessage(true);
    }, 900);
    setTimeout(() => {
      setIsFadingOutFinal(true);
    }, 7000);
  };

  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden py-16 px-4 sm:px-6 flex flex-col items-center select-none"
      style={{
        backgroundColor: "#F4EFE6",
        color: "#6B4C3A",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(224, 196, 155, 0.35) 0%, rgba(244, 239, 230, 0) 70%)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(214, 185, 142, 0.22) 0%, transparent 65%)",
          }}
        />
        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#C4B39A]/40"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 10px rgba(196, 179, 154, 0.6)",
            }}
            animate={{
              y: [0, -18, 0],
              x: [0, 8, 0],
              opacity: [0.3, 0.75, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-8"
        >
          <span
            className="text-[0.68rem] sm:text-xs uppercase tracking-[0.32em] font-semibold"
            style={{ color: "#8D6F5E", fontFamily: "Inter, system-ui, sans-serif" }}
          >
            A LETTER FOR YOU
          </span>
          <h1
            className="mt-2.5 text-2xl sm:text-3xl font-light"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "#6B4C3A",
            }}
          >
            To My Favorite Person
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-8 h-[1px] bg-[#C4B39A]/60" />
            <span className="text-xs text-[#8D6F5E]">Kaye</span>
            <div className="w-8 h-[1px] bg-[#C4B39A]/60" />
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="relative w-full rounded-2xl bg-[#FCFAF5] p-6 sm:p-10 shadow-2xl border border-[#E8DFD1] mb-12"
          style={{
            boxShadow:
              "0 24px 55px -12px rgba(107, 76, 58, 0.18), 0 3px 12px rgba(107, 76, 58, 0.06)",
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 31px, rgba(196, 179, 154, 0.12) 31px, rgba(196, 179, 154, 0.12) 32px)",
            backgroundAttachment: "local",
          }}
        >
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col items-center opacity-85 pointer-events-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8C4638] border-2 border-[#733529] shadow-md flex items-center justify-center text-white text-xs font-serif font-bold">
            </div>
            <span
              className="text-[0.52rem] uppercase tracking-widest font-semibold mt-0.5 text-[#8C4638]"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              SEALED
            </span>
          </div>
          <div className="pointer-events-none absolute inset-2.5 sm:inset-3.5 rounded-xl border border-[#EFE7DB]" />
          <div
            className="relative flex flex-col gap-6 text-[1.32rem] sm:text-[1.52rem] leading-[1.65]"
            style={{
              fontFamily: "'Caveat', cursive",
              color: "#38271C",
              fontWeight: 500,
            }}
          >
            <p className="text-[1.48rem] sm:text-[1.68rem] font-semibold text-[#5A3C2B]">
              Hi babe,
            </p>

            <p>
              Thank you for staying, kahit may mga panahong hindi naging madali ang lahat. Thank you for understanding me, for being patient with me, and for choosing to stay kahit alam kong may mga bagay akong hindi naging perfect.
            </p>

            <p>
              I appreciate every little thing you do, every time you choose to understand instead of leaving, and every moment you choose us despite the distance and the hard days.
            </p>

            <p>
              Hindi ko man maibigay lahat ng deserve mo ngayon, I promise I’ll keep doing everything I can to become the person who deserves the love you’ve given me. I love you more than words could ever explain.
            </p>

            <div className="mt-1 pt-2 border-t border-[#E8DFD1]/60">
              <p
                className="text-[1.2rem] sm:text-[1.38rem] italic text-[#6B4C3A]"
                style={{ fontWeight: 600 }}
              >
                PS: Pakinggan mo yung voice message ko sa baba para sayo.
              </p>
            </div>

            {/* Handwritten Signature */}
            <div className="mt-3 flex flex-col items-end">
              <span
                className="text-[1.15rem] sm:text-[1.28rem] italic text-[#8D6F5E]"
                style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}
              >
                Always and forever,
              </span>
              <span
                className="text-[1.85rem] sm:text-[2.1rem] font-bold text-[#6B4C3A] -mt-1"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Lourence
              </span>
            </div>
          </div>
        </motion.article>

        {/* 4. Voice Memo Section with Vintage Cassette Tape */}
        <motion.section
          aria-label="Voice memo player"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="w-full flex flex-col items-center text-center mt-2 mb-16"
        >
          <div className="mb-6 flex flex-col items-center">
            <span
              className="text-[0.68rem] sm:text-xs uppercase tracking-[0.28em] font-semibold text-[#8D6F5E]"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              RECORDED VOICE MESSAGE
            </span>
            <p
              className="mt-1 text-sm sm:text-base italic text-[#6B4C3A]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Press play to listen to my voice message for you
            </p>
          </div>
          <CassetteTape
            audioSrc="/message.m4a"
            title="Kaye, Listen to this"
            subtitle="Oct 3, 2026"
            onPlayStateChange={onVoiceMessagePlayStateChange}
            onEnded={handleVoiceEnded}
          />
        </motion.section>

        {/* 5. Footer Note */}
        <div className="text-center pb-8 opacity-60">
          <p
            className="text-xs uppercase tracking-[0.22em] text-[#8D6F5E]"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Lorenxo and Kaye
          </p>
        </div>
      </div>
      <AnimatePresence>
        {showOutro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 text-center select-none"
          >
            {showOutroMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{
                  opacity: isFadingOutFinal ? 0 : 1,
                  y: isFadingOutFinal ? -10 : 0,
                  scale: isFadingOutFinal ? 0.98 : 1,
                }}
                transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col items-center max-w-md"
              >
                <span
                  className="text-xs uppercase tracking-[0.35em] font-light"
                  style={{
                    color: "#C4B39A",
                    fontFamily: "Inter, system-ui, sans-serif",
                    opacity: 0.85,
                  }}
                >
                  OCTOBER 3, 2026
                </span>

                <h2
                  className="mt-6 text-2xl sm:text-3xl font-light leading-relaxed whitespace-pre-line"
                  style={{
                    color: "#F5F2EA",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                  }}
                >
                  Thank you for choosing me,{"\n"}and happy monthsary babe.
                </h2>

                <p
                  className="mt-8 text-base sm:text-lg italic font-light"
                  style={{
                    color: "#C4B39A",
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "1.4rem",
                  }}
                >
                  Always and forever, Lourence
                </p>

                <p
                  className="mt-12 text-[0.72rem] sm:text-xs uppercase tracking-[0.32em] opacity-40 font-mono select-none"
                  style={{
                    color: "#C4B39A",
                  }}
                >
                   ------- The End -------
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
