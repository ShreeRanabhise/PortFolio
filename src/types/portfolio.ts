export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  dob: string;
  github: string;
  linkedin: string;
  bio: string;
  availability: string;
  collaborationStatus: string;
  outcomesStatement: string;
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  interests: string[];
  keyValues: Array<{
    title: string;
    description: string;
    iconName: string;
  }>;
}

export interface Certificate {
  title: string;
  issuer: string;
  period: string;
  skills: string[];
}

export type SkillCategoryType = 'Frontend' | 'Backend' | 'Design & UI/UX' | 'Tools & Cloud' | 'AI & Methods';

export interface SkillCategory {
  category: SkillCategoryType;
  description: string;
  skills: Array<{
    name: string;
    level?: 'Advanced' | 'Intermediate' | 'Proficient';
    icon?: string;
  }>;
}

export interface HowIWorkItem {
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  fullOverview: string;
  challenge: string;
  outcome: string;
  techStack: string[];
  category: 'Full-Stack & AI' | 'E-Commerce' | 'Enterprise ERP';
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
  previewImage?: string;
  imagePlaceholder: {
    accentColor: string;
    badgeText: string;
    mockupType: 'dashboard' | 'ecommerce' | 'erp';
  };
  approach: string[];
  impactHighlights: string[];
  lessonsLearned: string[];
}

export interface TimelineEntry {
  id: string;
  type: 'experience' | 'education';
  organization: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  keyAchievements: string[];
  gradeOrCgpa?: string;
  badge?: string;
}

export interface AIResponseOption {
  id: string;
  question: string;
  answer: string;
  relatedCategory?: string;
  relatedProjectSlug?: string;
  actionText?: string;
  actionUrl?: string;
}
