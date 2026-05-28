import type {
  ResumeAnalysis,
  InterviewResult,
  CareerRoadmap,
  DashboardStats,
  JobRecommendation,
  AISuggestion,
  JobMatchResult,
} from "@/types";

// ===== DEMO RESUME ANALYSIS =====
export const DEMO_RESUME_ANALYSIS: ResumeAnalysis = {
  atsScore: 72,
  overallGrade: "B+",
  strengths: [
    "Strong technical skills section with relevant technologies",
    "Quantified achievements in work experience (increased revenue by 35%)",
    "Clean formatting with consistent structure",
    "Relevant project experience with modern tech stack",
    "Education from a reputable institution",
  ],
  weaknesses: [
    "Missing a professional summary or objective statement",
    "No mention of soft skills or leadership experience",
    "Work experience descriptions could be more action-oriented",
    "Missing links to portfolio, GitHub, or LinkedIn",
    "No certifications or professional development listed",
  ],
  missingKeywords: [
    "Agile",
    "Scrum",
    "CI/CD",
    "Docker",
    "Kubernetes",
    "AWS",
    "microservices",
    "REST API",
    "unit testing",
    "Git",
  ],
  foundKeywords: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "JavaScript",
    "SQL",
    "MongoDB",
    "HTML",
    "CSS",
    "machine learning",
  ],
  suggestions: [
    "Add a compelling professional summary at the top (2-3 sentences)",
    "Include links to your GitHub profile and portfolio website",
    "Use stronger action verbs: 'Architected', 'Spearheaded', 'Optimized'",
    "Add relevant certifications (AWS, Google Cloud, etc.)",
    "Include keywords like 'Agile', 'CI/CD', 'Docker' if applicable",
    "Quantify more achievements with specific numbers and percentages",
    "Add a 'Leadership & Activities' section to show soft skills",
    "Tailor your resume to each job description for higher ATS match",
  ],
  recruiterFeedback:
    "This is a solid resume from a technical standpoint. The candidate clearly has hands-on experience with modern technologies. However, it reads more like a task list than a story of impact. I'd want to see more about HOW they made a difference — not just what they did. The missing professional summary is a missed opportunity to make a strong first impression. With some polish on the narrative and addition of relevant keywords, this could easily be an A-tier resume.",
  roastFeedback:
    "Oh honey, where do I start? Your resume screams 'I copy-pasted my job description and called it a day.' No summary? Bold move — let the recruiter figure out who you are like a mystery novel. Your skills section is basically a Wikipedia article on programming languages. And those bullet points? 'Developed features' — wow, groundbreaking stuff! Next you'll tell me you also 'used a computer' at work. Listen, you've got potential buried under all that blandness. Let's dig it out, shall we? 🔥",
  sections: {
    contact: {
      score: 65,
      feedback:
        "Basic contact info present but missing LinkedIn URL and portfolio link. Add professional online presence links.",
    },
    experience: {
      score: 75,
      feedback:
        "Good use of some metrics. Could improve with stronger action verbs and more quantified results. Focus on impact, not tasks.",
    },
    education: {
      score: 85,
      feedback:
        "Education section is well-formatted with GPA and relevant coursework. Consider adding honors or relevant activities.",
    },
    skills: {
      score: 78,
      feedback:
        "Strong technical skills listed. Consider categorizing (Languages, Frameworks, Tools) and adding proficiency levels.",
    },
    projects: {
      score: 70,
      feedback:
        "Projects show initiative. Add links to live demos or GitHub repos. Include tech stack and your specific contributions.",
    },
    formatting: {
      score: 80,
      feedback:
        "Clean layout, good use of whitespace. Consider using a more modern template. Ensure consistent date formatting throughout.",
    },
  },
};

