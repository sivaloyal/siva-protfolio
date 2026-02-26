import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, FileText, Figma, Github, Code, Plus, X, Upload, Video, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { ImageGallery } from './ImageGallery';
import { useAuth } from '../context/AuthContext';
import { PasswordPrompt } from './PasswordPrompt';

interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  category: string;
  links: {
    caseStudyPdf?: string;
    figmaPrototype?: string;
    videoPresentation?: string;
    livePreview?: string;
    github?: string;
  };
}

const filters = ['All', 'Mobile', 'Web', 'Development'];

export function Projects() {
  const { isAuthenticated, login } = useAuth();
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    description: '',
    image: '',
    category: 'mobile',
    links: {
      caseStudyPdf: '',
      figmaPrototype: '',
      videoPresentation: '',
      livePreview: '',
      github: '',
    },
  });

  // Real-time projects from Firestore
  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setProjects(docs as Project[]);
    });
    return () => unsub();
  }, []);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
        );

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'projects'), {
        title: formData.title,
        tag: formData.tag,
        description: formData.description,
        image:
          formData.image ||
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23112240" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%238892B0"%3ENo image selected%3C/text%3E%3C/svg%3E',
        category: formData.category,
        links: formData.links,
        createdAt: serverTimestamp(),
      });

      setShowAddModal(false);

      setFormData({
        title: '',
        tag: '',
        description: '',
        image: '',
        category: 'mobile',
        links: {
          caseStudyPdf: '',
          figmaPrototype: '',
          videoPresentation: '',
          livePreview: '',
          github: '',
        },
      });
    } catch (err) {
      console.error('Failed to add project', err);
      alert('Failed to add project. Check console for details.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!isAuthenticated) {
      alert('Not authorized');
      return;
    }

    if (!confirm('Delete this project?')) return;

    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      console.error('Failed to delete project', err);
      alert('Failed to delete project. Check console for details.');
    }
  };

  const handleAddProjectClick = () => {
    if (!isAuthenticated) {
      setShowPasswordPrompt(true);
    } else {
      setShowAddModal(true);
    }
  };

  const handlePasswordSubmit = (password: string) => {
    if (login(password)) {
      setShowPasswordPrompt(false);
      setShowAddModal(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <section
      id="projects"
      className="min-h-screen py-24"
      style={{ backgroundColor: '#0A192F' }}
    >
      <div className="max-w-[1440px] w-full px-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-16">
            <h2
              className="text-5xl font-bold flex items-center gap-4"
              style={{ color: '#E6D3B3' }}
            >
              <span style={{ color: '#64FFDA' }}>02.</span> Featured Projects
              <div
                className="flex-1 h-px ml-4"
                style={{ backgroundColor: '#233554' }}
              />
            </h2>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddProjectClick}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: '#E6D3B3',
                color: '#0A192F',
              }}
            >
              <Plus size={20} />
              Add Project
            </motion.button>
          </div>

          <div className="flex gap-4 mb-12 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="px-6 py-3 rounded-lg transition-all font-semibold"
                style={{
                  backgroundColor:
                    activeFilter === filter ? '#E6D3B3' : '#112240',
                  color: activeFilter === filter ? '#0A192F' : '#8892B0',
                  border: activeFilter === filter ? 'none' : '1px solid #233554',
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div
              className="text-center py-24 rounded-xl"
              style={{ backgroundColor: '#112240', border: '1px solid #233554' }}
            >
              <p className="text-xl mb-4" style={{ color: '#8892B0' }}>
                No projects yet. Click "Add Project" to get started!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="rounded-xl overflow-hidden transition-all relative group"
                  style={{
                    backgroundColor: '#112240',
                    border: '1px solid #233554',
                  }}
                >
                  {isAuthenticated && (
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="absolute top-4 left-4 z-10 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: '#0A192F', border: '1px solid #64FFDA' }}
                    >
                      <Trash2 size={18} style={{ color: '#64FFDA' }} />
                    </button>
                  )}

                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: '#64FFDA',
                        color: '#0A192F',
                      }}
                    >
                      {project.tag}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ color: '#E6D3B3' }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="text-base leading-relaxed mb-6"
                      style={{ color: '#8892B0' }}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-col gap-3">
                      {project.links.caseStudyPdf && (
                        <a
                          href={project.links.caseStudyPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#0A192F',
                            border: '1px solid #64FFDA',
                            color: '#64FFDA',
                          }}
                        >
                          <FileText size={18} />
                          <span className="text-sm font-semibold">Case Study PDF</span>
                        </a>
                      )}

                      {project.links.figmaPrototype && (
                        <a
                          href={project.links.figmaPrototype}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#0A192F',
                            border: '1px solid #64FFDA',
                            color: '#64FFDA',
                          }}
                        >
                          <Figma size={18} />
                          <span className="text-sm font-semibold">Figma Prototype</span>
                        </a>
                      )}

                      {project.links.videoPresentation && (
                        <a
                          href={project.links.videoPresentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#0A192F',
                            border: '1px solid #64FFDA',
                            color: '#64FFDA',
                          }}
                        >
                          <Video size={18} />
                          <span className="text-sm font-semibold">Video Presentation</span>
                        </a>
                      )}

                      {project.links.livePreview && (
                        <a
                          href={project.links.livePreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#0A192F',
                            border: '1px solid #64FFDA',
                            color: '#64FFDA',
                          }}
                        >
                          <ExternalLink size={18} />
                          <span className="text-sm font-semibold">Live Preview</span>
                        </a>
                      )}

                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all"
                          style={{
                            backgroundColor: '#0A192F',
                            border: '1px solid #64FFDA',
                            color: '#64FFDA',
                          }}
                        >
                          <Github size={18} />
                          <span className="text-sm font-semibold">GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(10, 25, 47, 0.95)' }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl p-8"
              style={{ backgroundColor: '#112240', border: '1px solid #233554' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold" style={{ color: '#E6D3B3' }}>
                  Add New Project
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-opacity-80 transition-all"
                  style={{ backgroundColor: '#0A192F' }}
                >
                  <X size={24} style={{ color: '#64FFDA' }} />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg outline-none"
                    style={{
                      backgroundColor: '#0A192F',
                      border: '1px solid #233554',
                      color: '#E6D3B3',
                    }}
                    placeholder="e.g., AI Blogging App"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
                      Tag *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{
                        backgroundColor: '#0A192F',
                        border: '1px solid #233554',
                        color: '#E6D3B3',
                      }}
                      placeholder="e.g., Mobile UX"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg outline-none"
                      style={{
                        backgroundColor: '#0A192F',
                        border: '1px solid #233554',
                        color: '#E6D3B3',
                      }}
                    >
                      <option value="mobile">Mobile</option>
                      <option value="web">Web</option>
                      <option value="development">Development</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg outline-none resize-none"
                    style={{
                      backgroundColor: '#0A192F',
                      border: '1px solid #233554',
                      color: '#E6D3B3',
                    }}
                    placeholder="Describe your project..."
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
                    Project Image
                  </label>
                  <ImageGallery 
                    onSelectImage={(base64) => setFormData({ ...formData, image: base64 })}
                    currentImage={formData.image}
                  />
                </div>

                <div className="border-t pt-6" style={{ borderColor: '#233554' }}>
                  <h4 className="text-xl font-bold mb-4" style={{ color: '#64FFDA' }}>
                    Project Links
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
                        <FileText size={16} className="inline mr-2" />
                        Case Study PDF URL
                      </label>
                      <input
                        type="url"
                        value={formData.links.caseStudyPdf}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            links: { ...formData.links, caseStudyPdf: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg outline-none"
                        style={{
                          backgroundColor: '#0A192F',
                          border: '1px solid #233554',
                          color: '#E6D3B3',
                        }}
                        placeholder="https://example.com/case-study.pdf"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
                        <Figma size={16} className="inline mr-2" />
                        Figma Prototype URL
                      </label>
                      <input
                        type="url"
                        value={formData.links.figmaPrototype}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            links: { ...formData.links, figmaPrototype: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg outline-none"
                        style={{
                          backgroundColor: '#0A192F',
                          border: '1px solid #233554',
                          color: '#E6D3B3',
                        }}
                        placeholder="https://figma.com/proto/..."
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
                        <Video size={16} className="inline mr-2" />
                        Video Presentation URL
                      </label>
                      <input
                        type="url"
                        value={formData.links.videoPresentation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            links: { ...formData.links, videoPresentation: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg outline-none"
                        style={{
                          backgroundColor: '#0A192F',
                          border: '1px solid #233554',
                          color: '#E6D3B3',
                        }}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
                        <ExternalLink size={16} className="inline mr-2" />
                        Live Preview URL
                      </label>
                      <input
                        type="url"
                        value={formData.links.livePreview}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            links: { ...formData.links, livePreview: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg outline-none"
                        style={{
                          backgroundColor: '#0A192F',
                          border: '1px solid #233554',
                          color: '#E6D3B3',
                        }}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#E6D3B3' }}>
                        <Github size={16} className="inline mr-2" />
                        GitHub Repository URL
                      </label>
                      <input
                        type="url"
                        value={formData.links.github}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            links: { ...formData.links, github: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg outline-none"
                        style={{
                          backgroundColor: '#0A192F',
                          border: '1px solid #233554',
                          color: '#E6D3B3',
                        }}
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-4 rounded-lg font-semibold"
                    style={{
                      backgroundColor: '#E6D3B3',
                      color: '#0A192F',
                    }}
                  >
                    Add Project
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddModal(false)}
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
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Prompt */}
      <PasswordPrompt
        isOpen={showPasswordPrompt}
        onClose={() => setShowPasswordPrompt(false)}
        onSubmit={handlePasswordSubmit}
      />
    </section>
  );
}