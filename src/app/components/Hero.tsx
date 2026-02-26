import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [resumeUrl, setResumeUrl] = useState('');
  const texts = ['UI/UX Designer', 'Problem Solver', 'Creative Thinker'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load resume URL from localStorage
    const savedResume = localStorage.getItem('portfolio_resume_url');
    if (savedResume) {
      setResumeUrl(savedResume);
    }

    // Listen for storage changes to update resume URL in real-time
    const handleStorageChange = () => {
      const updatedResume = localStorage.getItem('portfolio_resume_url');
      if (updatedResume) {
        setResumeUrl(updatedResume);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-window localStorage changes
    const handleCustomEvent = (e: any) => {
      if (e.detail) {
        setResumeUrl(e.detail);
      }
    };
    window.addEventListener('resumeUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resumeUpdated', handleCustomEvent);
    };
  }, []);

  return (
    <section
      className="min-h-screen flex items-center justify-center relative"
      style={{ backgroundColor: '#0A192F' }}
    >
      <div className="max-w-[1440px] w-full px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="text-center"
        >
          <motion.p
            className="text-lg mb-4"
            style={{ color: '#64FFDA' }}
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            className="text-7xl font-bold mb-4"
            style={{ color: '#E6D3B3' }}
          >
            Siva Petla
          </motion.h1>

          <div className="h-24 mb-8">
            <motion.h2
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold"
              style={{ color: '#8892B0' }}
            >
              {texts[currentText]}
            </motion.h2>
          </div>

          <motion.p
            className="text-xl max-w-2xl mx-auto mb-12"
            style={{ color: '#8892B0' }}
          >
            I design beautiful, user-centered digital experiences.
            Currently seeking internship opportunities to create impact through design.
          </motion.p>

          <div className="flex gap-4 justify-center">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: '#E6D3B3',
                color: '#0A192F',
              }}
            >
              View Work
            </motion.a>

            {resumeUrl ? (
              <motion.a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg font-semibold transition-all border-2"
                style={{
                  borderColor: '#64FFDA',
                  color: '#64FFDA',
                }}
              >
                Download Resume
              </motion.a>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  alert('Please add your resume URL in Settings (bottom right corner)');
                }}
                className="px-8 py-4 rounded-lg font-semibold transition-all border-2"
                style={{
                  borderColor: '#64FFDA',
                  color: '#64FFDA',
                }}
              >
                Download Resume
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown size={32} style={{ color: '#64FFDA' }} />
      </motion.div>
    </section>
  );
}