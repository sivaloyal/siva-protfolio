import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Upload, Edit2, X } from 'lucide-react';
import { ImageGallery } from './ImageGallery';
import { useAuth } from '../context/AuthContext';
import { PasswordPrompt } from './PasswordPrompt';

export function About() {
  const { isAuthenticated, login } = useAuth();
  const [profileImage, setProfileImage] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  // Load profile image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem('portfolio_profile_image');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleSaveImage = (base64: string) => {
    if (base64) {
      setProfileImage(base64);
      localStorage.setItem('portfolio_profile_image', base64);
      setShowImageInput(false);
    }
  };

  const handleEditClick = () => {
    if (!isAuthenticated) {
      setShowPasswordPrompt(true);
    } else {
      setShowImageInput(true);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (login(password)) {
      setShowPasswordPrompt(false);
      setShowImageInput(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <section
      id="about"
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
            <span style={{ color: '#64FFDA' }}>01.</span> About Me
            <div
              className="flex-1 h-px ml-4"
              style={{ backgroundColor: '#233554' }}
            />
          </h2>

          <div
            className="rounded-xl p-12 grid md:grid-cols-2 gap-12"
            style={{ backgroundColor: '#112240' }}
          >
            <div>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: '#8892B0' }}
              >
                Hello! I'm Siva, a passionate UI/UX designer focused on creating 
                exceptional digital experiences. My journey in design started with 
                a fascination for how things work and how they can be improved.
              </p>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: '#8892B0' }}
              >
                I believe in user-centered design that solves real problems. Every
                pixel, every interaction, and every design decision is crafted with
                purpose and attention to detail.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{ color: '#8892B0' }}
              >
                When I'm not designing, you'll find me exploring the latest design 
                trends, reading about psychology and user behavior, or working on 
                personal projects that push my creative boundaries.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative group">
                <div
                  className="absolute inset-0 rounded-lg blur-xl opacity-30"
                  style={{ backgroundColor: '#64FFDA' }}
                />
                
                {profileImage ? (
                  <div className="relative">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="relative rounded-lg w-full max-w-md object-cover shadow-2xl"
                      style={{
                        border: '3px solid #64FFDA',
                        aspectRatio: '1',
                      }}
                    />
                    <button
                      onClick={handleEditClick}
                      className="absolute top-4 right-4 p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      style={{ backgroundColor: '#0A192F', border: '2px solid #64FFDA' }}
                    >
                      <Edit2 size={20} style={{ color: '#64FFDA' }} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="relative rounded-lg w-full max-w-md flex flex-col items-center justify-center gap-4 p-12 transition-all hover:border-opacity-100"
                    style={{
                      border: '3px dashed #64FFDA',
                      borderOpacity: 0.5,
                      aspectRatio: '1',
                      backgroundColor: '#0A192F',
                    }}
                  >
                    <Upload size={48} style={{ color: '#64FFDA' }} />
                    <p className="text-lg font-semibold" style={{ color: '#64FFDA' }}>
                      Add Profile Picture
                    </p>
                  </button>
                )}

                {showImageInput && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-4 p-6 rounded-lg z-10"
                    style={{ backgroundColor: '#112240', border: '1px solid #233554' }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold" style={{ color: '#E6D3B3' }}>
                        Select Image
                      </h4>
                      <button
                        onClick={() => setShowImageInput(false)}
                        className="p-1"
                      >
                        <X size={20} style={{ color: '#8892B0' }} />
                      </button>
                    </div>
                    <ImageGallery 
                      onSelectImage={handleSaveImage}
                      currentImage={profileImage}
                    />
                    <button
                      onClick={() => setShowImageInput(false)}
                      className="w-full mt-4 px-4 py-2 rounded-lg font-semibold"
                      style={{ backgroundColor: '#0A192F', border: '1px solid #233554', color: '#8892B0' }}
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Password Prompt */}
      <PasswordPrompt
        isOpen={showPasswordPrompt}
        onClose={() => setShowPasswordPrompt(false)}
        onSubmit={handlePasswordSubmit}
      />
    </section>
  );
}