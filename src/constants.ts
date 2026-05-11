import { Project, Experience } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Cinematic Brand Film 2025',
    category: 'FILM & MOTION',
    description: 'A high-end cinematic brand film showcasing premium aesthetic and motion storytelling.',
    role: 'Director / Editor',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    thumbnailUrl: 'https://picsum.photos/seed/motion1/1280/720',
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'AI Generative Visual System',
    category: 'AI VISUAL DESIGN',
    description: 'An experimental visual system created using generative AI and custom prompt engineering.',
    role: 'AI Designer',
    tools: ['Midjourney', 'Runway', 'Stable Diffusion'],
    thumbnailUrl: 'https://picsum.photos/seed/ai1/800/600',
    createdAt: Date.now(),
  },
  {
    id: '3',
    title: 'Tech Review Thumbnail Strategy',
    category: 'THUMBNAIL LAB',
    description: 'Increased CTR by 45% through high-impact visual hierarchy and color strategy.',
    role: 'Visual Designer',
    tools: ['Photoshop', 'Midjourney'],
    thumbnailUrl: 'https://picsum.photos/seed/thumb1/800/450',
    stats: '45% CTR Increase',
    createdAt: Date.now(),
  }
];

export const INITIAL_HOME_CAROUSEL: { id: string, thumbnailUrl: string }[] = [
  { id: 'h1', thumbnailUrl: 'https://picsum.photos/seed/humanoid-robot/1280/720' },
  { id: 'h2', thumbnailUrl: 'https://picsum.photos/seed/robot-factory/1280/720' },
  { id: 'h3', thumbnailUrl: 'https://picsum.photos/seed/ai-cyborg/1280/720' },
  { id: 'h4', thumbnailUrl: 'https://picsum.photos/seed/futuristic-android/1280/720' },
  { id: 'h5', thumbnailUrl: 'https://picsum.photos/seed/robotic-arm-tech/1280/720' },
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    year: '2025',
    company: 'NextGen Media',
    role: 'AI Visual Campaign Director',
    description: [
      'Brand campaign oversight',
      'Generative video production',
      'SNS content strategy'
    ]
  },
  {
    id: '2',
    year: '2024',
    company: 'Freelance',
    role: 'Video Producer',
    description: [
      'YouTube content production',
      'Branded video directing',
      'Shorts system implementation'
    ]
  }
];
