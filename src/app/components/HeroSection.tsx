import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const roles = ['UI/UX Designer', 'Problem Solver', 'Frontend Creator'];

  useEffect(() => {
    const role = roles[currentIndex % roles.length];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= role.length) {
        setDisplayedText(role.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-8" style={{ backgroundColor: '#0A192F' }}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl mb-4" style={{ color: '#64FFDA' }}>
            Hi, my name is
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-4" style={{ color: '#E6D3B3', fontWeight: 700 }}>
            Siva Petla
          </h1>
          <div className="h-20 md:h-24 mb-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl" style={{ color: '#64FFDA', fontWeight: 600 }}>
              {displayedText}
              <span className="animate-pulse">|</span>
            </h2>
          </div>
          <p className="text-base md:text-lg mb-12 max-w-2xl mx-auto" style={{ color: '#8892B0' }}>
            I specialize in crafting exceptional digital experiences with a focus on user-centered design
            and clean, efficient code. Currently seeking internship opportunities to bring creative solutions to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToWork}
              className="px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'transparent',
                border: '2px solid #64FFDA',
                color: '#64FFDA',
                fontWeight: 600
              }}
            >
              View Work
            </button>
            <button
              className="px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: '#E6D3B3',
                color: '#0A192F',
                fontWeight: 600
              }}
            >
              Download Resume
            </button>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} style={{ color: '#64FFDA' }} />
        </motion.div>
      </div>
    </section>
  );
}
