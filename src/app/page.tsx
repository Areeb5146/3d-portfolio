'use client';

import dynamic from 'next/dynamic';

const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'), {
  ssr: false,
});

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
  ssr: false,
});

const Navbar = dynamic(() => import('@/components/ui/Navbar'), {
  ssr: false,
});

const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
});

const About = dynamic(() => import('@/components/sections/About'), {
  ssr: false,
});

const Experience = dynamic(() => import('@/components/sections/Experience'), {
  ssr: false,
});

const Projects = dynamic(() => import('@/components/sections/Projects'), {
  ssr: false,
});

const Skills = dynamic(() => import('@/components/sections/Skills'), {
  ssr: false,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  ssr: false,
});

const SectionIndicators = dynamic(() => import('@/components/ui/SectionIndicators'), {
  ssr: false,
});

const ScrollParticles = dynamic(() => import('@/components/three/ScrollParticles'), {
  ssr: false,
});

const ChatBot = dynamic(() => import('@/components/chatbot/ChatBot'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollParticles />
      <Navbar />
      <SectionIndicators />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <ChatBot />
    </>
  );
}
