
export interface Publication {
  id: string;
  title: string;
  authors: Author[];
  year: number;
  type: string;
  source: string;
  identifier: {
    type: string;
    value: string;
  };
  project: string;
  abstract: string;
  links: Link[];
}

export interface Author {
  name: string;
  orcidId: string;
}

export interface Link {
  name: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startYear: number;
  endYear: string | number;
  fundingAgency: string;
  role: string;
  publications: string[]; // IDs of associated publications
}

export interface Researcher {
  name: string;
  orcidId: string;
  institution: string;
  department: string;
  role: string;
  email: string;
  bio: string;
  education: string[];
  researchInterests: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    googleScholar?: string;
    github?: string;
  };
  institutionalPage: string;
  externalLinks: {
    name: string;
    url: string;
  }[];
  publications: Publication[];
  projects: Project[];
}
