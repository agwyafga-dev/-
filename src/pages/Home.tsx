import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { INITIAL_HOME_CAROUSEL } from '../constants';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Maximize2 } from 'lucide-react';
import { HomeCarouselItem } from '../types';

export default function Home() {
  const [homeItems, setHomeItems] = useState<HomeCarouselItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHome = localStorage.getItem('justin_world_home_carousel');
    if (savedHome) {
      try {
        setHomeItems(JSON.parse(savedHome));
      } catch (e) {
        setHomeItems(INITIAL_HOME_CAROUSEL);
      }
    } else {
      setHomeItems(INITIAL_HOME_CAROUSEL);
    }
  }, []);

  // Handle Horizontal Scroll with Wheel
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 3, // slightly faster scroll
          behavior: 'auto' // 'smooth' wheel can sometimes feel laggy depending on browser
        });
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, [homeItems]);

  return (
    <div className="flex flex-col bg-brand-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-accent/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-secondary/5 blur-[100px] rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-center max-w-4xl"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] md:text-sm font-bold tracking-[0.5em] text-brand-accent uppercase mb-6 block"
          >
            THE NEXT CANVAS: WHERE MOTION MEETS INTELLIGENCE
          </motion.span>
          
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-8 text-brand-primary">
            영상을 설계하고,<br />
            <span className="text-brand-accent italic">AI로 디자인의</span> 가능성을 확장합니다
          </h1>

          <p className="text-brand-secondary text-sm md:text-lg max-w-2xl mx-auto mb-12 font-light">
            Video Producer & AI Designer<br />
            Cinematic Storytelling × Generative Creativity
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/projects"
              className="group relative px-8 py-4 bg-brand-accent text-white rounded-full text-sm font-bold overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                VIEW PROJECTS <ArrowRight size={16} />
              </span>
            </Link>
            <button className="flex items-center gap-2 text-sm font-bold tracking-widest hover:text-brand-accent transition-colors px-8 py-4 text-brand-primary">
              <Play size={16} fill="currentColor" /> WATCH SHOWREEL
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] tracking-[0.3em] font-medium text-brand-secondary">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-accent to-transparent" />
        </motion.div>
      </section>

      {/* Horizontal Scroll Carousel (The Roll) */}
      <section className="py-20 relative overflow-hidden bg-brand-bg/50 backdrop-blur-3xl border-y border-white/5">
        <div className="px-6 md:px-12 mb-10 flex justify-between items-end">
            <div>
              <span className="text-brand-accent font-bold text-[10px] tracking-[0.2em] mb-2 block uppercase">Cinematic Roll</span>
              <h2 className="text-3xl md:text-5xl font-medium text-brand-primary">Selected Thumbnails</h2>
            </div>
            <p className="text-brand-secondary text-[10px] font-bold tracking-widest uppercase hidden md:block">Use Scroll Wheel or Swipe →</p>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar px-6 md:px-12 pb-10 items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {homeItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "0px -50px" }}
              className={`flex-shrink-0 w-[280px] md:w-[500px] group relative ${item.linkUrl ? 'cursor-pointer' : ''}`}
              onClick={() => item.linkUrl && window.open(item.linkUrl, '_blank')}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] glass border-white/5 group-hover:border-brand-accent transition-all duration-700">
                <img 
                  src={item.thumbnailUrl} 
                  alt="Home Carousel Item"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-bg/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                   <div className="w-12 h-12 glass rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-all duration-500 text-white">
                      <Maximize2 size={20} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Spacer for scroll end */}
          <div className="flex-shrink-0 w-20 h-20" />
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 px-6 md:px-12 bg-brand-bg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
               <span className="text-brand-accent font-bold text-xs tracking-widest mb-4 block underline underline-offset-8">THE PHILOSOPHY</span>
               <h2 className="text-4xl md:text-6xl font-medium text-brand-primary mb-8 leading-tight">
                  Design Beyond <br />The Screens.
               </h2>
               <p className="text-brand-secondary text-lg font-light leading-relaxed mb-10 max-w-lg">
                  단순한 모션이 아닌 브랜드의 서사를 시각적으로 재해석합니다. 
                  AI는 상상을 현실로 만드는 가장 날카로운 도구입니다.
               </p>
               <Link to="/about" className="group flex items-center gap-4 text-brand-primary hover:text-brand-accent transition-colors">
                  <span className="text-sm font-bold tracking-widest">DISCOVER MY STORY</span>
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-brand-accent transition-all">
                     <ArrowRight size={20} />
                  </div>
               </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 aspect-square relative"
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/20 to-transparent blur-3xl rounded-full animate-pulse" />
               <img 
                src="https://picsum.photos/seed/futuristic-robot-portrait/800/800" 
                className="w-full h-full object-cover rounded-[3rem] relative z-10 glass border-white/10 grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
               />
            </motion.div>
        </div>
      </section>
    </div>
  );
}
