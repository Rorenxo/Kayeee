import { motion } from "framer-motion";

export default function MuseumFrame({
  memory,
  index,
  isActive,
  isNear,
  onClick,
}) {
  const {
    image,
    alt,
    roman,
    title,
    text,
    frameAspect = "portrait",
    offsetY = 0,
  } = memory;

  const isMayon = frameAspect === "mayon";

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-center cursor-pointer select-none px-4"
      style={{
        transform: `translateY(${offsetY}px)`,
        width: "100vw",
        height: "100%",
        flexShrink: 0,
      }}
    >
      {/* 1. Overhead Museum Spotlight Glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 sm:-top-28 left-1/2 -translate-x-1/2 w-[320px] sm:w-[460px] h-[340px] sm:h-[440px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 15%, rgba(255, 235, 195, 0.22) 0%, rgba(255, 235, 195, 0.05) 45%, transparent 75%)",
        }}
        animate={{
          opacity: isActive ? 1 : isNear ? 0.35 : 0.08,
          scale: isActive ? 1.05 : 0.92,
        }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      {/* 2. Main Frame & Unified Caption Container */}
      <motion.div
        className="relative flex flex-col items-center w-full max-w-[360px]"
        animate={{
          scale: isActive ? 1.02 : 0.92,
          opacity: isActive ? 1 : isNear ? 0.42 : 0.12,
          filter: isActive
            ? "blur(0px) brightness(1)"
            : isNear
            ? "blur(1px) brightness(0.65)"
            : "blur(2.5px) brightness(0.35)",
        }}
        transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Physical Museum Frame */}
        <div
          className={`relative overflow-hidden rounded-[4px] bg-[#161514] p-2.5 sm:p-3 transition-shadow duration-700 ${
            isMayon
              ? "w-[76vw] max-w-[300px] sm:max-w-[340px] aspect-[4/3]"
              : "w-[68vw] max-w-[260px] sm:max-w-[290px] aspect-[3/4]"
          }`}
          style={{
            boxShadow: isActive
              ? "0 24px 60px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(212, 175, 55, 0.08), inset 0 0 0 1px rgba(255, 235, 190, 0.15)"
              : "0 16px 36px -10px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          {/* Archival Museum Passe-Partout / Matting */}
          <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-[#EDE7DC] p-2 sm:p-2.5 shadow-inner">
            {/* Fine Art Photograph */}
            <div className="relative h-full w-full overflow-hidden rounded-[1px] bg-[#0c0c0b]">
              <img
                src={image}
                alt={alt}
                loading={index <= 2 ? "eager" : "lazy"}
                decoding="async"
                className={`h-full w-full object-cover select-none ${
                  isMayon ? "object-[50%_25%]" : "object-center"
                }`}
                style={{
                  filter: "contrast(1.03) brightness(0.98)",
                }}
              />
              {/* Subtle glass reflection */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 40%, rgba(255, 255, 255, 0.02) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Museum Brass Plaque */}
        <div
          className="mt-3 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-[2px] bg-[#181715] border border-[#383327] shadow-sm select-none"
          style={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.6)",
          }}
        >
          <span
            className="text-[0.62rem] uppercase font-semibold tracking-[0.22em]"
            style={{
              color: "#DFCDB4",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            {roman} · {title}
          </span>
        </div>

        {/* Unified Curated Caption with Proper Symmetric Padding */}
        <motion.div
          className="mt-3.5 sm:mt-4 w-full px-4 sm:px-6 text-center"
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 8,
          }}
          transition={{
            duration: 0.75,
            delay: isActive ? 0.2 : 0,
            ease: "easeOut",
          }}
        >
          <p
            className="text-[0.98rem] sm:text-[1.12rem] italic font-light whitespace-pre-line leading-relaxed"
            style={{
              color: "#F5F2EA",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              textShadow: "0 2px 12px rgba(0, 0, 0, 0.9)",
            }}
          >
            {text}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
