import { motion, useReducedMotion } from "framer-motion";

export default function ScrollGuide() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Scroll guide"
      className="relative flex flex-col items-center justify-center text-center select-none"
      style={{
        minHeight: "72dvh",
        backgroundColor: "#F4EFE6",
      }}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Subtle bouncing arrow */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [0, -8, 0],
                  opacity: [0.6, 1, 0.6],
                }
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-2xl leading-none"
          style={{
            color: "#6B4C3A",
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 300,
          }}
        >
          ↑
        </motion.div>

        {/* Minimal text indicator */}
        <motion.span
          className="text-[0.72rem] tracking-[0.28em] uppercase"
          style={{
            color: "#8D6F5E",
            fontFamily: "Inter, system-ui, sans-serif",
            fontWeight: 500,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          scroll up
        </motion.span>
      </div>
    </section>
  );
}
