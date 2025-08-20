import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

type Size = "sm" | "md" | "lg";

type Props = {
  src: string;
  alt?: string;
  size?: Size;
  className?: string;
  interactive?: boolean;   // tilt on desktop, drag on touch
  float?: boolean;         // idle bob
  calm?: boolean;          // force minimal motion regardless of system
};

const sizeMap: Record<Size, string> = {
  // Larger than before, but clamped so phones don't explode
  sm: "w-[clamp(8rem,22vw,11rem)] h-[clamp(8rem,22vw,11rem)]",
  md: "w-[clamp(11rem,28vw,18rem)] h-[clamp(11rem,28vw,18rem)]",
  lg: "w-[clamp(14rem,36vw,34rem)] h-[clamp(14rem,36vw,34rem)]",
};

export default function AvatarShowcase({
  src,
  alt = "Profile photo",
  size = "lg",
  className = "",
  interactive = true,
  float = true,
  calm = false,
}: Props) {
  const [hovered, setHovered] = useState(false);

  const isTouch = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
    []
  );
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reduceMotion = calm || prefersReduced;

  // Enhanced tilt, spring-damped
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-60, 60], [3, -3]);
  const ry = useTransform(mx, [-60, 60], [-3, 3]);
  const rxSpring = useSpring(rx, { stiffness: 150, damping: 25 });
  const rySpring = useSpring(ry, { stiffness: 150, damping: 25 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (rect.left + rect.width / 2));
    my.set(e.clientY - (rect.top + rect.height / 2));
  }, [interactive, isTouch, mx, my]);

  const resetTilt = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  // configurable rim thickness; safe on small screens
  const rim = "10px"; // tweak if you want a thicker/thinner gradient ring

  return (
    <div className={`relative mx-auto isolate ${className}`} style={{ ["--rim" as never]: rim }}>
      {/* ========== Background ORBS (pointer-safe, only when in view) ========== */}
      <motion.div
        className="absolute inset-0 -z-20 pointer-events-none"
        initial={false}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.5, once: false }}
      >
        {!reduceMotion && (
          <>
            <motion.div
              className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 blur-2xl opacity-40"
              animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 blur-2xl opacity-30"
              animate={{ scale: [1, 1.3, 1], x: [0, -35, 0], y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute top-1/2 -right-16 w-28 h-28 rounded-full bg-gradient-to-r from-orange-400 to-red-500 blur-xl opacity-25"
              animate={{ scale: [1, 1.4, 1], x: [0, -20, 0], rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}
      </motion.div>

      {/* ========== Outer glow (cheap) ========== */}
      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-60 pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, #ff6b9d, #4ecdc4, #45b7d1, #f9ca24, #ff6b9d)",
          }}
          animate={{ scale: [0.85, 1, 0.85], rotate: 360 }}
          transition={{
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
          aria-hidden
        />
      )}

      {/* ========== Main interactive container ========== */}
      <motion.div
        className="relative group cursor-pointer will-change-transform"
        style={
          interactive && !isTouch && !reduceMotion
            ? { rotateX: rxSpring, rotateY: rySpring, transformStyle: "preserve-3d", perspective: 1000 }
            : {}
        }
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); if (interactive && !isTouch) resetTilt(); }} 
        animate={!reduceMotion && float ? { y: [-6, 6, -6] } : {}}
        transition={!reduceMotion && float ? { duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } : {}}
      >
        {/* Rotating rings (cheap, no paint bombs) */}
        {!reduceMotion && (
          <>
            <motion.div
              className="absolute rounded-full opacity-75 pointer-events-none"
              style={{ inset: `calc(-1.5 * var(--rim))`, background: "linear-gradient(45deg, transparent 30%, rgba(255,107,157,.8), transparent 70%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute rounded-full opacity-60 pointer-events-none"
              style={{ inset: `calc(-0.75 * var(--rim))`, background: "linear-gradient(-45deg, transparent 40%, rgba(78,205,196,.8), transparent 60%)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </>
        )}

        {/* Photo + gradient rim — static shadow (no shadow animation) */}
        <div
          className={`relative ${sizeMap[size]} rounded-full overflow-hidden`}
          style={{ boxShadow: "0 20px 40px -12px rgba(0,0,0,.6)" }}
        >
          {/* Rim */}
          <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-pink-500 via-cyan-400 to-orange-400 pointer-events-none">
            <div className="w-full h-full rounded-full bg-slate-900/20 backdrop-blur-sm p-[2px]">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full rounded-full object-cover object-[50%_40%]"
                style={{ filter: hovered && !reduceMotion ? "contrast(1.15) saturate(1.2) brightness(1.06)" : "none" }}
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src = "/default-profile.png";
                }}
                draggable={false}
              />
            </div>
          </div>

          {/* Light sweep (translateX—cheap) */}
          {!reduceMotion && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "linear-gradient(120deg, rgba(255,255,255,.3) 0%, transparent 40%)" }}
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>

        {/* Particles only when hovered & in view */}
        <AnimatePresence>
          {!reduceMotion && hovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${15 + i * 10}%`,
                    top: `${20 + (i % 4) * 15}%`,
                    background: `hsl(${i * 45 + 200}, 70%, 60%)`,
                    boxShadow: `0 0 10px hsl(${i * 45 + 200}, 70%, 60%)`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], y: [-30, -60, -90], x: [0, Math.sin(i) * 20, Math.sin(i) * -20] }}
                  exit={{ scale: 0, opacity: 0 }} 
                  transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, repeatDelay: 1 }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}