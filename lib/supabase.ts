import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