// ===== DEMO INTERVIEW RESULT =====
export const DEMO_INTERVIEW_RESULT: InterviewResult = {
  overallScore: 78,
  communicationScore: 82,
  confidenceScore: 71,
  technicalScore: 80,
  totalQuestions: 8,
  duration: 1200,
  strengths: [
    "Clear and structured responses using STAR method",
    "Strong technical knowledge demonstrated",
    "Good examples from past experience",
    "Professional tone throughout the interview",
  ],
  improvements: [
    "Reduce filler words ('um', 'like', 'you know')",
    "Provide more specific numbers and metrics",
    "Show more enthusiasm and energy",
    "Ask more questions about the role and company",
  ],
  detailedFeedback: [
    {
      question: "Tell me about yourself and your background.",
      answer:
        "I'm a software engineer with 2 years of experience in full-stack development...",
      score: 85,
      feedback:
        "Good structured response. Could be more concise and highlight unique value proposition.",
    },
    {
      question:
        "Describe a challenging project you worked on and how you overcame obstacles.",
      answer:
        "In my last role, I worked on migrating a legacy system to microservices...",
      score: 80,
      feedback:
        "Strong use of STAR method. Add more specific metrics about the impact of your solution.",
    },
    {
      question: "How do you handle disagreements with team members?",
      answer:
        "I believe in open communication and finding common ground...",
      score: 75,
      feedback:
        "Good principles but could use a more specific real-world example.",
    },
  ],
};

// ===== DEMO ROADMAP =====
export const DEMO_ROADMAP: CareerRoadmap = {
  role: "AI Engineer",
  estimatedDuration: "6-9 months",
  phases: [
    {
      id: "phase-1",
      title: "Python & Math Foundations",
      duration: "4-6 weeks",
      description:
        "Build a strong foundation in Python programming and the mathematics essential for AI/ML.",
      skills: [
        { name: "Python (Advanced)", level: "intermediate" },
        { name: "Linear Algebra", level: "beginner" },
        { name: "Calculus", level: "beginner" },
        { name: "Probability & Statistics", level: "beginner" },
        { name: "NumPy & Pandas", level: "intermediate" },
      ],
      projects: [
        {
          title: "Data Analysis Pipeline",
          description:
            "Build an end-to-end data pipeline that ingests, cleans, and visualizes a real-world dataset.",
          difficulty: "easy",
          techStack: ["Python", "Pandas", "Matplotlib", "Jupyter"],
        },
      ],
      certifications: ["IBM Python for Data Science (Coursera)"],
      resources: [
        {
          title: "3Blue1Brown: Essence of Linear Algebra",
          type: "video",
          platform: "YouTube",
        },
        {
          title: "Python for Data Analysis by Wes McKinney",
          type: "book",
          platform: "O'Reilly",
        },
        {
          title: "Khan Academy: Statistics & Probability",
          type: "course",
          platform: "Khan Academy",
        },
      ],
      isCompleted: true,
    },
    {
      id: "phase-2",
      title: "Machine Learning Fundamentals",
      duration: "6-8 weeks",
      description:
        "Master core ML algorithms, evaluation metrics, and the scikit-learn ecosystem.",
      skills: [
        { name: "Supervised Learning", level: "intermediate" },
        { name: "Unsupervised Learning", level: "intermediate" },
        { name: "Feature Engineering", level: "intermediate" },
        { name: "Model Evaluation", level: "intermediate" },
        { name: "Scikit-learn", level: "intermediate" },
      ],
      projects: [
        {
          title: "Predictive Model Dashboard",
          description:
            "Build and deploy a classification model with an interactive Streamlit dashboard.",
          difficulty: "medium",
          techStack: ["Python", "Scikit-learn", "Streamlit", "Plotly"],
        },
      ],
      certifications: [
        "Andrew Ng's Machine Learning Specialization (Coursera)",
      ],
      resources: [
        {
          title: "Hands-On ML with Scikit-Learn & TensorFlow",
          type: "book",
          platform: "O'Reilly",
        },
        {
          title: "fast.ai Practical ML Course",
          type: "course",
          platform: "fast.ai",
        },
      ],
      isCompleted: false,
    },
    {
      id: "phase-3",
      title: "Deep Learning & Neural Networks",
      duration: "6-8 weeks",
      description:
        "Dive into neural network architectures, CNNs, RNNs, and modern deep learning frameworks.",
      skills: [
        { name: "PyTorch", level: "intermediate" },
        { name: "Neural Network Architecture", level: "intermediate" },
        { name: "CNNs", level: "intermediate" },
        { name: "RNNs & Transformers", level: "intermediate" },
        { name: "Transfer Learning", level: "beginner" },
      ],
      projects: [
        {
          title: "Image Classification API",
          description:
            "Train a CNN for image classification and deploy it as a REST API with FastAPI.",
          difficulty: "medium",
          techStack: ["PyTorch", "FastAPI", "Docker", "Hugging Face"],
        },
      ],
      certifications: ["Deep Learning Specialization (Coursera)"],
      resources: [
        {
          title: "PyTorch Official Tutorials",
          type: "documentation",
          platform: "pytorch.org",
        },
        {
          title: "Deep Learning by Ian Goodfellow",
          type: "book",
          platform: "MIT Press",
        },
      ],
      isCompleted: false,
    },
    {
      id: "phase-4",
      title: "LLMs & Generative AI",
      duration: "4-6 weeks",
      description:
        "Master large language models, prompt engineering, RAG, and fine-tuning techniques.",
      skills: [
        { name: "Prompt Engineering", level: "advanced" },
        { name: "RAG Architecture", level: "intermediate" },
        { name: "Fine-tuning LLMs", level: "intermediate" },
        { name: "LangChain / LlamaIndex", level: "intermediate" },
        { name: "Vector Databases", level: "beginner" },
      ],
      projects: [
        {
          title: "AI-Powered Knowledge Base",
          description:
            "Build a RAG system that answers questions from custom documents using embeddings and vector search.",
          difficulty: "hard",
          techStack: [
            "LangChain",
            "OpenAI API",
            "Pinecone",
            "Next.js",
            "Python",
          ],
        },
      ],
      certifications: [
        "DeepLearning.AI: LangChain for LLM Applications",
      ],
      resources: [
        {
          title: "Andrej Karpathy: State of GPT",
          type: "video",
          platform: "YouTube",
        },
        {
          title: "LangChain Documentation",
          type: "documentation",
          platform: "langchain.com",
        },
      ],
      isCompleted: false,
    },
    {
      id: "phase-5",
      title: "MLOps & Production AI",
      duration: "4-6 weeks",
      description:
        "Learn to deploy, monitor, and scale AI systems in production environments.",
      skills: [
        { name: "Docker & Kubernetes", level: "intermediate" },
        { name: "MLflow / Weights & Biases", level: "intermediate" },
        { name: "Model Serving", level: "intermediate" },
        { name: "CI/CD for ML", level: "beginner" },
        { name: "Cloud Platforms (AWS/GCP)", level: "intermediate" },
      ],
      projects: [
        {
          title: "End-to-End ML Pipeline",
          description:
            "Build a complete ML pipeline with automated training, evaluation, deployment, and monitoring.",
          difficulty: "hard",
          techStack: [
            "MLflow",
            "Docker",
            "AWS SageMaker",
            "GitHub Actions",
            "FastAPI",
          ],
        },
      ],
      certifications: ["AWS Machine Learning Specialty"],
      resources: [
        {
          title: "Made With ML: MLOps Course",
          type: "course",
          platform: "madewithml.com",
        },
        {
          title: "Designing ML Systems by Chip Huyen",
          type: "book",
          platform: "O'Reilly",
        },
      ],
      isCompleted: false,
    },
  ],
};

