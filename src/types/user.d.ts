import { JSX } from "react";

type Skill = {
  name: string;
  icon: JSX.Element | SVGSVGElement;
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

type Project = {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: Skill[];
  image?: string;
  video?: string;
  links?: {
    icon: JSX.Element;
    type: string;
    href: string;
  }[];
};

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
};
