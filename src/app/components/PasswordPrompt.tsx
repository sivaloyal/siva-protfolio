import { motion, AnimatePresence } from 'motion/react';
import { Lock, X } from 'lucide-react';
import { useState } from 'react';

interface PasswordPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
}

export function PasswordPrompt({ isOpen, onClose, onSubmit }: PasswordPromptProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!password) {
      setError('Please enter a password');
      return;
    }
    onSubmit(password);
    setPassword('');
    setError('');
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(10, 25, 47, 0.95)' }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl p-8"
            style={{ backgroundColor: '#112240', border: '1px solid #233554' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: '#0A192F' }}
                >
                  <Lock size={24} style={{ color: '#64FFDA' }} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: '#E6D3B3' }}>
                  Admin Access
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-opacity-80 transition-all"
              >
                <X size={24} style={{ color: '#8892B0' }} />
              </button>
            </div>

            <p className="mb-6" style={{ color: '#8892B0' }}>
              Enter your password to edit the portfolio.
            </p>

            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                  }}
                  className="w-full px-4 py-3 rounded-lg outline-none"
                  style={{
                    backgroundColor: '#0A192F',
                    border: error ? '2px solid #d4183d' : '1px solid #233554',
                    color: '#E6D3B3',
                  }}
                  placeholder="Enter password"
                  autoFocus
                />
                {error && (
                  <p className="text-sm mt-2" style={{ color: '#d4183d' }}>
                    {error}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-3 rounded-lg font-semibold transition-all"
                  style={{
                    backgroundColor: '#64FFDA',
                    color: '#0A192F',
                  }}
                >
                  Login
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-3 rounded-lg font-semibold"
                  style={{
                    backgroundColor: '#0A192F',
                    border: '1px solid #233554',
                    color: '#8892B0',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
