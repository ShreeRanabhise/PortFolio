import { PersonalInfo, SkillCategory, HowIWorkItem, Project, TimelineEntry, Certificate, AIResponseOption } from '@/types/portfolio';

export const personalInfo: PersonalInfo = {
  name: 'Shree Rakesh Ranabhise',
  role: 'AI Web Developer',
  location: 'Pune, India',
  email: 'shreeranbhise99@gmail.com',
  phone: '+91 8767310550',
  dob: '16 August 2002',
  github: 'https://github.com/ShreeRanabhise',
  linkedin: 'https://www.linkedin.com/in/shreeranabhise',
  bio: 'Hello, my name is Shree Rakesh Ranabhise. I am a passionate software developer with experience in building full-stack web applications using Next.js, React, TypeScript, PostgreSQL, Prisma, and Supabase. Through my projects, I have gained practical knowledge of cloud-based application development, authentication, database design, and deployment on platforms like Vercel. I enjoy solving real-world problems, continuously learning new technologies, and collaborating with teams. I am excited about opportunities in Cloud Architecture and Full-Stack Web Development, where I can contribute, learn from experienced professionals, and build impactful applications.',
  availability: 'Open for Web Design and Development',
  collaborationStatus: 'Actively seeking opportunities to build intelligent cloud-native web apps',
  outcomesStatement: 'Building scalable, AI-infused web applications and resilient cloud systems that solve real-world business challenges.',
  languages: [
    { language: 'English', proficiency: 'Professional Working Proficiency' },
    { language: 'Hindi & Marathi', proficiency: 'Native or Bilingual Proficiency' }
  ],
  interests: ['Sports', 'Travel', 'Designing', 'Social Service', 'Creativity'],
  keyValues: [
    {
      title: 'Resilient Cloud Architecture',
      description: 'Designing modular, scalable backend systems with solid database schemas and cloud services.',
      iconName: 'Server'
    },
    {
      title: 'Human-Centered AI Interfaces',
      description: 'Blending AI capabilities seamlessly into intuitive web UIs with high performance and accessibility.',
      iconName: 'Cpu'
    },
    {
      title: 'Continuous Optimization',
      description: 'Prioritizing clean code, type safety, performance diagnostics, and smooth user interactions.',
      iconName: 'Zap'
    },
    {
      title: 'Collaborative Growth',
      description: 'Eager to learn from experienced engineering teams and share knowledge through proactive communication.',
      iconName: 'Users'
    }
  ]
};

export const certificatesData: Certificate[] = [
  {
    title: 'Web Development',
    issuer: 'Bolt IoT',
    period: 'Sep 2022 - Nov 2022',
    skills: ['PHP', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.JS', 'SQL', 'TypeScript', 'Express']
  },
  {
    title: 'Data Analytics',
    issuer: 'Anudip Foundation',
    period: 'Aug 2024 - Feb 2025',
    skills: ['MS Excel', 'Power BI', 'SQL', 'Python', 'Soft Skills', 'Data Cleaning', 'Sorting', 'SEO']
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend & SEO',
    description: 'Creating responsive, dynamic, accessible user interfaces with search engine optimization',
    skills: [
      { name: 'React.js', level: 'Advanced' },
      { name: 'Next.js (App Router)', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'SEO Optimization', level: 'Advanced' },
      { name: 'JavaScript (ES6+)', level: 'Advanced' },
      { name: 'HTML5 & CSS3', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'Responsive Web Design', level: 'Advanced' }
    ]
  },
  {
    category: 'Backend',
    description: 'Developing structured APIs, ORMs, and secure server logic',
    skills: [
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'PostgreSQL', level: 'Intermediate' },
      { name: 'Prisma ORM', level: 'Intermediate' },
      { name: 'Supabase', level: 'Intermediate' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'Python', level: 'Intermediate' }
    ]
  },
  {
    category: 'Design & UI/UX',
    description: 'Crafting modern component design systems and smooth interactions',
    skills: [
      { name: 'UI/UX Design Principles', level: 'Advanced' },
      { name: 'Component Architecture', level: 'Advanced' },
      { name: 'Framer Motion', level: 'Intermediate' },
      { name: 'Design Tokens & CSS Variables', level: 'Advanced' },
      { name: 'Responsive Layouts', level: 'Advanced' }
    ]
  },
  {
    category: 'Tools & Cloud',
    description: 'Leveraging cloud platforms, containers, and deployment workflows',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'Vercel Deployment', level: 'Advanced' },
      { name: 'Cloud Architecture Concepts', level: 'Intermediate' },
      { name: 'CI/CD Workflows', level: 'Intermediate' }
    ]
  },
  {
    category: 'SEO & Web Performance',
    description: 'Implementing search engine optimization, JSON-LD structured data, OpenGraph, and speed tuning',
    skills: [
      { name: 'Technical SEO', level: 'Advanced' },
      { name: 'JSON-LD Structured Data', level: 'Advanced' },
      { name: 'OpenGraph & Social Cards', level: 'Advanced' },
      { name: 'Core Web Vitals & Speed', level: 'Advanced' },
      { name: 'Dynamic Sitemaps & Robots', level: 'Advanced' }
    ]
  },
  {
    category: 'AI & Methods',
    description: 'Incorporating generative AI tooling, prompt engineering, and agile problem solving',
    skills: [
      { name: 'AI Development Tools', level: 'Advanced' },
      { name: 'Prompt Engineering', level: 'Advanced' },
      { name: 'Generative AI Integration', level: 'Advanced' },
      { name: 'Problem Solving', level: 'Advanced' },
      { name: 'Agile Teamwork', level: 'Proficient' }
    ]
  }
];