// ===== DEMO DASHBOARD STATS =====
export const DEMO_DASHBOARD_STATS: DashboardStats = {
  atsScore: 72,
  interviewReadiness: 68,
  skillsProgress: 45,
  resumesAnalyzed: 3,
  interviewsCompleted: 5,
  roadmapsGenerated: 2,
};

// ===== DEMO JOB RECOMMENDATIONS =====
export const DEMO_JOBS: JobRecommendation[] = [
  {
    id: "job-1",
    title: "AI/ML Engineer",
    company: "TechCorp AI",
    location: "San Francisco, CA (Remote)",
    matchPercentage: 92,
    salary: "$120K - $160K",
    type: "full-time",
    postedDate: "2 days ago",
  },
  {
    id: "job-2",
    title: "Software Engineer Intern",
    company: "Google",
    location: "Mountain View, CA",
    matchPercentage: 87,
    salary: "$8K/month",
    type: "internship",
    postedDate: "1 week ago",
  },
  {
    id: "job-3",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "New York, NY (Hybrid)",
    matchPercentage: 85,
    salary: "$100K - $130K",
    type: "full-time",
    postedDate: "3 days ago",
  },
  {
    id: "job-4",
    title: "Data Science Intern",
    company: "Meta",
    location: "Menlo Park, CA",
    matchPercentage: 78,
    salary: "$9K/month",
    type: "internship",
    postedDate: "5 days ago",
  },
];

