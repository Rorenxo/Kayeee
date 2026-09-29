import { motion } from "framer-motion";

export default function StoryTransition({ children }) {
  return (
    <div className="relative" style={{ minHeight: "100dvh", backgroundColor: "#F4EFE6" }}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2.4, delay: 0.2, ease: "easeInOut" }}
      />
    </div>
  );
}