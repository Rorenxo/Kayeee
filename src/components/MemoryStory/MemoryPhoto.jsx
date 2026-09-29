import { motion, useReducedMotion } from "framer-motion";

export default function MemoryPhoto({ memory, index }) {
  const shouldReduceMotion = useReducedMotion();

  const {
    image,
    alt = "Memory photograph",
    position = "center",
    rotation = 0,
    size = "medium",
    spacing = "medium",
    caption,
    subcaption,
  } = memory;

  const sizeClasses = {
    small: "w-[70vw] max-w-[240px] sm:max-w-[260px]",
    medium: "w-[78vw] max-w-[290px] sm:max-w-[330px]",
    large: "w-[84vw] max-w-[340px] sm:max-w-[390px]",
  }[size] || "w-[78vw] max-w-[300px]";

  const positionClasses = {
    left: "mr-auto ml-1 sm:ml-4",
    "slight-left": "mr-auto ml-3 sm:ml-10",
    center: "mx-auto",
    "slight-right": "ml-auto mr-3 sm:mr-10",
    right: "ml-auto mr-1 sm:mr-4",
  }[position] || "mx-auto";

  const spacingClasses = {
    "extra-large": "mb-28 sm:mb-36",
    large: "mb-24 sm:mb-32",
    medium: "mb-20 sm:mb-24",
    tight: "mb-14 sm:mb-18",
  }[spacing] || "mb-20";

  const initialAnim = shouldReduceMotion
    ? { opacity: 0 }
    : {
      opacity: 0,
      scale: 0.94,
      y: 35,
      rotate: 0,
    };

  const whileInViewAnim = shouldReduceMotion
    ? { opacity: 1 }
    : {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: rotation,
    };

  return (
    <div className={`relative flex w-full justify-center ${spacingClasses}`}>
      <motion.div
        className={`${sizeClasses} ${positionClasses} flex flex-col items-center`}
        initial={initialAnim}
        whileInView={whileInViewAnim}
        viewport={{ once: true, amount: 0.22, margin: "0px 0px -40px 0px" }}
        transition={{
          duration: 1.05,
          ease: [0.22, 1, 0.36, 1],
          delay: index === 0 ? 0.15 : 0.05,
        }}
        style={{
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      >
        <div
          className="group relative w-full overflow-hidden rounded-[3px] bg-[#FFFFFF] p-[6px] sm:p-[8px]"
          style={{
            boxShadow:
              "0 18px 38px -10px rgba(107, 76, 58, 0.2), 0 4px 12px -2px rgba(107, 76, 58, 0.1), 0 0 1px 1px rgba(107, 76, 58, 0.06)",
            border: "1px solid rgba(196, 179, 154, 0.35)",
          }}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-[#EDE7DC]">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              style={{
                filter: "contrast(1.02) brightness(0.99)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: "inset 0 0 12px rgba(107, 76, 58, 0.08)",
              }}
            />
          </div>
        </div>
        {(caption || subcaption) && (
          <div className="mt-4 flex flex-col items-center text-center px-2">
            {caption && (
              <p
                className="text-[0.7rem] sm:text-[0.75rem] font-semibold tracking-[0.22em] uppercase"
                style={{
                  color: "#6B4C3A",
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity: 0.95,
                }}
              >
                {caption}
              </p>
            )}
            {subcaption && (
              <p
                className="mt-1 text-[0.96rem] sm:text-[1.02rem] italic font-light"
                style={{
                  color: "#000000ff",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  lineHeight: 1.3,
                }}
              >
                {subcaption}
              </p>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
