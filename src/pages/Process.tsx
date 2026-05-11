import { motion } from 'motion/react';
import { Search, PenTool, Cpu, Play } from 'lucide-react';

const PROCESS_STEPS = [
  {
    idx: '01',
    title: 'Research',
    description: '브랜드의 본질과 목표를 분석합니다. 시장 트렌드와 사용자 심리를 고려한 핵심 전략을 수립합니다.',
    icon: Search,
  },
  {
    idx: '02',
    title: 'Story Design',
    description: '기획안을 시각적 언어로 번역합니다. 스토리보드와 톤앤매너 설정을 통해 프로젝트의 골격을 만듭니다.',
    icon: PenTool,
  },
  {
    idx: '03',
    title: 'AI Experimentation',
    description: '생성형 AI를 활용해 창의성의 한계를 실험합니다. 프롬프트 엔지니어링과 AI 툴링을 결합해 독창적인 비주얼 리소스를 생성합니다.',
    icon: Cpu,
  },
  {
    idx: '04',
    title: 'Motion Finalization',
    description: '최종적인 감각을 완성합니다. 정교한 편집과 사운드 디자인, 모션 그래픽을 통해 완성도 높은 결과물을 도출합니다.',
    icon: Play,
  }
];

export default function Process() {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <header className="mb-24 text-center max-w-3xl mx-auto">
        <span className="text-brand-accent font-bold tracking-[0.2em] text-xs mb-4 block uppercase underline underline-offset-8">Creative Process</span>
        <h1 className="text-4xl md:text-6xl font-medium mb-8">From Concept to Intelligence</h1>
        <p className="text-brand-secondary font-light text-lg">
          단순한 제작이 아닌, 전략적 사고와 기술적 혁신이 만나는 과정입니다.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PROCESS_STEPS.map((step, idx) => (
          <motion.div
            key={step.idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="glass p-10 rounded-[32px] h-full flex flex-col items-start hover:border-brand-accent transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-500 text-brand-accent">
                <step.icon size={32} />
              </div>
              <span className="text-6xl font-bold text-white/5 mb-4 group-hover:text-brand-accent/10 transition-colors uppercase select-none">{step.idx}</span>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-brand-secondary/80 text-sm font-light leading-relaxed">
                {step.description}
              </p>
            </div>
            {idx < PROCESS_STEPS.length - 1 && (
              <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 opacity-20 group-hover:opacity-50 transition-opacity">
                <div className="w-8 h-[1px] bg-brand-accent" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-32 p-12 glass rounded-[3rem] border-brand-accent/10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-accent/5 to-transparent pointer-events-none" />
        <h2 className="text-3xl font-medium mb-6">Let's build something extraordinary</h2>
        <p className="text-brand-secondary mb-10 max-w-xl mx-auto font-light">
          당신의 브랜드에 생명력을 불어넣을 준비가 되어 있습니다.
          AI와 영상의 결합이 만들어내는 새로운 가능성을 경험해보세요.
        </p>
        <button className="px-10 py-4 bg-white text-brand-bg rounded-full text-sm font-bold tracking-widest hover:bg-brand-accent hover:text-white transition-all shadow-xl shadow-white/5">
          GET IN TOUCH
        </button>
      </div>
    </div>
  );
}
