import { memo, type JSX } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  intensity?: number; // for subtle scale breathing
};

export default memo(function AnimatedGradientText({
  children,
  as: Tag = "h1",
  className = "",
  intensity = 0.01,
}: Props) {
  return (
    <motion.span
      aria-label={typeof children === "string" ? children : undefined}
      className={[
        // Vibrant multi-stop gradient; wide background-size for smooth travel
        "relative inline-block bg-[linear-gradient(45deg,#8A2BE2,#FF2D55,#FF8A00,#40E0D0,#8A2BE2)]",
        "bg-[length:200%_200%] bg-clip-text text-transparent",
        "select-none",
        // Respect reduced motion
        "motion-safe:animate-gradient",
        className,
      ].join(" ")}
      // Subtle breathing so the text feels alive but not distracting
      initial={{ scale: 1 }}
      animate={{ scale: 1 + intensity }}
      transition={{ duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      // Progressive enhancement: fallback shows static gradient (no motion)
    >
      <Tag className="font-extrabold tracking-tight">{children}</Tag>
    </motion.span>
  );
});
