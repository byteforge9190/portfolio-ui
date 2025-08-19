import { motion } from "framer-motion";

export function MarqueeWords({ words }: { words: string[] }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="w-[200%]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="inline-block mx-3 text-sm sm:text-base md:text-lg uppercase tracking-widest bg-[linear-gradient(45deg,#8A2BE2,#FF2D55,#FF8A00,#40E0D0,#8A2BE2)] bg-[length:200%_200%] bg-clip-text text-transparent motion-safe:animate-gradient"
          >
            {w}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