// ===== DEMO AI SUGGESTIONS =====
export const DEMO_SUGGESTIONS: AISuggestion[] = [
  {
    id: "sug-1",
    type: "resume",
    title: "Add a Professional Summary",
    description:
      "Your resume is missing a summary section. Adding one can increase your ATS score by 10-15 points.",
    priority: "high",
    actionUrl: "/dashboard/resume",
  },
  {
    id: "sug-2",
    type: "interview",
    title: "Practice Behavioral Questions",
    description:
      "You scored lowest on behavioral questions. Practice the STAR method with 5 more mock interviews.",
    priority: "high",
    actionUrl: "/dashboard/interview",
  },
  {
    id: "sug-3",
    type: "skill",
    title: "Learn Docker & Kubernetes",
    description:
      "85% of AI Engineer job postings require containerization skills. Start with Docker basics.",
    priority: "medium",
    actionUrl: "/dashboard/roadmap",
  },
  {
    id: "sug-4",
    type: "general",
    title: "Update Your LinkedIn Profile",
    description:
      "Sync your resume improvements to LinkedIn. Recruiters are 3x more likely to reach out with an optimized profile.",
    priority: "medium",
    actionUrl: "/dashboard",
  },
];

// ===== DEMO INTERVIEW QUESTIONS =====
export const DEMO_INTERVIEW_QUESTIONS = {
  hr: [
    "Tell me about yourself and what brings you here today.",
    "What's your greatest professional achievement and why are you proud of it?",
    "Describe a time when you had to deal with a difficult team member. How did you handle it?",
    "Where do you see yourself in 5 years?",
    "Why are you interested in this particular role and company?",
    "Tell me about a time you failed and what you learned from it.",
    "How do you prioritize your work when you have multiple deadlines?",
    "Do you have any questions for me?",
  ],
  technical: [
    "Can you explain the difference between a stack and a queue? When would you use each?",
    "How would you design a URL shortening service like bit.ly?",
    "Explain the concept of time complexity. What's the difference between O(n) and O(log n)?",
    "How would you optimize a slow database query?",
    "Explain how a REST API works and what makes a good API design.",
    "What is the difference between SQL and NoSQL databases? When would you choose one over the other?",
    "Describe how you would implement authentication in a web application.",
    "What are some common security vulnerabilities in web applications and how do you prevent them?",
  ],
  startup: [
    "If you had unlimited resources, what product would you build and why?",
    "How do you handle ambiguity and rapidly changing priorities?",
    "Tell me about a time you built something from scratch with minimal guidance.",
    "What's your approach to learning a completely new technology in a week?",
    "How would you decide what feature to build next with limited engineering resources?",
    "What's your biggest hot take about the tech industry?",
    "Describe a side project that you're passionate about.",
    "If our company was about to run out of runway in 3 months, what would you do?",
  ],
  product: [
    "How do you prioritize features on a product roadmap?",
    "Describe a time when you had to say no to a stakeholder or important client.",
    "What metrics would you use to measure the success of a new feature launch?",
    "Walk me through a time when a product launch failed. What did you learn?",
    "How do you balance technical debt with shipping new features?",
    "How do you gather and incorporate user feedback into your product decisions?",
    "Describe your experience working with cross-functional teams.",
    "If our user engagement dropped 20% overnight, what steps would you take to investigate?",
  ],
  sales: [
    "Walk me through your process for prospecting and building a pipeline.",
    "How do you handle a prospect who says your product is too expensive?",
    "Tell me about a time you lost a major deal. What happened and what did you learn?",
    "How do you balance closing short-term deals with building long-term relationships?",
    "Describe your most successful cold outreach strategy.",
    "How do you handle gatekeepers when trying to reach decision-makers?",
    "What's your approach to a client who is unhappy with your product?",
    "Sell me this pen.",
  ],
  marketing: [
    "How do you measure the ROI of a marketing campaign?",
    "Describe a successful campaign you led from conception to launch.",
    "How do you adapt your marketing strategy when a competitor launches a similar product?",
    "What channels do you find most effective for B2B vs B2C marketing?",
    "Tell me about a time a marketing campaign didn't perform as expected. How did you pivot?",
    "How do you align marketing goals with overall business objectives?",
    "What's your process for defining and targeting a buyer persona?",
    "How do you stay updated with the latest marketing trends and algorithm changes?",
  ],
};

