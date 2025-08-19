// src/pages/Home.tsx (or your landing)
import AnimatedGradientText from "../components/AnimatedGradientText";
import { MarqueeWords } from "../components/MarqueeWords";

export default function Home() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-10 md:grid-cols-1">
        <div>
          <AnimatedGradientText className="text-5xl md:text-7xl">
            Darun Bjork
          </AnimatedGradientText>
          <p className="mt-4 text-lg text-zinc-300/90">
            I am a full-stack developer with a passion for building beautiful and functional web applications.
          </p>
          <p className="mt-4 text-lg text-zinc-300/90">
            This portfolio is a showcase of my skills and projects. It is built with React, TypeScript, and Tailwind CSS, and it is powered by a custom backend API.
          </p>
          <div className="mt-6">
            <MarqueeWords words={["HTML", "CSS", "Python", "JavaScript", "Bootstrap", "React", "Node.js", "Postman", "Angular", "AWS", "Firebase", "Heroku", "Netlify", "TypeScript", "GitHub", "MongoDB", "PostgreSQL", "MySQL", "Docker"]} />
          </div>
        </div>
      </div>
    </section>
  );
}
