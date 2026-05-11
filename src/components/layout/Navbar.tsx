import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'PROJECTS', path: '/projects' },
  { name: 'EXPERIENCE', path: '/experience' },
  { name: 'PROCESS', path: '/process' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12 flex justify-between items-center",
      scrolled ? "bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border py-4" : "bg-transparent"
    )}>
      <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2 group">
        <span className="w-8 h-8 bg-brand-accent rounded-full group-hover:scale-110 transition-transform" />
        <span className="text-brand-primary group-hover:text-brand-accent transition-colors">Justin world</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "text-xs font-medium tracking-[0.2em] transition-all hover:text-brand-accent",
              location.pathname === item.path ? "text-brand-accent" : "text-brand-secondary"
            )}
          >
            {item.name}
          </Link>
        ))}
        <Link 
          to="/admin" 
          className="px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-[10px] font-bold text-brand-accent hover:bg-brand-accent hover:text-white transition-all"
        >
          ADMIN
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-brand-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-bg border-b border-brand-border px-8 py-10 flex flex-col gap-6 md:hidden z-50"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium tracking-widest",
                  location.pathname === item.path ? "text-brand-accent" : "text-brand-secondary"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/admin" 
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-brand-accent"
            >
              ADMIN
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
