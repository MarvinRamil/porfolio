import { supabase, Profile, Project, Experience, Skill } from './supabase';

export type { Profile, Project, Experience, Skill };

export async function getProfile(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

export async function getProjects(): Promise<Project[]> {
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true });

  if (projectsError) {
    console.error('Error fetching projects:', projectsError);
    return [];
  }

  const { data: tags, error: tagsError } = await supabase
    .from('project_tags')
    .select('*');

  if (tagsError) {
    console.error('Error fetching project tags:', tagsError);
    return projects.map(p => ({ ...p, tags: [] }));
  }

  const projectsWithTags = projects.map(project => ({
    ...project,
    tags: tags
      .filter(tag => tag.project_id === project.id)
      .map(tag => tag.tag),
  }));

  return projectsWithTags;
}

export async function getExperience(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('experience')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching experience:', error);
    return [];
  }

  return data;
}

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  return data;
}
