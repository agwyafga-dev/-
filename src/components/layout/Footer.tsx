import { motion } from 'motion/react';
import { Mail, Github, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-20 bg-brand-bg border-t border-brand-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-md">
          <Link to="/" className="text-2xl font-bold tracking-tighter mb-6 block">
            Justin <span className="text-brand-accent">world</span>
          </Link>
          <p className="text-brand-secondary text-sm font-light leading-relaxed mb-8">
            영상 언어를 기반으로 AI 시대의 새로운 비주얼 경험을 설계하는 크리에이터입니다.
            우리는 기술과 감각의 접점에서 놀라운 가치를 발견합니다.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-accent transition-all group">
              <Mail size={18} className="group-hover:text-white" />
            </a>
            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-accent transition-all group">
              <Instagram size={18} className="group-hover:text-white" />
            </a>
            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-accent transition-all group">
              <Youtube size={18} className="group-hover:text-white" />
            </a>
            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-brand-accent transition-all group">
              <Github size={18} className="group-hover:text-white" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
          <div>
            <h4 className="font-bold mb-6 tracking-widest text-brand-accent text-xs uppercase">Navigation</h4>
            <ul className="space-y-4 text-brand-secondary">
              <li><Link to="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-primary transition-colors">About</Link></li>
              <li><Link to="/projects" className="hover:text-brand-primary transition-colors">Projects</Link></li>
              <li><Link to="/experience" className="hover:text-brand-primary transition-colors">Experience</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 tracking-widest text-brand-accent text-xs uppercase">Expertise</h4>
            <ul className="space-y-4 text-brand-secondary">
              <li>Film & Motion</li>
              <li>AI Visual Design</li>
              <li>Thumbnail Strategy</li>
              <li>Brand Direction</li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold mb-6 tracking-widest text-brand-accent text-xs uppercase">Contact</h4>
            <p className="text-brand-secondary mb-2">work.justin@gmail.com</p>
            <p className="text-brand-secondary">Seoul, South Korea</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-brand-secondary font-bold tracking-[0.2em] uppercase">
        <p>© 2025 JUSTIN WORLD. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <Link to="/admin" className="hover:text-brand-accent">ADMIN DASHBOARD</Link>
          <span>PRIVACY POLICY</span>
        </div>
      </div>
    </footer>
  );
}
