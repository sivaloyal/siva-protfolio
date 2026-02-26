import { motion } from 'motion/react';

const skills = [
  'UI/UX Research',
  'Wireframing',
  'Figma',
  'Prototyping',
  'User Testing',
  'Information Architecture',
  'Interaction Design',
  'Visual Design',
];

export function Skills() {
  return (
    <section
      id="skills"
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
            <span style={{ color: '#64FFDA' }}>03.</span> Skills & Tools
            <div
              className="flex-1 h-px ml-4"
              style={{ backgroundColor: '#233554' }}
            />
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl p-6 text-center transition-all"
                style={{
                  backgroundColor: '#112240',
                  border: '1px solid #233554',
                }}
              >
                <p
                  className="font-semibold text-lg"
                  style={{ color: '#E6D3B3' }}
                >
                  {skill}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}