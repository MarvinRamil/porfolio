'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, ExternalLink, Code as Code2, Briefcase, GraduationCap, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProfile, getProjects, getExperience, getSkills, Profile, Project, Experience, Skill } from '@/lib/portfolio-api';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, projectsData, experienceData, skillsData] = await Promise.all([
          getProfile(),
          getProjects(),
          getExperience(),
          getSkills(),
        ]);

        setProfile(profileData);
        setProjects(projectsData);
        setExperience(experienceData);
        setSkills(skillsData);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 border-t-slate-900 dark:border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Portfolio
          </div>
          <div className="flex gap-4">
            {profile?.github_url && (
              <Button variant="ghost" size="icon" asChild>
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            )}
            {profile?.linkedin_url && (
              <Button variant="ghost" size="icon" asChild>
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            )}
            {profile?.email && (
              <Button variant="ghost" size="icon" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </nav>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          {profile?.available_for_work && (
            <div className="mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              <Badge variant="secondary" className="mb-4">
                Available for Work
              </Badge>
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            {profile?.title || 'Full Stack Developer'}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            {profile?.bio || 'Crafting beautiful, scalable web applications with modern technologies and best practices.'}
          </p>
          <div className="flex gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <Button size="lg" className="group" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects
              <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-6 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-12">
            <Code2 className="h-8 w-8 text-slate-700 dark:text-slate-300" />
            <h2 className="text-4xl font-bold">Featured Projects</h2>
          </div>
          {projects.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400 text-center">No projects yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-semibold group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                        {project.title}
                      </h3>
                      {project.link && project.link !== '#' && (
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="h-8 w-8 text-slate-700 dark:text-slate-300" />
            <h2 className="text-4xl font-bold">Experience</h2>
          </div>
          {experience.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400 text-center">No experience yet.</p>
          ) : (
            <div className="space-y-6">
              {experience.map((job) => (
                <Card key={job.id} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-2xl font-semibold">{job.role}</h3>
                      <Badge variant="outline">{job.period}</Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">
                      {job.company}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {job.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="h-8 w-8 text-slate-700 dark:text-slate-300" />
            <h2 className="text-4xl font-bold">Skills</h2>
          </div>
          {skills.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-400 text-center">No skills yet.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="text-base px-4 py-2 hover:scale-105 transition-transform cursor-default"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {profile?.email && (
              <Button size="lg" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Send Email
                </a>
              </Button>
            )}
            {profile?.github_url && (
              <Button size="lg" variant="outline" asChild>
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  View GitHub
                </a>
              </Button>
            )}
            {profile?.linkedin_url && (
              <Button size="lg" variant="outline" asChild>
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5" />
                  Connect on LinkedIn
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-6xl text-center text-slate-600 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
