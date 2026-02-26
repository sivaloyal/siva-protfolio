import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  return (
    <section className="py-24 px-4 md:px-8" style={{ backgroundColor: '#0A192F' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl mb-16" style={{ color: '#E6D3B3', fontWeight: 700 }}>
            About Me
          </h2>

          <div className="rounded-2xl p-8 md:p-12" style={{ backgroundColor: '#112240' }}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-base md:text-lg mb-6" style={{ color: '#8892B0', lineHeight: 1.8 }}>
                  Hello! I'm Siva, a passionate UI/UX Designer and Frontend Developer based in India. 
                  I create thoughtful digital experiences that combine aesthetic appeal with functional design.
                </p>
                <p className="text-base md:text-lg mb-6" style={{ color: '#8892B0', lineHeight: 1.8 }}>
                  My journey in design started with a curiosity for how things work and evolved into 
                  a commitment to creating intuitive, user-friendly interfaces. I believe great design 
                  should be invisible—it should just work.
                </p>
                <p className="text-base md:text-lg" style={{ color: '#8892B0', lineHeight: 1.8 }}>
                  When I'm not designing or coding, you'll find me exploring new design trends, 
                  contributing to open-source projects, or sketching ideas in my notebook.
                </p>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div 
                    className="absolute inset-0 rounded-2xl"
                    style={{ 
                      background: 'linear-gradient(135deg, #64FFDA 0%, #E6D3B3 100%)',
                      transform: 'translate(12px, 12px)',
                      zIndex: 0
                    }}
                  />
                  <div 
                    className="relative rounded-2xl overflow-hidden"
                    style={{ 
                      width: '280px',
                      height: '320px',
                      backgroundColor: '#1D2D50',
                      zIndex: 1
                    }}
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
                      alt="Siva Petla"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
