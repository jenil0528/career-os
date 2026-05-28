// ===== Resume Analysis Types =====
export interface ResumeAnalysis {
  atsScore: number;
  overallGrade: string;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  foundKeywords: string[];
  suggestions: string[];
  recruiterFeedback: string;
  roastFeedback: string;
  sections: {
    contact: SectionScore;
    experience: SectionScore;
    education: SectionScore;
    skills: SectionScore;
    projects: SectionScore;
    formatting: SectionScore;
  };
}

export interface SectionScore {
  score: number;
  feedback: string;
}

// ===== Interview Types =====
export type InterviewMode = "hr" | "technical" | "startup" | "product" | "sales" | "marketing";

export interface InterviewMessage {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: Date;
  analysis?: AnswerAnalysis;
}

export interface AnswerAnalysis {
  confidenceScore: number;
  communicationScore: number;
  technicalScore: number;
  fillerWords: string[];
  feedback: string;
}

export interface InterviewResult {
  overallScore: number;
  communicationScore: number;
  confidenceScore: number;
  technicalScore: number;
  totalQuestions: number;
  duration: number;
  strengths: string[];
  improvements: string[];
  detailedFeedback: QuestionFeedback[];
}

export interface QuestionFeedback {
  question: string;
  answer: string;
  score: number;
  feedback: string;
}

// ===== Roadmap Types =====
export interface CareerRoadmap {
  role: string;
  estimatedDuration: string;
  phases: RoadmapPhase[];
}

export interface RoadmapPhase {
  id: string;
  title: string;
  duration: string;
  description: string;
  skills: RoadmapSkill[];
  projects: RoadmapProject[];
  certifications: string[];
  resources: RoadmapResource[];
  isCompleted?: boolean;
}

export interface RoadmapSkill {
  name: string;
  level: "beginner" | "intermediate" | "advanced";
  isCompleted?: boolean;
}

export interface RoadmapProject {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  techStack: string[];
}

export interface RoadmapResource {
  title: string;
  type: "course" | "book" | "tutorial" | "documentation" | "video";
  url?: string;
  platform?: string;
}

// ===== Dashboard Types =====
export interface DashboardStats {
  atsScore: number;
  interviewReadiness: number;
  skillsProgress: number;
  resumesAnalyzed: number;
  interviewsCompleted: number;
  roadmapsGenerated: number;
}

export interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  matchPercentage: number;
  salary: string;
  type: "full-time" | "internship" | "contract";
  postedDate: string;
}

export interface AISuggestion {
  id: string;
  type: "resume" | "interview" | "skill" | "general";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  actionUrl: string;
}

// ===== Job Match Engine Types =====
export interface UserSkillProfile {
  skills: string[];
  experienceLevel: "entry" | "mid" | "senior";
  technologies: string[];
  projects: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface MatchedJob {
  id: string;
  role: string;
  company: string;
  url?: string;
  matchPercentage: number;
  strongSkills: string[];
  missingSkills: string[];
  recommendedLearning: string[];
  salaryRange: string;
  workMode: "Remote" | "Hybrid" | "Onsite";
  careerGrowth: number; // 1-5 rating
  interviewReadiness: number; // 0-100
  whyMatch: string;
  requiredSkills: string[];
  required_skills?: string[]; // To handle API mismatch
}

export interface SkillGapData {
  skill: string;
  currentLevel: number; // 0-100
  targetLevel: number; // 0-100
  category: string;
}

export interface CareerRecommendation {
  bestPaths: { role: string; readiness: number; message: string }[];
  nextSkills: { name: string; priority: "high" | "medium" | "low"; reason: string }[];
  certifications: { name: string; provider: string; relevance: string }[];
  portfolioProjects: { title: string; description: string; techStack: string[] }[];
  hackathonSuggestions: string[];
  personalizedMessage: string;
}

export interface JobMatchResult {
  userProfile: UserSkillProfile;
  matchedJobs: MatchedJob[];
  skillGaps: SkillGapData[];
  recommendations: CareerRecommendation;
  trendingJobs: { role: string; demand: string; avgSalary: string; growth: string }[];
}
