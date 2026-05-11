import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES } from '../constants';
import { Experience as ExperienceType } from '../types';

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  useEffect(() => {
    const savedExp = localStorage.getItem('justin_world_experience');
    if (savedExp) setExperiences(JSON.parse(savedExp));
    else setExperiences(EXPERIENCES);
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      <header className="mb-20 text-center">
        <span className="text-brand-accent font-bold tracking-[0.2em] text-xs mb-4 block uppercase font-mono">History</span>
        <h1 className="text-4xl md:text-6xl font-medium mb-8 text-brand-primary">Creative Journey</h1>
        <p className="text-brand-secondary font-light text-lg">
          영상과 AI, 그리고 디자인을 횡단하며 쌓아온 경험들입니다.
        </p>
      </header>

      <div className="space-y-20 relative">
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2" />

        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-20 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
          >
            {/* Dot */}
            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-brand-accent rounded-full z-10 -translate-x-1/2 hidden md:block" />
            
            {/* Content Card */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${idx % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
              <div className="glass p-8 rounded-[2rem] hover:border-brand-accent/40 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-brand-accent font-bold text-lg mb-2 block">{exp.year}</span>
                <h3 className="text-2xl font-medium mb-1 text-brand-primary group-hover:text-brand-accent transition-colors">{exp.role}</h3>
                <p className="text-brand-secondary text-xs mb-6 pb-6 border-b border-white/5 uppercase tracking-widest">{exp.company}</p>
                <ul className={`space-y-3 ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-xs text-brand-secondary/70 flex items-center gap-3">
                      <span className="hidden md:inline-block max-w-xs">{item}</span>
                      <span className="w-1.5 h-1.5 bg-brand-accent/40 rounded-full flex-shrink-0" />
                      {/* Mobile fallback */}
                      <span className="md:hidden">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Empty space/Decorative Background Year */}
            <div className="hidden md:block md:w-1/2">
              <div className="text-[10rem] font-bold text-white/[0.02] select-none tracking-tighter">
                {exp.year}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
