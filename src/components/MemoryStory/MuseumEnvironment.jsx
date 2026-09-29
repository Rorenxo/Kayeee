export default function MuseumEnvironment() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      style={{
        backgroundColor: "#0B0B0E",
      }}
    >
      {/* 1. Subtle wall texture / ambient depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(255, 245, 225, 0.035) 0%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />

      {/* 2. Ceiling Spotlight Track Line */}
      <div
        className="absolute top-0 left-0 right-0 h-10 border-b border-white/[0.04]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(11, 11, 14, 0.3) 100%)",
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-amber-500/10 via-amber-200/20 to-amber-500/10" />
      </div>

      {/* 3. Continuous Hardwood Gallery Floor Baseboard & Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[22%] border-t border-[#23211e]">
        {/* Floor subtle reflection plane */}
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(180deg, #141316 0%, #0c0b0d 50%, #070708 100%)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
          }}
        />
        {/* Soft floor light bounce */}
        <div
          className="absolute top-0 left-0 right-0 h-16"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 235, 195, 0.04) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* 4. Cinematic edge vignetting */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 100px 20px rgba(0, 0, 0, 0.85)",
        }}
      />
    </div>
  );
}
