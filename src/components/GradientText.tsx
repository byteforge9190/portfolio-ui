import { motion } from "framer-motion";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function GradientText({
  children,
  className = "",
  animate = true,
}: GradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-pink-500 via-cyan-400 to-orange-400 bg-clip-text text-transparent font-bold ${className}`}
      style={{
        backgroundSize: animate ? "200% 100%" : "100% 100%",
      }}
      animate={animate ? {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      } : {}}
      transition={animate ? {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      } : {}}
    >
      {children}
    </motion.span>
  );
}
