import { JSX } from "react";

export type Skill = {
  name: string;
  icon: JSX.Element | SVGSVGElement;
  category: 'frontend' | 'backend' | 'devops';
};

type SocialContact = {
  name: string;
  url: string;
  icon: JSX.Element;
  navbar: boolean;
};

type Contact = {
  email: string;
  phone: string;
  address: string;
  social: SocialContact[];
};

type Work = {
  company: string;
  position: string;
  href: string;
  location: string;
  logo: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  description: string;
  technologies: Skill[];
};

type Education = {
  institution: string;
  degree: string;
  href: string;
  logo: string;
  startDate: string;
  endDate: string;
};

export type Project = {
  title: string;
  slug: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: Skill[];
  category: 'frontend' | 'backend' | 'infra';
  image?: string;
  video?: string;
  links?: {
    icon: JSX.Element;
    type: string;
    href: string;
  }[];
};

export type Service = {
  title: string;
  description: string;
  icon: JSX.Element;
}

export type Review = {
  avatar: string;
  name: string;
  position: string;
  rating: number;
  reviewText: string;
}

export type Metric = {
  value: number;
  suffix: string;
  label: string;
  isInfinity?: boolean;
}

type Navbar = {
  home: string;
  projects: string;
  about?: string;
  skills: string;
  services: string;
  contact: string;
}

type Hero = {
  title: string;
  description: string;
  aboutMe: string;
  seeProjects: string;
  tagline: string;
  roles: string[];
  contact: string;
}

type SectionTitles = {
  projects: string;
  projectsSubtitle: string;
  projectsDescription: string;
  about?: string;
  aboutSubtitle?: string;
  aboutDescription?: string;
  services: string;
  servicesSubtitle: string;
  servicesDescription: string;
  reviews: string;
  reviewsSubtitle: string;
  reviewsDescription: string;
  footerSubtitle: string;
  getStarted: string;
  available: string;
  skills: string;
  skillsFrontend: string;
  skillsBackend: string;
  skillsDevops: string;
  projectsAll: string;
  projectsFrontend: string;
  projectsBackend: string;
  projectsInfra: string;
}

type User = {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationUrl: string;
  description: string;
  summary: string;
  avatar: string;
  contact: Contact;
  skills: Skill[];
  work: Work[];
  education: Education[];
  projects: Project[];
  services: Service[];
  reviews: Review[];
  metrics: Metric[];
  navbar: Navbar;
  hero: Hero;
  sectionTitles: SectionTitles;
};
