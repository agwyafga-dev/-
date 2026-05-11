export interface HomeCarouselItem {
  id: string;
  thumbnailUrl: string;
  linkUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'FILM & MOTION' | 'AI VISUAL DESIGN' | 'THUMBNAIL LAB';
  description: string;
  role: string;
  tools: string[];
  thumbnailUrl: string;
  videoUrl?: string; // Vimeo or YouTube
  stats?: string; // for thumbnail lab
  createdAt: number;
}

export interface Experience {
  id: string;
  year: string;
  company: string;
  role: string;
  description: string[];
}
