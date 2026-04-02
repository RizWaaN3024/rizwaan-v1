export interface NavLink {
  label: string;
  link: string;
}

export interface Skill {
  name: string;
  description: string;
  icon: string;
  bgColor: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  year: string;
}

export interface Experience {
  id: string;
  year: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  achievements: string[];
  tech: string[];
  current: boolean;
}

export interface OpenSourceProgram {
  id: string;
  name: string;
  fullName: string;
  status: string;
  duration: string;
  description: string;
  project: string;
  projectDescription: string;
  contributions: string;
  tech: string[];
  current: boolean;
  logo: string;
}

export interface Contribution {
  id: number;
  title: string;
  repo: string;
  type: string;
  status: string;
  prNumber: string;
  description: string;
  additions: string;
  deletions: string;
  files: number;
}

export interface GitHubStats {
  currentStreak: number;
  totalContributions: number;
  publicRepos: number;
  totalStars: number;
  languagesContributed: string[];
  thisYear: {
    commits: number;
    prs: number;
    issues: number;
    reviews: number;
  };
}
