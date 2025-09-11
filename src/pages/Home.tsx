// src/pages/Home.tsx 
import { motion } from "framer-motion";
import AnimatedGradientText from "../components/AnimatedGradientText";
import { MarqueeWords } from "../components/MarqueeWords";

export default function Home() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto w-full max-w-screen-xl px-4 sm:px-6 py-12 sm:py-16"
    >
      <div className="flex items-center justify-center">
        <div className="text-center max-w-prose">
          <AnimatedGradientText className="text-[clamp(2rem,6vw,3.5rem)] leading-tight">
            Darun .A Mustafa
          </AnimatedGradientText>
          <div className="text-blue-400 w-full max-w-full mx-auto">
            <p className="mt-4 text-base sm:text-lg">
              I am a full-stack developer focused on building scalable, maintainable web applications with strong user experiences.
            </p>
            <p className="mt-4 text-base sm:text-lg">
              This portfolio demonstrates production-grade architecture: React frontend with TypeScript, custom Node.js API, JWT authentication, and automated deployment pipelines.
            </p>
          </div>
          <div className="mt-6 w-full overflow-hidden min-w-0 mx-auto motion-safe:[mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
           <MarqueeWords words={["HTML", "CSS", "Python", "JavaScript", "Bootstrap", "React", "Node.js", "Postman", "Angular", "AWS", "Firebase", "Heroku", "Netlify", "TypeScript", "GitHub", "MongoDB", "PostgreSQL", "MySQL", "Docker", "SendGrid", "Expo"]} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
