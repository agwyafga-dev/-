import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_PROJECTS } from '../constants';
import { Play, Volume2 } from 'lucide-react';
import { Project } from '../types';

const CATEGORIES = ['ALL', 'FILM & MOTION', 'AI VISUAL DESIGN', 'THUMBNAIL LAB'];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const savedProjects = localStorage.getItem('justin_world_projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (e) {
        setProjects(INITIAL_PROJECTS);
      }
    } else {
      setProjects(INITIAL_PROJECTS);
    }
  }, []);

  const filteredProjects = activeCategory === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <header className="mb-20">
        <span className="text-brand-accent font-bold tracking-[0.2em] text-xs mb-4 block uppercase underline underline-offset-8">Project Archive</span>
        <h1 className="text-4xl md:text-6xl font-medium mb-12 text-brand-primary">Selected Works</h1>
        
        <div className="flex flex-wrap gap-4 border-b border-white/10 pb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] font-bold tracking-widest px-8 py-2.5 rounded-full transition-all cursor-pointer ${
                activeCategory === cat 
                ? 'bg-brand-accent text-white shadow-xl shadow-brand-accent/20' 
                : 'bg-white/5 text-brand-secondary hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => project.videoUrl && window.open(project.videoUrl, '_blank')}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] glass border-white/5 mb-6 group-hover:border-brand-accent/30 transition-all">

                {/* Video Preview on Hover */}
                <AnimatePresence>
                    {hoveredProject === project.id && project.videoUrl ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-10"
                        >
                            <video 
                                src={project.videoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 animate-pulse">
                                <Volume2 size={16} className="text-white opacity-50" />
                            </div>
                        </motion.div>
                    ) : (
                        <img 
                            src={project.thumbnailUrl} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                        />
                    )}
                </AnimatePresence>

                <div className="absolute inset-0 bg-brand-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 z-20">
                  <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center mb-6 self-center group-hover:translate-y-0 translate-y-4 transition-transform duration-500 shadow-xl shadow-brand-accent/40">
                    <Play size={18} fill="white" className="text-white translate-x-0.5" />
                  </div>
                  <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs text-brand-primary line-clamp-3 font-light leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.slice(0, 3).map(t => (
                        <span key={t} className="text-[8px] font-bold tracking-widest px-2.5 py-1.5 bg-brand-accent/20 text-brand-accent rounded border border-brand-accent/20">
                          {t.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {project.category === 'THUMBNAIL LAB' && project.stats && (
                  <div className="absolute top-4 right-4 px-4 py-1.5 bg-brand-accent/90 text-white text-[10px] font-bold rounded-full z-30 shadow-lg">
                    {project.stats}
                  </div>
                )}
              </div>
              <div className="px-4">
                <span className="text-[10px] font-bold text-brand-accent tracking-widest uppercase opacity-70">
                  {project.category}
                </span>
                <h3 className="text-2xl font-medium mt-1 text-brand-primary">{project.title}</h3>
                <p className="text-xs text-brand-secondary mt-2 font-light">{project.role}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {projects.length === 0 && (
         <div className="py-40 text-center">
            <p className="text-brand-secondary text-sm font-light italic">No projects found. Visit Admin to add content.</p>
         </div>
      )}
    </div>
  );
}
