// tailwind.config.js
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        // subtle hue travel across a long gradient
        gradientMove: {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        floatY: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-8px)" },
        },
      },
      animation: {
        gradient: "gradientMove 12s ease-in-out infinite",
        float: "floatY 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}