import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES } from '../constants';
import { Experience } from '../types';

export default function About() {
  const [aboutText, setAboutText] = useState({
    title: '경험을 설계하는\n비주얼 디렉터',
    p1: '브랜드와 콘텐츠는 더 이상 ‘제작’이 아니라 경험을 설계하는 과정이라고 믿습니다.',
    p2: '저는 영상 연출과 AI 기반 디자인을 결합해 새로운 시각 언어를 만듭니다. 기술은 도구일 뿐, 중요한 것은 그 기술이 전하는 브랜드의 이야기와 감정입니다.'
  });
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const savedAbout = localStorage.getItem('justin_world_about');
    const savedExp = localStorage.getItem('justin_world_experience');

    if (savedAbout) setAboutText(JSON.parse(savedAbout));
    if (savedExp) setExperiences(JSON.parse(savedExp));
    else setExperiences(EXPERIENCES);
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
      >
        <div className="sticky top-32">
          <span className="text-brand-accent font-bold tracking-[0.2em] text-xs mb-4 block underline underline-offset-8">DESIGNING BEYOND FRAMES</span>
          <h1 className="text-4xl md:text-6xl font-medium leading-tight mb-12 text-brand-primary whitespace-pre-line">
            {aboutText.title}
          </h1>
          
          <div className="space-y-8 text-brand-secondary font-light text-lg/relaxed max-w-xl">
            <p>{aboutText.p1}</p>
            <p>{aboutText.p2}</p>
          </div>

          <div className="mt-16">
            <h3 className="text-xs font-bold tracking-widest text-brand-primary mb-8 uppercase opacity-60">Key Toolkit</h3>
            <div className="flex flex-wrap gap-4">
              {['Premiere Pro', 'After Effects', 'Midjourney', 'Runway', 'ChatGPT', 'Photoshop', 'Blender'].map(tool => (
                <span key={tool} className="px-5 py-2.5 glass rounded-full text-[10px] font-bold tracking-widest hover:border-brand-accent transition-colors">
                  {tool.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-24">
          <div>
            <h2 className="text-3xl font-medium mb-12 text-brand-primary">Selected Experience</h2>
            <div className="space-y-12">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-8 border-l border-white/10 group">
                  <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-brand-accent rounded-full group-hover:scale-150 transition-transform" />
                  <span className="text-brand-accent font-bold text-sm tracking-tighter mb-1 block">{exp.year}</span>
                  <h3 className="text-xl font-medium text-brand-primary">{exp.role}</h3>
                  <p className="text-xs text-brand-secondary mb-4 opacity-70">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-xs text-brand-secondary/80 flex items-center gap-3">
                        <span className="w-1 h-1 bg-brand-accent/50 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="p-12 glass rounded-3xl border-brand-accent/20 bg-brand-accent/[0.02] relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
            <h2 className="text-2xl font-medium mb-6 text-brand-primary">Creative Ethos</h2>
            <p className="text-brand-secondary text-sm mb-8 font-light leading-relaxed">
              단순히 아름다운 것을 만드는 것을 넘어, 가치가 담긴 시각적 경험을 제안합니다.
              AI와 모션 그래픽의 결합은 우리가 꿈꾸던 미래를 현재로 가져오는 가장 강력한 방법입니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-20 group-hover:opacity-40 transition-opacity">
               <div className="h-0.5 bg-brand-accent" />
               <div className="h-0.5 bg-brand-accent" />
               <div className="h-0.5 bg-brand-accent" />
               <div className="h-0.5 bg-brand-accent" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
