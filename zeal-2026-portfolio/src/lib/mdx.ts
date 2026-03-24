import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/projects');
const multimediaDirectory = path.join(process.cwd(), 'content/multimedia');

export interface ProjectMetadata {
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  tags: string[];
  slug: string;
  heroImage: string;
  heroVideo?: string;
  company?: string;
  role?: string;
  duration?: string;
  tools?: string;
  team?: string;
}

export function getProjectSlugs() {
  return fs.readdirSync(contentDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getProjectBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Extract H1 headings for TOC
  const headingRegex = /^#\s+(.+)$/gm;
  const headings: { id: string; title: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1];
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    headings.push({ id, title });
  }

  return {
    metadata: { ...data, slug: realSlug } as ProjectMetadata,
    content,
    headings,
  };
}

export function getAllProjects() {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug).metadata)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  return projects;
}

export function getMultimediaSlugs() {
  if (!fs.existsSync(multimediaDirectory)) return [];
  return fs.readdirSync(multimediaDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getMultimediaBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(multimediaDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const headingRegex = /^#\s+(.+)$/gm;
  const headings: { id: string; title: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1];
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    headings.push({ id, title });
  }

  return {
    metadata: { ...data, slug: realSlug } as ProjectMetadata,
    content,
    headings,
  };
}

export function getAllMultimedia() {
  const slugs = getMultimediaSlugs();
  const results = slugs
    .map((slug) => getMultimediaBySlug(slug).metadata)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  return results;
}
