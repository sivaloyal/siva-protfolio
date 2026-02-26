import { motion, AnimatePresence } from 'motion/react';
import { Settings as SettingsIcon, X, FileText, Save, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PasswordPrompt } from './PasswordPrompt';

export function Settings() {
  const { isAuthenticated, login, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
  const [tempResumeUrl, setTempResumeUrl] = useState('');

  useEffect(() => {
    const savedResume = localStorage.getItem('portfolio_resume_url');
    if (savedResume) {
      setResumeUrl(savedResume);
      setTempResumeUrl(savedResume);
    }
  }, []);

  const handleSettingsClick = () => {
    if (isAuthenticated) {
      setShowSettings(true);
    } else {
      setShowPasswordPrompt(true);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (login(password)) {
      setShowPasswordPrompt(false);
      setShowSettings(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = () => {
    setResumeUrl(tempResumeUrl);
    localStorage.setItem('portfolio_resume_url', tempResumeUrl);
    setShowSettings(false);
  };

  const handleLogout = () => {
    logout();
    setShowSettings(false);
  };

  return (
    <>
      {/* Floating Settings Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleSettingsClick}
        className="fixed bottom-8 right-8 p-4 rounded-full shadow-2xl z-40"
        style={{
          backgroundColor: isAuthenticated ? '#64FFDA' : '#E6D3B3',
          color: '#0A192F',
        }}
        aria-label="Settings"
      >
        <SettingsIcon size={24} />
      </motion.button>

      {/* Password Prompt */}
      <PasswordPrompt
        isOpen={showPasswordPrompt}
        onClose={() => setShowPasswordPrompt(false)}
        onSubmit={handlePasswordSubmit}
      />

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(10, 25, 47, 0.95)' }}
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-xl p-8"
              style={{ backgroundColor: '#112240', border: '1px solid #233554' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold" style={{ color: '#E6D3B3' }}>
                  Portfolio Settings
                </h3>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleLogout}
                    className="p-2 rounded-lg transition-all"
                    style={{ backgroundColor: '#0A192F', border: '1px solid #d4183d' }}
                    title="Logout"
                  >
                    <LogOut size={20} style={{ color: '#d4183d' }} />
                  </motion.button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 rounded-lg hover:bg-opacity-80 transition-all"
                    style={{ backgroundColor: '#0A192F' }}
                  >
                    <X size={24} style={{ color: '#64FFDA' }} />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    className="block mb-2 text-sm font-semibold flex items-center gap-2"
                    style={{ color: '#E6D3B3' }}
                  >
                    <FileText size={18} />
                    Resume URL
                  </label>
                  <input
                    type="url"
                    value={tempResumeUrl}
                    onChange={(e) => setTempResumeUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: '#0A192F',
                      border: '1px solid #233554',
                      color: '#E6D3B3',
                    }}
                    placeholder="https://example.com/resume.pdf or Google Drive link"
                  />
                  <p className="mt-2 text-sm" style={{ color: '#8892B0' }}>
                    Add a link to your resume (PDF, Google Drive, Dropbox, etc.)
                  </p>
                </div>

                {resumeUrl && (
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: '#0A192F', border: '1px solid #64FFDA' }}
                  >
                    <p className="text-sm mb-2" style={{ color: '#64FFDA' }}>
                      Current Resume:
                    </p>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm break-all hover:underline"
                      style={{ color: '#E6D3B3' }}
                    >
                      {resumeUrl}
                    </a>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex-1 px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: '#E6D3B3',
                      color: '#0A192F',
                    }}
                  >
                    <Save size={20} />
                    Save Settings
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setTempResumeUrl(resumeUrl);
                      setShowSettings(false);
                    }}
                    className="px-6 py-4 rounded-lg font-semibold"
                    style={{
                      backgroundColor: '#0A192F',
                      border: '1px solid #233554',
                      color: '#8892B0',
                    }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
