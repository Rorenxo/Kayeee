import { motion, useReducedMotion } from "framer-motion";
import { defaultMayonData } from "./memoriesData";

export default function MayonSection({ data = defaultMayonData, onProceedToLetter }) {
  const shouldReduceMotion = useReducedMotion();

  const {
    image,
    alt = "Mount Mayon Volcano",
    prePauseText = "AND THEN, THERE WAS MAYON.",
    title = "MAYON",
    subtitle = "“Our little symbol.”",
    finalText = "FOR YOU",
  } = data;

  return (
    <section className="relative w-full flex flex-col items-center">
      {/* 1. Visual Pause Section */}
      <div
        className="flex min-h-[75dvh] w-full flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "#F4EFE6" }}
      >
        <motion.p
          className="text-xs sm:text-sm uppercase tracking-[0.26em]"
          style={{
            color: "#8D6F5E",
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 500,
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {prePauseText}
        </motion.p>
      </div>

      {/* 2. Grand Cinematic Mayon Reveal */}
      <div
        className="flex min-h-[90dvh] w-full flex-col items-center justify-center px-4 sm:px-8 py-16"
        style={{ backgroundColor: "#F4EFE6" }}
      >
        <motion.div
          className="relative w-full max-w-2xl overflow-hidden rounded-[4px] bg-[#FFFFFF] p-2 sm:p-2.5"
          style={{
            boxShadow:
              "0 24px 50px -15px rgba(107, 76, 58, 0.25), 0 4px 16px -2px rgba(107, 76, 58, 0.12), 0 0 1px 1px rgba(107, 76, 58, 0.08)",
            border: "1px solid rgba(196, 179, 154, 0.4)",
          }}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.96, y: 30 }
          }
          whileInView={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-[2px] bg-[#EDE7DC]">
            <motion.img
              src={image}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover select-none"
              initial={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileInView={shouldReduceMotion ? {} : { scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 3.5, ease: "easeOut" }}
            />
            {/* Subtle natural warmth depth */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: "inset 0 0 24px rgba(107, 76, 58, 0.1)",
              }}
            />
          </div>
        </motion.div>

        {/* Mayon Minimal Typography */}
        <motion.div
          className="mt-8 flex flex-col items-center text-center px-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          <h3
            className="text-lg sm:text-xl font-semibold tracking-[0.24em] uppercase"
            style={{
              color: "#6B4C3A",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {title}
          </h3>
          <p
            className="mt-2 text-base sm:text-lg italic font-light"
            style={{
              color: "#8D6F5E",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* 3. Quiet Transition Toward Love Letter */}
      <div
        className="flex min-h-[85dvh] w-full flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "#F4EFE6" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <p
            className="text-sm sm:text-base uppercase tracking-[0.3em] font-medium"
            style={{
              color: "#6B4C3A",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {finalText}
          </p>

          {/* Gentle action cue leading to the love letter */}
          {onProceedToLetter && (
            <motion.button
              type="button"
              onClick={onProceedToLetter}
              className="mt-12 group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer"
              style={{
                color: "#6B4C3A",
                border: "1px solid rgba(107, 76, 58, 0.3)",
                backgroundColor: "rgba(107, 76, 58, 0.04)",
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 500,
              }}
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(107, 76, 58, 0.6)",
                backgroundColor: "rgba(107, 76, 58, 0.08)",
                color: "#6B4C3A",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Read the letter</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
