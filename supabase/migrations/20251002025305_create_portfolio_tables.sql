/*
  # Create Portfolio Tables

  1. New Tables
    - `profile`
      - `id` (uuid, primary key)
      - `name` (text) - Portfolio owner's name
      - `title` (text) - Professional title
      - `bio` (text) - Brief description
      - `email` (text) - Contact email
      - `github_url` (text) - GitHub profile URL
      - `linkedin_url` (text) - LinkedIn profile URL
      - `available_for_work` (boolean) - Availability status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text) - Project name
      - `description` (text) - Project description
      - `link` (text) - Project URL
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `project_tags`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `tag` (text) - Technology tag
      - `created_at` (timestamptz)
    
    - `experience`
      - `id` (uuid, primary key)
      - `role` (text) - Job title
      - `company` (text) - Company name
      - `period` (text) - Time period
      - `description` (text) - Job description
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `skills`
      - `id` (uuid, primary key)
      - `name` (text) - Skill name
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (portfolio is public)
    - No write policies (content managed separately)
*/

CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Your Name',
  title text NOT NULL DEFAULT 'Full Stack Developer',
  bio text NOT NULL DEFAULT 'Crafting beautiful, scalable web applications with modern technologies and best practices.',
  email text NOT NULL DEFAULT 'hello@example.com',
  github_url text DEFAULT 'https://github.com',
  linkedin_url text DEFAULT 'https://linkedin.com',
  available_for_work boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  link text DEFAULT '#',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tag text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  company text NOT NULL,
  period text NOT NULL,
  description text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profile"
  ON profile FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view project tags"
  ON project_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view experience"
  ON experience FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  TO public
  USING (true);

INSERT INTO profile (name, title, bio, email, github_url, linkedin_url, available_for_work)
VALUES (
  'Your Name',
  'Full Stack Developer',
  'Crafting beautiful, scalable web applications with modern technologies and best practices.',
  'hello@example.com',
  'https://github.com',
  'https://linkedin.com',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO projects (title, description, link, order_index) VALUES
  ('E-Commerce Platform', 'A full-stack e-commerce solution with cart, payments, and inventory management.', '#', 1),
  ('Task Management App', 'Real-time collaborative task manager with drag-and-drop and team features.', '#', 2),
  ('Analytics Dashboard', 'Data visualization platform with interactive charts and real-time updates.', '#', 3),
  ('Social Media Clone', 'Feature-rich social platform with posts, comments, likes, and user profiles.', '#', 4)
ON CONFLICT DO NOTHING;

INSERT INTO project_tags (project_id, tag) 
SELECT p.id, t.tag FROM projects p
CROSS JOIN (
  SELECT unnest(ARRAY['Next.js', 'TypeScript', 'Supabase', 'Stripe']) AS tag
) t
WHERE p.title = 'E-Commerce Platform'
ON CONFLICT DO NOTHING;

INSERT INTO project_tags (project_id, tag) 
SELECT p.id, t.tag FROM projects p
CROSS JOIN (
  SELECT unnest(ARRAY['React', 'Node.js', 'PostgreSQL', 'WebSocket']) AS tag
) t
WHERE p.title = 'Task Management App'
ON CONFLICT DO NOTHING;

INSERT INTO project_tags (project_id, tag) 
SELECT p.id, t.tag FROM projects p
CROSS JOIN (
  SELECT unnest(ARRAY['Next.js', 'D3.js', 'TailwindCSS', 'API']) AS tag
) t
WHERE p.title = 'Analytics Dashboard'
ON CONFLICT DO NOTHING;

INSERT INTO project_tags (project_id, tag) 
SELECT p.id, t.tag FROM projects p
CROSS JOIN (
  SELECT unnest(ARRAY['React', 'Firebase', 'Redux', 'Material-UI']) AS tag
) t
WHERE p.title = 'Social Media Clone'
ON CONFLICT DO NOTHING;

INSERT INTO experience (role, company, period, description, order_index) VALUES
  ('Senior Full Stack Developer', 'Tech Company Inc.', '2022 - Present', 'Leading development of scalable web applications and mentoring junior developers.', 1),
  ('Full Stack Developer', 'StartUp Co.', '2020 - 2022', 'Built and maintained multiple client-facing applications using modern tech stack.', 2),
  ('Frontend Developer', 'Digital Agency', '2018 - 2020', 'Developed responsive websites and web applications for various clients.', 3)
ON CONFLICT DO NOTHING;

INSERT INTO skills (name, order_index) VALUES
  ('JavaScript', 1), ('TypeScript', 2), ('React', 3), ('Next.js', 4), ('Node.js', 5),
  ('PostgreSQL', 6), ('Supabase', 7), ('TailwindCSS', 8), ('Git', 9), ('Docker', 10),
  ('REST APIs', 11), ('GraphQL', 12), ('AWS', 13), ('CI/CD', 14), ('Testing', 15)
ON CONFLICT DO NOTHING;