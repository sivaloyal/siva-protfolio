import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Settings } from './components/Settings';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A192F' }}>
      {isLoading && <LoadingScreen />}
      
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
      <Settings />
    </div>
  );
}