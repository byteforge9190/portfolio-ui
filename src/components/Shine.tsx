export function Shine({ className = "" }) {
  return (
    <span
      className={[
        "pointer-events-none absolute inset-0",
        "bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.35),transparent_60%)]",
        "mix-blend-overlay motion-safe:animate-[gradientMove_9s_linear_infinite]",
        className,
      ].join(" ")}
      aria-hidden
    />
  );
}
