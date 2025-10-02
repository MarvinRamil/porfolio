export type Profile = {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  available_for_work: boolean;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  link: string;
  order_index: number;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type Skill = {
  id: string;
  name: string;
  order_index: number;
  created_at: string;
};

// Static data - replace with your actual portfolio data
const staticProfile: Profile = {
  id: '1',
  name: 'Your Name',
  title: 'Full Stack Developer',
  bio: 'Crafting beautiful, scalable web applications with modern technologies and best practices.',
  email: 'your.email@example.com',
  github_url: 'https://github.com/yourusername',
  linkedin_url: 'https://linkedin.com/in/yourusername',
  available_for_work: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const staticProjects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.',
    link: 'https://github.com/yourusername/portfolio',
    order_index: 1,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, payment processing, and admin dashboard.',
    link: 'https://github.com/yourusername/ecommerce',
    order_index: 2,
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const staticExperience: Experience[] = [
  {
    id: '1',
    role: 'Senior Full Stack Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Led development of scalable web applications using React, Node.js, and cloud technologies.',
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    role: 'Frontend Developer',
    company: 'Startup Inc',
    period: '2020 - 2022',
    description: 'Developed responsive user interfaces and collaborated with design teams to create engaging user experiences.',
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const staticSkills: Skill[] = [
  { id: '1', name: 'JavaScript', order_index: 1, created_at: new Date().toISOString() },
  { id: '2', name: 'TypeScript', order_index: 2, created_at: new Date().toISOString() },
  { id: '3', name: 'React', order_index: 3, created_at: new Date().toISOString() },
  { id: '4', name: 'Next.js', order_index: 4, created_at: new Date().toISOString() },
  { id: '5', name: 'Node.js', order_index: 5, created_at: new Date().toISOString() },
  { id: '6', name: 'Python', order_index: 6, created_at: new Date().toISOString() },
  { id: '7', name: 'PostgreSQL', order_index: 7, created_at: new Date().toISOString() },
  { id: '8', name: 'AWS', order_index: 8, created_at: new Date().toISOString() },
];

export async function getProfile(): Promise<Profile | null> {
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticProfile), 100);
  });
}

export async function getProjects(): Promise<Project[]> {
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticProjects), 100);
  });
}

export async function getExperience(): Promise<Experience[]> {
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticExperience), 100);
  });
}

export async function getSkills(): Promise<Skill[]> {
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticSkills), 100);
  });
}
