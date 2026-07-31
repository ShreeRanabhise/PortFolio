# Shree Ranabhise — AI Web Developer Portfolio

A modern, responsive, minimalist, and gentle personal portfolio website for **Shree Ranabhise**, built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

Designed with a warm off-white palette, charcoal typography, soft pastel accents (mist blue, muted lavender, soft sage, pale peach), dynamic project case studies, and an interactive **"Ask My Portfolio" AI Guide Assistant**.

---

## ✨ Features

- **Sticky & Accessible Navigation**: Logo badge, quick section links, mobile drawer navigation, theme switcher, and resume request link.
- **Hero Section**: Outcome-focused greeting, availability badge, profile preview card, and primary CTAs.
- **About Section**: Personal story, key values, location status (Pune, MH), and core aspirations.
- **Skills Matrix**: Categorized skills (`[Frontend]`, `[Backend]`, `[Design & UI/UX]`, `[Tools & Cloud]`, `[AI & Methods]`) with an interactive "How I Work" methodology area.
- **Featured Projects**:
  - Filterable by category (`Full-Stack & AI`, `E-Commerce`, `Enterprise ERP`).
  - Realistic seed projects: **Pixelinkx**, **Sangliceramica**, and **SuvarnaLoan ERP**.
  - Dynamic case study pages (`/projects/[slug]`) showcasing overview, challenge, technical approach, impact, tech stack, and lessons learned.
- **Experience & Education**: Vertical timeline featuring 1.1 Yrs Process Associate experience, MCA (CGPA 6.55), and B.Sc. Computer Science (CGPA 9.34 Distinction).
- **Agentic Portfolio Guide**: Floating corner assistant with suggestion chips and deterministic local query matching for instant visitor exploration.
- **Contact Section**: Accessible contact form with validation, success states, and direct email/LinkedIn/GitHub channels.
- **Theme Support**: Refined Light mode (default) and Dark mode using CSS variable tokens.
- **SEO & Accessibility**: Semantic HTML, ARIA attributes, metadata, Open Graph cards, sitemap.xml, and robots.txt.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme Management**: [Next Themes](https://github.com/pacocoursey/next-themes)

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure Node.js (v18.17+ or v20+) and npm are installed on your machine.

### 2. Clone & Install Dependencies
```bash
# Clone repository
git clone https://github.com/ShreeRanbhise/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 🎨 Centralized Customization

All portfolio content, personal bio, skills matrix, projects, timeline, and AI guide intents are centralized in a single data file:

```
src/data/portfolioData.ts
```

To customize for your own details:
1. Update `personalInfo` (name, bio, location, email, social links).
2. Edit `skillCategories` to add or modify technologies.
3. Edit `projects` to add new project case studies or update existing ones.
4. Modify `timelineData` for work experience and education history.
5. Customize `aiAssistantIntents` to add new question chips to the floating AI guide.

---

## 📦 Building & Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Vercel will automatically detect Next.js and build the project with zero configuration required.

---

## 📄 License
Created with care by **Shree Ranabhise**. Free to use for personal portfolio inspiration.