export const howIWork: HowIWorkItem[] = [
  {
    title: 'Component-Driven Architecture',
    description: 'Modular, reusable components with strict TypeScript types for maximum code clarity and long-term maintainability.',
    icon: 'Layers'
  },
  {
    title: 'Cloud & Database Security',
    description: 'Strict row-level security (RLS), type-safe ORMs, and sanitized input validation on all backend endpoints.',
    icon: 'ShieldCheck'
  },
  {
    title: 'SEO & Search Visibility',
    description: 'Integrating technical SEO, JSON-LD structured data schemas, OpenGraph meta tags, and Core Web Vitals for maximum Google indexability.',
    icon: 'Search'
  },
  {
    title: 'User-First Speed & Performance',
    description: 'Focusing on fast page load speeds, micro-interactions, responsive layouts, and accessible color contrast.',
    icon: 'Activity'
  }
];

export const projects: Project[] = [
  {
    slug: 'pixelink',
    title: 'Pixelink',
    shortDescription: 'An AI-enhanced creative platform for digital web assets and seamless interactive experience design.',
    fullOverview: 'Pixelink is a modern web application engineered for digital creators and web developers. It integrates AI-powered prompt workflows with dynamic canvas previews, letting users quickly iterate on visual layouts, export clean code snippets, and streamline digital asset generation.',
    challenge: 'Connecting real-time AI responses to dynamic UI preview components while keeping rendering responsive and avoiding layout shifts on complex viewports.',
    outcome: 'Delivered an intuitive workspace that reduced creation time by 40% for asset mockups, featuring optimistic UI updates and structured state management.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'AI Prompt Engineering'],
    category: 'Full-Stack & AI',
    featured: true,
    githubUrl: 'https://github.com/ShreeRanabhise/pixelink',
    liveUrl: 'https://www.pixelinkx.com',
    previewImage: '/images/pixelink-preview.png',
    imagePlaceholder: {
      accentColor: 'mist',
      badgeText: 'AI Web App',
      mockupType: 'dashboard'
    },
    approach: [
      'Architected custom client hooks for fluid AI stream state management.',
      'Designed reusable Tailwind CSS component cards with dark and light mode adaptation.',
      'Optimized client bundle size with lazy loading and dynamic component imports.'
    ],
    impactHighlights: [
      'Interactive canvas rendering with instantaneous response states.',
      'Accessible keyboard shortcuts for power-user operations.',
      'Zero layout shifts (CLS < 0.01) across mobile and desktop screens.'
    ],
    lessonsLearned: [
      'Managing complex async states during AI token streaming requires careful UI fallback design.',
      'Decoupling UI component tokens from logic yields significantly faster feature iterations.'
    ]
  },
  {
    slug: 'sangliceramica',
    title: 'Sangliceramica',
    shortDescription: 'Full-stack architectural ceramics showcase and e-commerce product catalog web application built with Supabase.',
    fullOverview: 'Sangliceramica is a production-grade catalog and e-commerce web application tailored for architectural ceramic products. It features real-time search, multi-attribute filtering (finish, size, application area), detailed product specifications, and direct customer inquiry channels.',
    challenge: 'Managing extensive product datasets with rich image metadata and complex filter combinations while ensuring lightning-fast search indexing and zero database latency.',
    outcome: 'Implemented full PostgreSQL database schemas in Supabase with Prisma ORM, server-side caching, and dynamic static regeneration for seamless browsing.',
    techStack: ['Next.js (App Router)', 'TypeScript', 'Supabase', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    category: 'E-Commerce',
    featured: true,
    githubUrl: 'https://github.com/ShreeRanabhise/sangliceramica',
    liveUrl: 'https://www.sangliceramica.com',
    previewImage: '/images/sangliceramica-preview.png',
    imagePlaceholder: {
      accentColor: 'sage',
      badgeText: 'Full-Stack E-Commerce',
      mockupType: 'ecommerce'
    },
    approach: [
      'Designed relational PostgreSQL database schemas with indexing for fast category queries.',
      'Integrated Supabase authentication and server actions for secure product management.',
      'Created an elegant, warm minimalist storefront with image gallery lightboxes and specification downloads.'
    ],
    impactHighlights: [
      'Sub-100ms multi-facet filter response time on large product catalogs.',
      'Mobile-first responsive drawer navigation and touch-friendly product carousels.',
      'Production deployment on Vercel with optimized dynamic routing.'
    ],
    lessonsLearned: [
      'Effective database indexing and relational join optimization are critical for multi-filter e-commerce platforms.',
      'Combining Next.js App Router server components with Supabase yields exceptional performance.'
    ]
  },
  {
    slug: 'suvarna-erp',
    title: 'Suvarna-ERP',
    shortDescription: 'Enterprise financial loan management system automating credit calculations and customer ledgers.',
    fullOverview: 'Suvarna-ERP is an end-to-end financial operations platform engineered for gold and personal loan processing. It automates loan valuation calculations, interest scheduling, customer KYC verification tracking, repayment recording, and detailed audit reporting.',
    challenge: 'Designing a secure multi-role dashboard system with stringent data validation, complex interest calculation logic, and strict compliance records.',
    outcome: 'Built a robust management portal with intuitive financial calculators, interactive table filters, automated ledger entries, and audit logs.',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS', 'REST APIs'],
    category: 'Enterprise ERP',
    featured: true,
    githubUrl: 'https://github.com/ShreeRanabhise/suvarna-erp',
    liveUrl: 'https://suvarna-erp.vercel.app',
    previewImage: '/images/suvarna-erp-preview.png',
    imagePlaceholder: {
      accentColor: 'lavender',
      badgeText: 'Enterprise ERP',
      mockupType: 'erp'
    },
    approach: [
      'Formulated precision math modules for dynamic interest rate schedules and penalty tracking.',
      'Structured role-based access control (RBAC) schemas to protect sensitive financial records.',
      'Developed data visualizer dashboards with real-time financial health charts.'
    ],
    impactHighlights: [
      'Streamlined loan processing workflow from hours to under 15 minutes per applicant.',
      'Built exportable PDF/CSV reporting engines for financial auditing.',
      'Delivered clean keyboard-navigable tabular data views for enterprise operators.'
    ],
    lessonsLearned: [
      'Financial applications require bulletproof server-side input validation and atomic database transactions.',
      'Clear table UI density and readable data visualization dramatically reduce user entry errors.'
    ]
  }
];

export const timelineData: TimelineEntry[] = [
  {
    id: 'exp-1',
    type: 'experience',
    organization: 'IGT Solutions Private Limited',
    role: 'Process Associate',
    period: 'Dec 2023 - Jan 2026',
    location: 'Pune, MH, India',
    summary: 'Executed structured operations, data validation, client communication, and technology workflows at IGT Solutions Private Limited.',
    keyAchievements: [
      'Maintained 98%+ process workflow accuracy and data validation standards.',
      'Collaborated across cross-functional teams for operational efficiency.',
      'Utilized technical troubleshooting and automated scripts to optimize daily task completion.'
    ],
    badge: 'Work Experience'
  },
  {
    id: 'edu-mca',
    type: 'education',
    organization: 'ASM’S Institute of Business Management and Research, Pune MH (Savitribai Phule Pune University)',
    role: 'Post Graduation : Master of Computer Applications',
    period: 'Aug 2023 - Apr 2026',
    location: 'Pune, MH',
    summary: 'Advanced postgraduate degree focusing on full-stack web applications, database management systems, cloud computing, and software engineering.',
    keyAchievements: [
      'CGPA: 6.45',
      'Specializing in Modern Web Architecture, PostgreSQL Database Design, and Cloud Systems.',
      'Developing production-ready web apps with Next.js, Supabase, and Vercel.'
    ],
    gradeOrCgpa: 'CGPA : 6.45',
    badge: 'Post Graduation'
  },
  {
    id: 'edu-bsc',
    type: 'education',
    organization: 'Vijaysinha Yadav College of Arts and Science, Kolhapur MH (Shivaji University, Kolhapur)',
    role: 'Graduation : Bachelor of Science : Computer Science',
    period: 'Jul 2020 - May 2023',
    location: 'Kolhapur, MH',
    summary: 'Graduated with distinction honors in Computer Science fundamentals, data structures, algorithms, and web programming.',
    keyAchievements: [
      'CGPA: 9.34 (Distinction)',
      'Recognized for exceptional academic performance across core Computer Science subjects.'
    ],
    gradeOrCgpa: 'CGPA : 9.34',
    badge: 'Graduation (Distinction)'
  },
  {
    id: 'edu-hsc',
    type: 'education',
    organization: 'Warna Mahavidyalaya Warnanagar, Kolhapur MH (Maharashtra State Board)',
    role: 'HSC : Science',
    period: 'Jun 2019 - May 2020',
    location: 'Kolhapur, MH',
    summary: 'Higher Secondary Certificate education in Science discipline.',
    keyAchievements: [
      'Marks : 55.08 %'
    ],
    gradeOrCgpa: 'Marks : 55.08 %',
    badge: 'HSC Science'
  },
  {
    id: 'edu-ssc',
    type: 'education',
    organization: 'Balwantrao Yadav High School, Kolhapur MH (Maharashtra State Board)',
    role: 'SSC',
    period: 'Jun 2017 - May 2018',
    location: 'Kolhapur, MH',
    summary: 'Secondary School Certificate general education foundation.',
    keyAchievements: [
      'Marks : 84.20 %'
    ],
    gradeOrCgpa: 'Marks : 84.20 %',
    badge: 'SSC Honors'
  }
];

export const aiAssistantIntents: AIResponseOption[] = [
  {
    id: 'frontend',
    question: 'Show frontend work',
    answer: 'Shree specializes in Next.js, React, TypeScript, and Tailwind CSS. He creates responsive, accessible interfaces with Framer Motion animations. Take a look at Pixelink and Sangliceramica for prime frontend examples!',
    relatedCategory: 'Frontend',
    relatedProjectSlug: 'pixelink',
    actionText: 'Explore Projects Section',
    actionUrl: '#projects'
  },
  {
    id: 'startups',
    question: 'Best project for startups',
    answer: 'Sangliceramica demonstrates a full-stack Next.js + Supabase architecture perfect for startups—featuring PostgreSQL databases, Prisma ORM, dynamic product search, and Vercel cloud deployment.',
    relatedProjectSlug: 'sangliceramica',
    actionText: 'View Sangliceramica Detail',
    actionUrl: '/projects/sangliceramica'
  },
  {
    id: 'technologies',
    question: 'What technologies do you use?',
    answer: 'Shree uses Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Prisma, Supabase, Python, Docker, REST APIs, Git, and AI tools like Prompt Engineering.',
    relatedCategory: 'Backend',
    actionText: 'Inspect Skills Matrix',
    actionUrl: '#skills'
  },
  {
    id: 'work_together',
    question: 'How can we work together?',
    answer: 'Shree is actively looking for Cloud Architecture and Full-Stack Web Development roles! You can send an email to shreeranbhise99@gmail.com or connect via LinkedIn.',
    actionText: 'Go to Contact Section',
    actionUrl: '#contact'
  }
];
