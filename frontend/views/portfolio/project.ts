export interface Project {
  img: string;
  title: string;
  date: string;
  goal: string;
  githubUrl?: string;
  projectType?: string;
  description?: string;
  tags: string[];
  images?: string[];
  url?: string;
  // this is the url portfolio fragment required.
  fragment: string;
}
