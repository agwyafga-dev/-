import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Plus, Trash2, Edit2, LogOut, X, Save, Upload, 
  Image as ImageIcon, Video, User, Briefcase, Layout, Home as HomeIcon
} from 'lucide-react';
import { INITIAL_PROJECTS, EXPERIENCES, INITIAL_HOME_CAROUSEL } from '../constants';
import { Project, Experience, HomeCarouselItem } from '../types';

type AdminTab = 'PROJECTS' | 'ABOUT' | 'EXPERIENCE' | 'HOME';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('PROJECTS');
  
  // Data State
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [homeItems, setHomeItems] = useState<HomeCarouselItem[]>([]);
  const [aboutText, setAboutText] = useState({
    title: '경험을 설계하는\n비주얼 디렉터',
    p1: '브랜드와 콘텐츠는 더 이상 ‘제작’이 아니라 경험을 설계하는 과정이라고 믿습니다.',
    p2: '저는 영상 연출과 AI 기반 디자인을 결합해 새로운 시각 언어를 만듭니다. 기술은 도구일 뿐, 중요한 것은 그 기술이 전하는 브랜드의 이야기와 감정입니다.'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingHomeItem, setEditingHomeItem] = useState<HomeCarouselItem | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const homeFileInputRef = useRef<HTMLInputElement>(null);

  // Form States
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    title: '',
    category: 'FILM & MOTION',
    description: '',
    role: '',
    tools: [],
    thumbnailUrl: '',
    videoUrl: '',
  });

  const [expForm, setExpForm] = useState<Partial<Experience>>({
    year: '',
    company: '',
    role: '',
    description: [],
  });

  const [homeForm, setHomeForm] = useState<Partial<HomeCarouselItem>>({
    thumbnailUrl: '',
    linkUrl: '',
  });

  // Load data
  useEffect(() => {
    const savedProjects = localStorage.getItem('justin_world_projects');
    const savedExp = localStorage.getItem('justin_world_experience');
    const savedAbout = localStorage.getItem('justin_world_about');
    const savedHome = localStorage.getItem('justin_world_home_carousel');

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    else setProjects(INITIAL_PROJECTS);

    if (savedExp) setExperiences(JSON.parse(savedExp));
    else setExperiences(EXPERIENCES);

    if (savedHome) setHomeItems(JSON.parse(savedHome));
    else setHomeItems(INITIAL_HOME_CAROUSEL);

    if (savedAbout) setAboutText(JSON.parse(savedAbout));
  }, []);

  // Save data
  useEffect(() => {
    if (isAuthenticated) {
      try {
        if (projects.length > 0) localStorage.setItem('justin_world_projects', JSON.stringify(projects));
        if (experiences.length > 0) localStorage.setItem('justin_world_experience', JSON.stringify(experiences));
        if (homeItems.length > 0) localStorage.setItem('justin_world_home_carousel', JSON.stringify(homeItems));
        localStorage.setItem('justin_world_about', JSON.stringify(aboutText));
      } catch (e) {
        console.error('Storage save error:', e);
        if (e instanceof Error && e.name === 'QuotaExceededError') {
          alert('브라우저 저장 공간(LocalStorage)이 가득 찼습니다. 150MB 대용량 영상은 브라우저의 제한으로 인해 저장되지 않을 수 있습니다. Firebase 등 클라우드 스토리지 연동을 권장합니다.');
        }
      }
    }
  }, [projects, experiences, aboutText, homeItems, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '6178') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'home') => {
    const file = e.target.files?.[0];
    if (file) {
      const limit = type === 'video' ? 150 : 2; // 2MB for images, 150MB for video
      if (file.size > limit * 1024 * 1024) {
        alert(`파일 크기가 너무 큽니다. (최대 ${limit}MB)`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'image') {
          setProjectForm(prev => ({ ...prev, thumbnailUrl: result }));
        } else if (type === 'video') {
          setProjectForm(prev => ({ ...prev, videoUrl: result }));
        } else if (type === 'home') {
          setHomeForm(prev => ({ ...prev, thumbnailUrl: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openProjectModal = (p?: Project) => {
    setEditingProject(p || null);
    setProjectForm(p || {
      title: '',
      category: 'FILM & MOTION',
      description: '',
      role: '',
      tools: [],
      thumbnailUrl: '',
      videoUrl: '',
    });
    setEditingExperience(null);
    setEditingHomeItem(null);
    setIsModalOpen(true);
  };

  const openExpModal = (e?: Experience) => {
    setEditingExperience(e || null);
    setExpForm(e || { year: '', company: '', role: '', description: [] });
    setEditingProject(null);
    setEditingHomeItem(null);
    setIsModalOpen(true);
  };

  const openHomeModal = (h?: HomeCarouselItem) => {
    setEditingHomeItem(h || null);
    setHomeForm(h || { thumbnailUrl: '', linkUrl: '' });
    setEditingProject(null);
    setEditingExperience(null);
    setIsModalOpen(true);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...projectForm,
      tools: typeof projectForm.tools === 'string' 
        ? (projectForm.tools as string).split(',').map(t => t.trim())
        : projectForm.tools || []
    };

    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...data } as Project : p));
    } else {
      setProjects([{ ...data as Project, id: Date.now().toString(), createdAt: Date.now() }, ...projects]);
    }
    setIsModalOpen(false);
  };

  const handleExpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const desc = typeof expForm.description === 'string' 
      ? (expForm.description as string).split('\n').filter(l => l.trim())
      : expForm.description || [];

    const data = { ...expForm, description: desc } as Experience;

    if (editingExperience) {
      setExperiences(experiences.map(ex => ex.id === editingExperience.id ? data : ex));
    } else {
      setExperiences([{ ...data, id: Date.now().toString() }, ...experiences]);
    }
    setIsModalOpen(false);
  };

  const handleHomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingHomeItem) {
      setHomeItems(homeItems.map(h => h.id === editingHomeItem.id ? { ...h, ...homeForm } as HomeCarouselItem : h));
    } else {
      setHomeItems([{ ...homeForm as HomeCarouselItem, id: Date.now().toString() }, ...homeItems]);
    }
    setIsModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-[2rem] w-full max-w-md text-center orange-glow"
        >
          <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-accent">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-medium mb-4 text-brand-primary">Admin Portal</h1>
          <p className="text-brand-secondary text-sm mb-8 font-light">관리자 비밀번호를 입력해주세요.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full bg-white/5 border border-brand-border rounded-xl px-6 py-4 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-brand-accent transition-colors text-brand-primary"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button className="w-full py-4 bg-brand-accent text-white rounded-xl font-bold tracking-widest hover:scale-105 transition-all outline-none">
              ENTER
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <span className="text-brand-accent font-bold tracking-[0.2em] text-xs mb-2 block font-mono uppercase">ADMIN / {activeTab}</span>
          <h1 className="text-4xl font-medium text-brand-primary">Dashboard</h1>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar max-w-full">
          {(['PROJECTS', 'HOME', 'ABOUT', 'EXPERIENCE'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-[10px] font-bold tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-brand-accent text-white' : 'text-brand-secondary hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="md:ml-auto p-3 glass rounded-xl text-brand-secondary hover:text-red-500 transition-colors">
          <LogOut size={20} />
        </button>
      </header>

      {activeTab === 'PROJECTS' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium text-brand-primary">Projects List</h2>
            <button onClick={() => openProjectModal()} className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-full text-xs font-bold tracking-widest hover:scale-105 transition-all outline-none cursor-pointer">
              <Plus size={16} /> NEW PROJECT
            </button>
          </div>
          <div className="glass rounded-3xl overflow-hidden border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-brand-secondary">
                  <th className="px-8 py-6 text-[10px] font-bold tracking-widest uppercase">Project</th>
                  <th className="px-8 py-6 text-[10px] font-bold tracking-widest uppercase">Category</th>
                  <th className="px-8 py-6 text-[10px] font-bold tracking-widest uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={p.thumbnailUrl} className="w-20 h-12 object-cover rounded-lg shadow-lg border border-white/10" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="text-sm font-medium text-brand-primary">{p.title}</h4>
                          <p className="text-[10px] text-brand-secondary font-light">{p.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-bold px-3 py-1 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => openProjectModal(p)} className="p-3 bg-white/5 text-brand-secondary rounded-xl hover:text-brand-accent transition-all cursor-pointer"><Edit2 size={16} /></button>
                        <button onClick={() => { if(confirm('Delete?')) setProjects(projects.filter(x => x.id !== p.id)) }} className="p-3 bg-white/5 text-brand-secondary rounded-xl hover:text-red-500 transition-all cursor-pointer"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'HOME' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium text-brand-primary">Home Carousel</h2>
            <button onClick={() => openHomeModal()} className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-full text-xs font-bold tracking-widest hover:scale-105 transition-all outline-none cursor-pointer">
              <Plus size={16} /> NEW ITEM
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {homeItems.map(item => (
              <div key={item.id} className="glass rounded-[2rem] overflow-hidden group border-white/5">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img src={item.thumbnailUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-brand-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button onClick={() => openHomeModal(item)} className="p-3 bg-white/10 rounded-xl text-white hover:bg-brand-accent transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => { if(confirm('Delete?')) setHomeItems(homeItems.filter(x => x.id !== item.id)) }} className="p-3 bg-white/10 rounded-xl text-white hover:bg-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'EXPERIENCE' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-medium text-brand-primary">Experience Timeline</h2>
            <button onClick={() => openExpModal()} className="flex items-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-full text-xs font-bold tracking-widest hover:scale-105 transition-all outline-none cursor-pointer">
              <Plus size={16} /> NEW EXPERIENCE
            </button>
          </div>
          <div className="glass rounded-3xl overflow-hidden border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-brand-secondary">
                  <th className="px-8 py-6 text-[10px] font-bold tracking-widest uppercase">Year</th>
                  <th className="px-8 py-6 text-[10px] font-bold tracking-widest uppercase">Role / Company</th>
                  <th className="px-8 py-6 text-[10px] font-bold tracking-widest uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map(e => (
                  <tr key={e.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 text-brand-accent font-bold">{e.year}</td>
                    <td className="px-8 py-6">
                      <h4 className="text-sm font-medium text-brand-primary">{e.role}</h4>
                      <p className="text-[10px] text-brand-secondary">{e.company}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => openExpModal(e)} className="p-3 bg-white/5 text-brand-secondary rounded-xl hover:text-brand-accent transition-all cursor-pointer"><Edit2 size={16} /></button>
                        <button onClick={() => { if(confirm('Delete?')) setExperiences(experiences.filter(x => x.id !== e.id)) }} className="p-3 bg-white/5 text-brand-secondary rounded-xl hover:text-red-500 transition-all cursor-pointer"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'ABOUT' && (
        <div className="max-w-3xl space-y-12">
          <h2 className="text-2xl font-medium text-brand-primary">About Page Content</h2>
          <div className="glass p-10 rounded-[2.5rem] space-y-8 border-white/5">
            <div className="space-y-4">
              <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Hero Title (Use \n for line break)</label>
              <textarea 
                value={aboutText.title}
                onChange={e => setAboutText({...aboutText, title: e.target.value})}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-2xl font-medium text-brand-primary focus:border-brand-accent outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Philosophy Paragraph 1</label>
              <textarea 
                value={aboutText.p1}
                onChange={e => setAboutText({...aboutText, p1: e.target.value})}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-brand-secondary font-light focus:border-brand-accent outline-none"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Philosophy Paragraph 2</label>
              <textarea 
                value={aboutText.p2}
                onChange={e => setAboutText({...aboutText, p2: e.target.value})}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-brand-secondary font-light focus:border-brand-accent outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-y-auto">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-brand-bg/95 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-brand-bg glass rounded-[2.5rem] border-brand-accent/20 overflow-hidden flex flex-col my-auto border-white/10">
              <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <h2 className="text-2xl font-medium text-brand-primary">
                  {editingProject ? 'Edit Project' : editingExperience ? 'Edit Experience' : editingHomeItem ? 'Edit Home Item' : 'New Entry'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors text-brand-secondary cursor-pointer">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto max-h-[70vh]">
                {activeTab === 'HOME' || editingHomeItem ? (
                  <form onSubmit={handleHomeSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Thumbnail Image</label>
                      <div onClick={() => homeFileInputRef.current?.click()} className="aspect-[16/9] glass rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-accent transition-all overflow-hidden relative">
                        {homeForm.thumbnailUrl ? (
                          <img src={homeForm.thumbnailUrl} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center">
                            <ImageIcon size={32} className="mx-auto mb-4 opacity-20 text-brand-accent" />
                            <p className="text-xs font-light">이미지 업로드</p>
                          </div>
                        )}
                        <input ref={homeFileInputRef} type="file" className="hidden" onChange={e => handleFileUpload(e, 'home')} accept="image/*" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Link URL (Optional)</label>
                      <input 
                        value={homeForm.linkUrl} 
                        onChange={e => setHomeForm({...homeForm, linkUrl: e.target.value})} 
                        placeholder="https://vimeo.com/..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary outline-none focus:border-brand-accent placeholder:text-white/10" 
                      />
                    </div>
                    <button className="w-full py-4 bg-brand-accent text-white rounded-2xl font-bold tracking-widest hover:scale-105 transition-all outline-none cursor-pointer">SAVE ITEM</button>
                  </form>
                ) : editingProject || (!editingProject && !editingExperience && activeTab === 'PROJECTS') ? (
                  <form onSubmit={handleProjectSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div onClick={() => fileInputRef.current?.click()} className="aspect-[16/9] glass rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-accent transition-all overflow-hidden relative">
                        {projectForm.thumbnailUrl ? <img src={projectForm.thumbnailUrl} className="w-full h-full object-cover" /> : <div className="text-center"><ImageIcon size={24} className="mx-auto mb-2 opacity-40"/><p className="text-[10px]">THUMBNAIL</p></div>}
                        <input ref={fileInputRef} type="file" className="hidden" onChange={e => handleFileUpload(e, 'image')} accept="image/*" />
                      </div>
                      <div onClick={() => videoInputRef.current?.click()} className="aspect-[16/9] glass rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-accent transition-all overflow-hidden relative">
                        {projectForm.videoUrl && projectForm.videoUrl.startsWith('data:') ? (
                          <div className="w-full h-full relative">
                            <video src={projectForm.videoUrl} className="w-full h-full object-cover" muted loop autoPlay />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Video size={24} className="text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Video size={24} className="mx-auto mb-2 opacity-40"/>
                            <p className="text-[10px]">VIDEO FILE (MAX 150MB)</p>
                          </div>
                        )}
                        <input ref={videoInputRef} type="file" className="hidden" onChange={e => handleFileUpload(e, 'video')} accept="video/*" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Video URL (External Link)</label>
                      <input 
                        value={projectForm.videoUrl} 
                        onChange={e => setProjectForm({...projectForm, videoUrl: e.target.value})} 
                        placeholder="https://example.com/video.mp4"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary outline-none focus:border-brand-accent placeholder:text-white/10" 
                      />
                      <p className="text-[8px] text-brand-secondary">파일을 업로드하거나 외부 영상 링크(MP4 등)를 직접 입력할 수 있습니다.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Title</label>
                        <input value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary outline-none focus:border-brand-accent" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Category</label>
                        <select value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value as any})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary appearance-none outline-none focus:border-brand-accent">
                          <option value="FILM & MOTION">FILM & MOTION</option>
                          <option value="AI VISUAL DESIGN">AI VISUAL DESIGN</option>
                          <option value="THUMBNAIL LAB">THUMBNAIL LAB</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Role</label>
                        <input value={projectForm.role} onChange={e => setProjectForm({...projectForm, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary outline-none focus:border-brand-accent" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Tools (Comma separated)</label>
                        <input value={Array.isArray(projectForm.tools) ? projectForm.tools.join(', ') : projectForm.tools} onChange={e => setProjectForm({...projectForm, tools: e.target.value as any})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary outline-none focus:border-brand-accent" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Description</label>
                        <textarea value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary resize-none outline-none focus:border-brand-accent" required />
                    </div>
                    <button className="w-full py-4 bg-brand-accent text-white rounded-2xl font-bold tracking-widest hover:scale-105 transition-all outline-none cursor-pointer">SAVE PROJECT</button>
                  </form>
                ) : (
                  <form onSubmit={handleExpSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Year</label>
                        <input value={expForm.year} onChange={e => setExpForm({...expForm, year: e.target.value})} placeholder="2025" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary outline-none focus:border-brand-accent" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Company</label>
                        <input value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary outline-none focus:border-brand-accent" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Role</label>
                        <input value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary outline-none focus:border-brand-accent" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-brand-secondary uppercase">Description (One item per line)</label>
                        <textarea 
                          value={Array.isArray(expForm.description) ? expForm.description.join('\n') : expForm.description} 
                          onChange={e => setExpForm({...expForm, description: e.target.value as any})} 
                          rows={4} 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-brand-primary resize-none outline-none focus:border-brand-accent" 
                          required 
                        />
                    </div>
                    <button className="w-full py-4 bg-brand-accent text-white rounded-2xl font-bold tracking-widest hover:scale-105 transition-all outline-none uppercase cursor-pointer">Save Experience</button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
