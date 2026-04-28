import { motion } from "framer-motion";
import AnimatedGradientText from "../components/AnimatedGradientText";
import { MarqueeWords } from "../components/MarqueeWords";

export default function Home() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-screen-xl px-4 py-12 mx-auto sm:px-6 sm:py-16"
    >
      <div className="flex items-center justify-center">
        <div className="text-center max-w-prose">
          <AnimatedGradientText className="text-[clamp(2rem,6vw,3.5rem)] leading-tight">
            Darun Mustafa
          </AnimatedGradientText>
          <div className="w-full max-w-full mx-auto text-blue-400">
            <p className="mt-4 text-base sm:text-lg">
              Full-stack developer with 2+ years shipping real applications — React, Node.js, TypeScript, Docker. Background in operations means I build for reliability, not just functionality.
            </p>
            <p className="mt-4 text-base sm:text-lg">
              I&apos;ve shipped 5+ projects — a real-time IoT control system, an AI quiz 
              platform, and a portfolio management system. All live, all on GitHub.
            </p>
          </div>
          <div className="mt-6 w-full overflow-hidden min-w-0 mx-auto motion-safe:[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
           <MarqueeWords words={[
  "React", "TypeScript", "JavaScript", "Node.js", "Fastify",
  "Express", "Tailwind CSS", "HTML", "CSS",
  "PostgreSQL", "Prisma", "MongoDB", "Firebase",
  "Docker", "GitHub Actions", "Jest", "Swagger",
  "WebSockets", "MQTT", "Netlify", "Render",
  "JWT", "REST APIs", "Gemini LLM",
  "Prompt Engineering", "LLM Integration", "AI Pipelines"
]} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
