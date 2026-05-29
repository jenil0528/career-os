<div align="center">
  <h1>🚀 CareerOS — Your AI Placement Agent</h1>
  <p><strong>Ace interviews, optimize resumes, and build your career with AI.</strong></p>
  
  <p>
    <a href="https://career-os-ivory.vercel.app/dashboard" target="_blank">
      <img src="https://img.shields.io/badge/🔴_Live_Demo-career--os--ivory.vercel.app-FF0000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat-square&logo=openai" alt="OpenAI" />
  </p>
</div>

---

CareerOS is a modern, AI-powered web application that acts as your personal placement assistant — combining a **Resume Analyzer**, **Mock Interviewer**, and **Career Roadmap Generator** into one beautiful platform.

## ✨ Features

### 📄 AI Resume Analyzer
- Upload PDF resume and get instant AI analysis.
- **ATS Score** with a detailed section-by-section breakdown.
- Strengths, weaknesses, and missing keywords identification.
- Professional recruiter feedback + 🔥 **Roast Mode**.
- Actionable improvement suggestions.

### 🎤 AI Mock Interviewer
- **3 Interview Modes**: HR, Technical, Startup Founder.
- Real-time conversational AI that adapts to your answers.
- Voice input via Web Speech API.
- Animated AI avatar with speaking/listening states.
- Detailed scoring: Communication, Confidence, Technical.

### 🗺️ Career Roadmap Generator
- Choose from 5+ career paths (AI Engineer, Frontend Dev, Data Scientist, etc.).
- AI-generated learning roadmap with phases, skills, projects.
- Progress tracking with milestone markers.
- Curated resources, certifications, and timelines.

### 📊 Smart Dashboard
- Animated charts and progress indicators.
- AI-powered suggestions and recommendations.
- Job recommendations with match percentages.
- Activity tracking across all features.

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|-------------|-------------------------------------|
| Framework   | Next.js 15 (App Router)             |
| Styling     | Tailwind CSS v4                     |
| Animations  | Motion (formerly Framer Motion)     |
| AI          | OpenAI GPT-4o + Whisper             |
| Auth        | Simulated (Clerk-ready)             |
| Database    | Local state (Supabase-ready)        |
| Icons       | Lucide React                        |
| Charts      | Recharts                            |
| Language    | TypeScript                          |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd careeros

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with:

```env
# OpenAI (optional - app works in demo mode without it)
OPENAI_API_KEY=sk-your-key-here

# Clerk Auth (optional - uses simulated auth by default)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase (optional - uses local state by default)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

> **💡 Demo Mode**: The app works beautifully **without any API keys**! All AI features return realistic demo data for a polished demo experience.

---

## 📁 Project Structure

```
careeros/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Design system
│   │   ├── sign-in/                    # Auth pages
│   │   ├── sign-up/
│   │   ├── dashboard/
│   │   │   ├── page.tsx                # Dashboard home
│   │   │   ├── layout.tsx              # Sidebar layout
│   │   │   ├── resume/page.tsx         # Resume Analyzer
│   │   │   ├── interview/page.tsx      # Mock Interview
│   │   │   ├── roadmap/page.tsx        # Skill Roadmap
│   │   │   └── settings/page.tsx       # Settings
│   │   └── api/
│   │       ├── analyze-resume/         # Resume API
│   │       ├── mock-interview/         # Interview API
│   │       └── generate-roadmap/       # Roadmap API
│   ├── components/
│   │   ├── landing/                    # Landing page sections
│   │   ├── dashboard/                  # Dashboard widgets
│   │   ├── resume/                     # Resume components
│   │   ├── interview/                  # Interview components
│   │   ├── roadmap/                    # Roadmap components
│   │   └── shared/                     # Shared components
│   ├── lib/
│   │   ├── auth-context.tsx            # Auth context
│   │   ├── demo-data.ts               # Demo/mock data
│   │   ├── prompts.ts                 # AI prompts
│   │   └── utils.ts                   # Utilities
│   └── types/
│       └── index.ts                   # TypeScript types
├── .env.local.example
├── tailwind.config.ts
└── package.json
```

---

## 🎨 Design System

- **Theme**: Dark mode with glassmorphism
- **Colors**: Electric blue, purple neon, cyan accent, green success
- **Effects**: Glow shadows, gradient borders, animated backgrounds
- **Animations**: Smooth page transitions, staggered reveals, floating elements
- **Typography**: Inter (body) + Space Grotesk (headings)

---

## 📝 Demo Flow

1. **Landing Page** → Explore the stunning hero and feature sections
2. **Sign In** → Use any email/password (demo mode)
3. **Dashboard** → View animated stats, charts, and AI suggestions
4. **Resume Analyzer** → Upload any PDF → See ATS score and analysis
5. **Mock Interview** → Choose a mode → Chat with AI interviewer
6. **Skill Roadmap** → Select a career path → View learning roadmap

---

## 📜 License

MIT License. Built for hackathons and demos.

---

<p align="center">
  Built with ❤️ by the CareerOS Team
</p>
