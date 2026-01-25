import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { User } from "@/types/user";

export const DATA: User = {
  name: "Rafael Dantas",
  initials: "RD",
  url: "https://danzokka.com",
  location: "Brasília, DF, Brazil",
  locationUrl: "https://www.google.com/maps/place/brasília",
  description:
    "Software Engineer turned Entrepreneur. I love building things and helping people. Very active on Twitter.",
  summary:
    "At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons). I also had the pleasure of being a part of the first ever in-person cohort of buildspace called [buildspace sf1](https://buildspace.so/sf1).",
  avatar: "/avatar.png",
  contact: {
    email: "rafaeldantasboeira@gmail.com",
    phone: "+55 61 99370-9543",
    address: "Brasília, DF, Brazil",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/Danzokka",
        icon: <Icons.github />,
        navbar: true,
      },
    ],
  },
  skills: [
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
    {
      name: "TypeScript",
      icon: <Typescript className="w-6 h-6" />,
    },
  ],
  work: [
    {
      company: "Edukativa",
      href: "https://edukativa.com",
      position: "Software Engineer",
      location: "Remote",
      logo: "/work/edukativa.png",
      startDate: "2023-03-01",
      endDate: "2024-05-01",
      responsibilities: [
        "Led the development of the company's main SaaS product, an online course platform, using Next.js, Node.js, and PostgreSQL.",
        "Implemented new features and optimized existing ones, resulting in a 30% increase in user engagement.",
        "Collaborated with cross-functional teams to define, design, and ship new features.",
      ],
      description:
        "Edukativa is an online learning platform that offers courses on various topics, including programming, design, and marketing. As a Software Engineer, I was responsible for developing and maintaining the platform's core features.",
      technologies: [
        {
          name: "Next.js",
          icon: <NextjsIconDark className="w-6 h-6" />,
        },
      ],
    },
    {
      company: "Edukativa",
      href: "https://edukativa.com",
      position: "Software Engineer",
      location: "Remote",
      logo: "/work/edukativa.png",
      startDate: "2023-03-01",
      endDate: "2024-05-01",
      responsibilities: [
        "Led the development of the company's main SaaS product, an online course platform, using Next.js, Node.js, and PostgreSQL.",
        "Implemented new features and optimized existing ones, resulting in a 30% increase in user engagement.",
        "Collaborated with cross-functional teams to define, design, and ship new features.",
      ],
      description:
        "Edukativa is an online learning platform that offers courses on various topics, including programming, design, and marketing. As a Software Engineer, I was responsible for developing and maintaining the platform's core features.",
      technologies: [
        {
          name: "Next.js",
          icon: <NextjsIconDark className="w-6 h-6" />,
        },
      ],
    },
  ],
  education: [
    {
      institution: "IESB",
      degree: "BSc in Computer Science and Business Administration",
      href: "https://iesb.br",
      logo: "/education/iesb.png",
      startDate: "2019-01-01",
      endDate: "2023-12-01",
    },
  ],
  projects: [
    {
      title: "Painel",
      href: "https://painel.danzokka.com",
      dates: "2023",
      active: true,
      description:
        "Painel is a SaaS platform that allows creators to build and customize their own dashboards to manage their online presence and content.",
      technologies: [
        {
          name: "React",
          icon: <ReactLight className="w-6 h-6" />,
        },
      ],
      image: "/projects/painel.png",
      links: [
        {
          icon: <HomeIcon className="w-5 h-5" />,
          type: "Website",
          href: "https://painel.danzokka.com",
        },
      ],
    },
  ],
};