// ===== DEMO JOB MATCH RESULT =====
export const DEMO_JOB_MATCH_RESULT: JobMatchResult = {
  userProfile: {
    skills: ["React", "JavaScript", "TypeScript", "Python", "Node.js", "HTML", "CSS", "SQL", "MongoDB", "Git"],
    experienceLevel: "mid",
    technologies: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "Git", "VS Code"],
    projects: ["E-commerce Platform", "Portfolio Website", "Chat Application", "Data Visualization Dashboard"],
    strengths: ["Strong frontend development skills", "Good understanding of modern frameworks", "Experience with databases", "Clean code practices"],
    weaknesses: ["Limited DevOps experience", "No cloud certifications", "Minimal ML/AI experience", "Needs more system design knowledge"],
  },
  matchedJobs: [
    {
      id: "match-1",
      role: "Frontend Developer",
      company: "Vercel",
      matchPercentage: 82,
      strongSkills: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"],
      missingSkills: ["Testing (Jest/Cypress)", "Web Accessibility (a11y)", "Performance Optimization", "Micro-frontends"],
      recommendedLearning: ["Build 2 Next.js projects with SSR/SSG", "Learn Jest + React Testing Library", "Practice frontend system design", "Study Web Vitals optimization"],
      salaryRange: "$95K - $140K",
      workMode: "Remote",
      careerGrowth: 4,
      interviewReadiness: 75,
      whyMatch: "Your strong React and TypeScript skills align perfectly with modern frontend roles. Your portfolio projects demonstrate hands-on experience with component architecture.",
      requiredSkills: ["React", "TypeScript", "Next.js", "Testing", "CSS", "HTML", "Performance", "Accessibility"],
    },
    {
      id: "match-2",
      role: "Full Stack Developer",
      company: "StartupXYZ",
      matchPercentage: 78,
      strongSkills: ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB", "SQL"],
      missingSkills: ["GraphQL", "Redis", "Message Queues", "CI/CD Pipelines"],
      recommendedLearning: ["Build a full-stack app with GraphQL", "Learn Redis for caching", "Set up CI/CD with GitHub Actions", "Study microservices patterns"],
      salaryRange: "$100K - $150K",
      workMode: "Hybrid",
      careerGrowth: 5,
      interviewReadiness: 70,
      whyMatch: "Your combined frontend and backend experience makes you a natural fit. Your chat application project shows you can build end-to-end features.",
      requiredSkills: ["React", "Node.js", "TypeScript", "Databases", "API Design", "GraphQL", "DevOps", "Testing"],
    },
    {
      id: "match-3",
      role: "Backend Developer",
      company: "Stripe",
      matchPercentage: 72,
      strongSkills: ["Node.js", "Python", "SQL", "MongoDB", "Git"],
      missingSkills: ["System Design", "Kubernetes", "AWS/GCP", "Message Queues", "gRPC"],
      recommendedLearning: ["Deep dive into system design (Grokking)", "Get AWS Cloud Practitioner certified", "Build a microservices project", "Learn about database scaling"],
      salaryRange: "$110K - $170K",
      workMode: "Hybrid",
      careerGrowth: 5,
      interviewReadiness: 58,
      whyMatch: "Your Node.js and database skills form a solid backend foundation. Your Python experience adds versatility for scripting and automation tasks.",
      requiredSkills: ["Node.js", "Python", "Databases", "System Design", "Cloud (AWS/GCP)", "Docker", "Kubernetes", "APIs"],
    },
    {
      id: "match-4",
      role: "AI Engineer",
      company: "TechCorp AI",
      matchPercentage: 68,
      strongSkills: ["Python", "JavaScript", "Git", "SQL"],
      missingSkills: ["PyTorch/TensorFlow", "Machine Learning", "LLM APIs", "Vector Databases", "MLOps"],
      recommendedLearning: ["Complete Andrew Ng's ML Specialization", "Build 3 ML projects with PyTorch", "Learn LangChain and RAG patterns", "Study MLOps with MLflow"],
      salaryRange: "$120K - $180K",
      workMode: "Remote",
      careerGrowth: 5,
      interviewReadiness: 42,
      whyMatch: "Your Python foundation and data visualization project show aptitude for AI work. With focused learning in ML frameworks, you can transition effectively.",
      requiredSkills: ["Python", "PyTorch", "Machine Learning", "Deep Learning", "LLMs", "Vector DBs", "MLOps", "Math"],
    },
    {
      id: "match-5",
      role: "Data Scientist",
      company: "Meta",
      matchPercentage: 58,
      strongSkills: ["Python", "SQL", "Git"],
      missingSkills: ["Statistics", "R", "Pandas/NumPy", "Data Visualization (Tableau)", "A/B Testing", "Feature Engineering"],
      recommendedLearning: ["Take Statistics & Probability courses", "Master Pandas and NumPy", "Build data analysis portfolio", "Learn experiment design"],
      salaryRange: "$100K - $160K",
      workMode: "Onsite",
      careerGrowth: 4,
      interviewReadiness: 35,
      whyMatch: "Your SQL and Python skills are a starting point for data science. Your data visualization dashboard project shows interest in data-driven work.",
      requiredSkills: ["Python", "SQL", "Statistics", "Pandas", "NumPy", "ML Basics", "Data Viz", "A/B Testing"],
    },
    {
      id: "match-6",
      role: "DevOps Engineer",
      company: "AWS",
      matchPercentage: 45,
      strongSkills: ["Git", "Docker"],
      missingSkills: ["Kubernetes", "Terraform", "CI/CD", "Cloud Architecture", "Monitoring", "Linux Admin", "Networking"],
      recommendedLearning: ["Get AWS Solutions Architect cert", "Learn Kubernetes from scratch", "Build CI/CD pipelines", "Study Infrastructure as Code"],
      salaryRange: "$105K - $165K",
      workMode: "Hybrid",
      careerGrowth: 4,
      interviewReadiness: 25,
      whyMatch: "Your Git and basic Docker knowledge is a start, but this role requires significant infrastructure and cloud expertise that would take focused study.",
      requiredSkills: ["Docker", "Kubernetes", "AWS/GCP/Azure", "Terraform", "CI/CD", "Linux", "Networking", "Monitoring"],
    },
    {
      id: "match-7",
      role: "Cybersecurity Analyst",
      company: "CrowdStrike",
      matchPercentage: 35,
      strongSkills: ["Python", "Git"],
      missingSkills: ["Network Security", "Penetration Testing", "SIEM Tools", "Incident Response", "Cryptography", "Compliance (SOC2/ISO)"],
      recommendedLearning: ["Get CompTIA Security+ certification", "Learn OWASP Top 10", "Practice on HackTheBox/TryHackMe", "Study network protocols"],
      salaryRange: "$85K - $140K",
      workMode: "Onsite",
      careerGrowth: 4,
      interviewReadiness: 15,
      whyMatch: "Your Python scripting ability is useful for security automation, but this career path requires specialized security knowledge and certifications.",
      requiredSkills: ["Python", "Network Security", "Pen Testing", "SIEM", "Incident Response", "Cryptography", "Linux", "Compliance"],
    },
  ],
  skillGaps: [
    { skill: "React", currentLevel: 85, targetLevel: 90, category: "Frontend" },
    { skill: "TypeScript", currentLevel: 70, targetLevel: 90, category: "Frontend" },
    { skill: "Next.js", currentLevel: 60, targetLevel: 85, category: "Frontend" },
    { skill: "Node.js", currentLevel: 75, targetLevel: 85, category: "Backend" },
    { skill: "Python", currentLevel: 65, targetLevel: 85, category: "Backend" },
    { skill: "SQL", currentLevel: 70, targetLevel: 80, category: "Database" },
    { skill: "Docker", currentLevel: 40, targetLevel: 75, category: "DevOps" },
    { skill: "AWS/Cloud", currentLevel: 20, targetLevel: 70, category: "DevOps" },
    { skill: "Testing", currentLevel: 35, targetLevel: 80, category: "Quality" },
    { skill: "System Design", currentLevel: 30, targetLevel: 75, category: "Architecture" },
    { skill: "Machine Learning", currentLevel: 15, targetLevel: 70, category: "AI/ML" },
    { skill: "CI/CD", currentLevel: 25, targetLevel: 70, category: "DevOps" },
  ],
  recommendations: {
    bestPaths: [
      { role: "Frontend Developer", readiness: 82, message: "You're strongly positioned for frontend roles. A few weeks of focused testing and accessibility study could push you to 90%+." },
      { role: "Full Stack Developer", readiness: 78, message: "Your combined skills make full-stack very achievable. Focus on GraphQL and CI/CD to round out your capabilities." },
      { role: "Backend Developer", readiness: 72, message: "Solid foundation, but invest in system design and cloud services to compete for top backend positions." },
      { role: "AI Engineer", readiness: 68, message: "Your Python base is a good start. Committing 3-4 months to ML fundamentals could open exciting AI career paths." },
    ],
    nextSkills: [
      { name: "Testing (Jest/Cypress)", priority: "high", reason: "Required by 92% of frontend job postings. Biggest gap relative to your target roles." },
      { name: "Next.js (Advanced)", priority: "high", reason: "Server components, ISR, and middleware are must-haves for modern React roles." },
      { name: "System Design", priority: "high", reason: "Critical for senior-level interviews. Start with distributed systems basics." },
      { name: "Docker & CI/CD", priority: "medium", reason: "DevOps literacy is expected even for frontend/full-stack roles in 2025." },
      { name: "GraphQL", priority: "medium", reason: "Increasingly common in full-stack roles. Apollo Client + Server is the standard." },
      { name: "AWS Basics", priority: "medium", reason: "Cloud fundamentals open doors to higher-paying positions across all roles." },
    ],
    certifications: [
      { name: "AWS Cloud Practitioner", provider: "Amazon Web Services", relevance: "Entry-level cloud cert that boosts any developer resume" },
      { name: "Meta Frontend Developer Certificate", provider: "Coursera / Meta", relevance: "Validates frontend expertise with industry recognition" },
      { name: "Google Associate Cloud Engineer", provider: "Google Cloud", relevance: "Strong signal for backend and full-stack cloud roles" },
      { name: "CompTIA Security+", provider: "CompTIA", relevance: "Foundation for anyone interested in security-adjacent roles" },
    ],
    portfolioProjects: [
      { title: "Real-time Collaboration Tool", description: "Build a Figma-like canvas with WebSocket collaboration, demonstrating real-time systems knowledge.", techStack: ["Next.js", "Socket.io", "Redis", "PostgreSQL"] },
      { title: "AI-Powered Code Review Bot", description: "Create a GitHub bot that reviews PRs using LLM APIs, showing both AI and DevOps skills.", techStack: ["Python", "OpenAI API", "GitHub API", "FastAPI"] },
      { title: "E-commerce Microservices", description: "Decompose a monolith into microservices with event-driven architecture.", techStack: ["Node.js", "Docker", "RabbitMQ", "Kubernetes", "PostgreSQL"] },
    ],
    hackathonSuggestions: [
      "MLH Global Hack Week — great for building AI/ML projects in teams",
      "HackMIT — prestigious event with strong recruiter presence",
      "ETHGlobal — blockchain hackathons with significant prizes",
      "Google Solution Challenge — social impact + Google mentorship",
      "DevPost AI Hackathons — frequent online events to build AI portfolio",
    ],
    personalizedMessage: "You are 82% ready for a Frontend Developer role and 78% ready for Full Stack. Learning Testing, Next.js advanced patterns, and Docker can increase your hiring potential significantly. Focus on building 2-3 polished portfolio projects that demonstrate end-to-end ownership.",
  },
  trendingJobs: [
    { role: "AI/ML Engineer", demand: "Very High", avgSalary: "$145K", growth: "+40% YoY" },
    { role: "Full Stack Developer", demand: "High", avgSalary: "$125K", growth: "+22% YoY" },
    { role: "Cloud/DevOps Engineer", demand: "High", avgSalary: "$135K", growth: "+28% YoY" },
    { role: "Frontend Developer (React)", demand: "High", avgSalary: "$115K", growth: "+18% YoY" },
    { role: "Data Engineer", demand: "High", avgSalary: "$130K", growth: "+32% YoY" },
    { role: "Cybersecurity Analyst", demand: "Medium-High", avgSalary: "$110K", growth: "+25% YoY" },
    { role: "Mobile Developer (React Native)", demand: "Medium", avgSalary: "$120K", growth: "+15% YoY" },
    { role: "Blockchain Developer", demand: "Medium", avgSalary: "$140K", growth: "+12% YoY" },
  ],
};
