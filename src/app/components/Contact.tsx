import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <section
      id="contact"
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
            <span style={{ color: '#64FFDA' }}>05.</span> Get In Touch
            <div
              className="flex-1 h-px ml-4"
              style={{ backgroundColor: '#233554' }}
            />
          </h2>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl p-8"
              style={{
                backgroundColor: '#112240',
                border: '1px solid #233554',
              }}
            >
              <p
                className="text-lg text-center mb-8"
                style={{ color: '#8892B0' }}
              >
                I'm currently looking for internship opportunities. Whether you
                have a question or just want to say hi, I'll try my best to get
                back to you!
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-semibold"
                    style={{ color: '#E6D3B3' }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                    style={{
                      backgroundColor: '#0A192F',
                      border: '1px solid #233554',
                      color: '#E6D3B3',
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold"
                    style={{ color: '#E6D3B3' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                    style={{
                      backgroundColor: '#0A192F',
                      border: '1px solid #233554',
                      color: '#E6D3B3',
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-semibold"
                    style={{ color: '#E6D3B3' }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all resize-none"
                    style={{
                      backgroundColor: '#0A192F',
                      border: '1px solid #233554',
                      color: '#E6D3B3',
                    }}
                    placeholder="Say hello..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: '#E6D3B3',
                    color: '#0A192F',
                  }}
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
