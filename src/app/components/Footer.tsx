import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  const socials = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:siva.petla@example.com', label: 'Email' },
  ];

  return (
    <footer
      className="py-12"
      style={{ backgroundColor: '#0A192F', borderTop: '1px solid #233554' }}
    >
      <div className="max-w-[1440px] w-full px-8 mx-auto">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-6">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ y: -4 }}
                  className="p-3 rounded-lg transition-all"
                  style={{
                    backgroundColor: '#112240',
                    border: '1px solid #233554',
                  }}
                >
                  <Icon size={24} style={{ color: '#64FFDA' }} />
                </motion.a>
              );
            })}
          </div>

          <p
            className="text-sm flex items-center gap-2"
            style={{ color: '#8892B0' }}
          >
            Designed & Built with
            <Heart size={16} style={{ color: '#64FFDA' }} fill="#64FFDA" />
            by{' '}
            <a
              href="https://siva-petla-portfolio.web.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#64FFDA', fontWeight: 600, textDecoration: 'underline' }}
            >
              sivapetla protfolio
            </a>
          </p>

          <p className="text-sm" style={{ color: '#8892B0' }}>
            © 2026 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
