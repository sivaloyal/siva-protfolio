import { motion } from 'motion/react';
import { GraduationCap, Briefcase, Award, Sparkles } from 'lucide-react';

const timelineEvents = [
  {
    id: 1,
    year: '2026',
    title: 'Seeking Internship Opportunities',
    description: 'Looking for UI/UX Design positions to apply skills and grow professionally',
    icon: Briefcase,
  },
  {
    id: 2,
    year: '2025',
    title: 'Portfolio Development',
    description: 'Built multiple design projects showcasing UI/UX skills with modern tools and frameworks',
    icon: Award,
  },
  {
    id: 3,
    year: '2024',
    title: 'UI/UX Journey Begins',
    description: 'Started learning UI/UX design principles, Figma, prototyping, and user research methodologies',
    icon: Sparkles,
  },
];

export function Timeline() {
  return (
    <section
      id="timeline"
      className="min-h-screen flex items-center py-24"
      style={{ backgroundColor: '#0A192F' }}
    >
      <div className="max-w-[1440px] w-full px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-5xl font-bold mb-16 flex items-center gap-4"
            style={{ color: '#E6D3B3' }}
          >
            <span style={{ color: '#64FFDA' }}>04.</span> Journey
            <div
              className="flex-1 h-px ml-4"
              style={{ backgroundColor: '#233554' }}
            />
          </h2>

          <div className="relative">
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: '#233554' }}
            />

            <div className="space-y-12">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex gap-8"
                  >
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center z-10"
                      style={{
                        backgroundColor: '#64FFDA',
                      }}
                    >
                      <Icon size={28} style={{ color: '#0A192F' }} />
                    </div>

                    <div
                      className="flex-1 rounded-xl p-6"
                      style={{
                        backgroundColor: '#112240',
                        border: '1px solid #233554',
                      }}
                    >
                      <p
                        className="text-sm font-bold mb-2"
                        style={{ color: '#64FFDA' }}
                      >
                        {event.year}
                      </p>
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{ color: '#E6D3B3' }}
                      >
                        {event.title}
                      </h3>
                      <p
                        className="text-base"
                        style={{ color: '#8892B0' }}
                      >
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}