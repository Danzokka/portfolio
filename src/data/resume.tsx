import { Icons } from "@/components/icons";
import {
  Globe,
  Headset,
  HomeIcon,
  Terminal,
  Briefcase,
  GraduationCap,
  Code,
  Code2,
} from "lucide-react";
import { Skill, User } from "@/types/user";
import StackIcon from "tech-stack-icons";
import { P } from "@/components/ui/typography";

const COMMON_DATA = {
  name: "Rafael Dantas",
  initials: "RD",
  url: "https://danzokka.com",
  location: "Brasília, DF, Brazil",
  locationUrl: "https://www.google.com/maps/place/brasília",
  avatar: "/avatar.png",
  contact: {
    email: "rafaeldantasboeira@gmail.com",
    phone: "+55 61 99370-9543",
    address: "Brasília, DF, Brazil",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/Danzokka",
        icon: <StackIcon name="github" className="size-4" />,
        navbar: true,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rafael-dantas-boeira/",
        icon: <Icons.linkedin className="size-4" />,
        navbar: true,
      },
    ],
  },
  skills: ([
    // Frontend — React first (featured)
    { name: "React",           icon: <StackIcon name="react"          className="size-4" />,               category: "frontend", description: "Hooks, context, Server Actions" },
    { name: "TypeScript",      icon: <StackIcon name="typescript"     className="size-4" />,               category: "frontend", description: "Strict mode, generics, utility types" },
    { name: "Next.js",         icon: <StackIcon name="nextjs2"        className="size-4" />,               category: "frontend", description: "App Router, SSR, middleware" },
    { name: "Tailwind CSS",    icon: <StackIcon name="tailwindcss"    className="size-4" />,               category: "frontend", description: "Utility-first, v4, design tokens" },
    { name: "JavaScript",      icon: <StackIcon name="js"             className="size-4" />,               category: "frontend", description: "ES2024, async/await, DOM APIs" },
    { name: "ShadcnUI",        icon: <StackIcon name="shadcnui"       className="size-4" variant="dark"/>, category: "frontend", description: "Components + custom theming" },
    { name: "Framer Motion",   icon: <StackIcon name="framer"         className="size-4" variant="dark"/>, category: "frontend", description: "Animations, gestures, transitions" },
    { name: "TanStack Query",  icon: <StackIcon name="reactquery"     className="size-4" />,               category: "frontend", description: "Server state, caching, sync" },
    { name: "Zod",             icon: <StackIcon name="zod"            className="size-4" />,               category: "frontend", description: "Schema validation, type inference" },
    // Backend — NestJS first (featured)
    { name: "NestJS",          icon: <StackIcon name="nestjs"         className="size-4" />,               category: "backend",  description: "Modules, guards, microservices" },
    { name: "Node.js",         icon: <StackIcon name="nodejs"         className="size-4" />,               category: "backend",  description: "REST APIs, async streams" },
    { name: "PostgreSQL",      icon: <StackIcon name="postgresql"     className="size-4" />,               category: "backend",  description: "Queries, migrations, indexing" },
    { name: "Prisma",          icon: <StackIcon name="prisma"         className="size-4" variant="dark"/>, category: "backend",  description: "Schema, migrations, ORM" },
    { name: "MongoDB",         icon: <StackIcon name="mongodb"        className="size-4" />,               category: "backend",  description: "Aggregation, Atlas, mongoose" },
    { name: "Redis",           icon: <StackIcon name="redis"          className="size-4" />,               category: "backend",  description: "Cache, pub/sub, queues" },
    { name: "Swagger",         icon: <StackIcon name="swagger"        className="size-4" />,               category: "backend",  description: "OpenAPI docs, NestJS Swagger" },
    { name: "Python",          icon: <StackIcon name="python"         className="size-4" />,               category: "backend",  description: "Scripts, data processing" },
    { name: "PHP",             icon: <StackIcon name="php"            className="size-4" />,               category: "backend",  description: "Moodle plugins, legacy APIs" },
    // DevOps — Docker first (featured)
    { name: "Docker",          icon: <StackIcon name="docker"         className="size-4" />,               category: "devops",  description: "Compose, multi-stage builds" },
    { name: "Linux",           icon: <StackIcon name="linux"          className="size-4" />,               category: "devops",  description: "Admin, scripts, systemd" },
    { name: "AWS",             icon: <StackIcon name="aws"            className="size-4" variant="dark"/>, category: "devops",  description: "EC2, S3, IAM, networking" },
    { name: "Shell",           icon: <StackIcon name="bash"           className="size-4" variant="dark"/>, category: "devops",  description: "Bash automation scripts" },
    { name: "Git",             icon: <StackIcon name="git"            className="size-4" />,               category: "devops",  description: "Branching, rebasing, hooks" },
    { name: "GitHub",          icon: <StackIcon name="github"         className="size-4" variant="dark"/>, category: "devops",  description: "Actions CI, packages, API" },
    { name: "GitHub Actions",  icon: <StackIcon name="githubactions"  className="size-4" variant="dark"/>, category: "devops",  description: "CI/CD pipelines" },
    { name: "Jenkins",         icon: <StackIcon name="jenkins"        className="size-4" variant="dark"/>, category: "devops",  description: "Pipeline as code, webhooks" },
    { name: "N8N",             icon: <StackIcon name="n8n"            className="size-4" />,               category: "devops",  description: "Automation workflows" },
  ] as Skill[]),
};

export const DATA_EN: User = {
  ...COMMON_DATA,
  description:
    "Software Engineer turned Entrepreneur. I love building things and helping people. Very active on Twitter.",
  summary:
    "Full-stack developer specializing in Next.js and NestJS with a keen interest in DevOps and Linux. At the end of 2022, I quit my job as a software engineer to go fulltime into building and scaling my own SaaS businesses. In the past, [I pursued a double degree in computer science and business](/#education), [interned at big tech companies in Silicon Valley](https://www.youtube.com/watch?v=d-LJ2e5qKdE), and [competed in over 21 hackathons for fun](/#hackathons).",
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
        { name: "Next.js",    icon: <StackIcon name="nextjs2"     className="size-4" />,              category: "frontend" },
        { name: "Node.js",   icon: <StackIcon name="nodejs"      className="size-4" />,              category: "backend"  },
        { name: "NestJS",    icon: <StackIcon name="nestjs"      className="size-4" />,              category: "backend"  },
        { name: "PostgreSQL",icon: <StackIcon name="postgresql"  className="size-4" />,              category: "backend"  },
        { name: "Tailwind",  icon: <StackIcon name="tailwindcss" className="size-4" />,              category: "frontend" },
        { name: "Docker",    icon: <StackIcon name="docker"      className="size-4" />,              category: "devops"   },
        { name: "AWS",       icon: <StackIcon name="aws"         className="size-4" variant="dark"/>, category: "devops"   },
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
      title: "Coink",
      slug: "coink",
      href: "https://github.com/Danzokka/coink",
      image: "/projects/coink.png",
      dates: "2025–2026",
      active: true,
      featured: true,
      category: "frontend",
      description:
        "Personal finance management system with interactive dashboard, expense categorization, savings goals and automatic reports. Built full-stack with authentication, bank integration and real-time charts.",
      technologies: [
        { name: "Next.js",    icon: <StackIcon name="nextjs2"    className="size-4" />,              category: "frontend" },
        { name: "NestJS",    icon: <StackIcon name="nestjs"     className="size-4" />,              category: "backend"  },
        { name: "Tailwind",  icon: <StackIcon name="tailwindcss"className="size-4" />,              category: "frontend" },
        { name: "Prisma",    icon: <StackIcon name="prisma"     className="size-4" variant="dark"/>, category: "backend"  },
        { name: "PostgreSQL",icon: <StackIcon name="postgresql" className="size-4" />,              category: "backend"  },
        { name: "ShadcnUI",  icon: <StackIcon name="shadcnui"   className="size-4" variant="dark"/>, category: "frontend" },
      ],
      links: [],
    },
    {
      title: "TCC-Estufa",
      slug: "tcc-estufa",
      href: "https://github.com/Danzokka/tcc-estufa",
      image: "/projects/estufa.jpg",
      dates: "2024",
      active: true,
      category: "backend",
      description:
        "Capstone project on smart greenhouse automation and monitoring using AI and IoT sensors for real-time environmental control.",
      technologies: [
        { name: "Next.js",    icon: <StackIcon name="nextjs2"    className="size-4" />,              category: "frontend" },
        { name: "NestJS",    icon: <StackIcon name="nestjs"     className="size-4" />,              category: "backend"  },
        { name: "PostgreSQL",icon: <StackIcon name="postgresql" className="size-4" />,              category: "backend"  },
        { name: "Prisma",    icon: <StackIcon name="prisma"     className="size-4" variant="dark"/>, category: "backend"  },
        { name: "Python",    icon: <StackIcon name="python"     className="size-4" />,              category: "backend"  },
        { name: "Docker",    icon: <StackIcon name="docker"     className="size-4" />,              category: "devops"   },
      ],
      links: [
        {
          icon: <Icons.github className="w-5 h-5" />,
          type: "Source",
          href: "https://github.com/Danzokka/tcc-estufa",
        },
      ],
    },
    {
      title: "Acessa",
      slug: "acessa",
      href: "https://acessa.edukativa.com.br",
      image: "/projects/acessa.png",
      dates: "2025–2026",
      active: true,
      category: "frontend",
      description:
        "Accessibility platform for teaching students with special needs, featuring adaptive content, screen-reader support and teacher management tools.",
      technologies: [
        { name: "Next.js",    icon: <StackIcon name="nextjs2"    className="size-4" />,              category: "frontend" },
        { name: "Tailwind",  icon: <StackIcon name="tailwindcss"className="size-4" />,              category: "frontend" },
        { name: "ShadcnUI",  icon: <StackIcon name="shadcnui"   className="size-4" variant="dark"/>, category: "frontend" },
        { name: "NestJS",    icon: <StackIcon name="nestjs"     className="size-4" />,              category: "backend"  },
        { name: "PostgreSQL",icon: <StackIcon name="postgresql" className="size-4" />,              category: "backend"  },
        { name: "Prisma",    icon: <StackIcon name="prisma"     className="size-4" variant="dark"/>, category: "backend"  },
      ],
      links: [
        {
          icon: <HomeIcon className="size-4" />,
          type: "Website",
          href: "https://acessa.edukativa.com.br",
        },
      ],
    },
    {
      title: "Observability Stack",
      slug: "stack-de-observabilidade",
      href: "https://homepage.edukativa.com.br",
      image: "/projects/observability.png",
      dates: "2025–2026",
      active: true,
      featured: true,
      category: "infra",
      description:
        "Full observability stack with Jenkins, SonarQube, Keycloak, Grafana and automatic Slack alerts. Entire infrastructure containerised on AWS with centralised logging and integrated CI/CD.",
      technologies: [
        { name: "AWS",     icon: <StackIcon name="aws"     className="size-4" variant="dark"/>, category: "devops" },
        { name: "Docker",  icon: <StackIcon name="docker"  className="size-4" />,              category: "devops" },
        { name: "Jenkins", icon: <StackIcon name="jenkins" className="size-4" />,              category: "devops" },
        { name: "Grafana", icon: <StackIcon name="grafana" className="size-4" variant="dark"/>, category: "devops" },
      ],
      links: [
        {
          icon: <HomeIcon className="size-4" />,
          type: "Website",
          href: "https://homepage.edukativa.com.br",
        },
      ],
    },
    {
      title: "Academic Management System",
      slug: "sistema-gestao-academica",
      href: "https://app.cognusplay.com.br",
      image: "/projects/painel.png",
      dates: "2023–2026",
      active: true,
      featured: true,
      category: "backend",
      description:
        "Academic management system integrated with Moodle, with an isolated student layer and a metrics dashboard for managers. Handles courses, enrolments, grades and real-time reports with Keycloak auth.",
      technologies: [
        { name: "Next.js",  icon: <StackIcon name="nextjs2"  className="size-4" />, category: "frontend" },
        { name: "NestJS",  icon: <StackIcon name="nestjs"   className="size-4" />, category: "backend"  },
        { name: "MongoDB", icon: <StackIcon name="mongodb"  className="size-4" />, category: "backend"  },
        { name: "Moodle",  icon: <StackIcon name="moodle"   className="size-4" />, category: "backend"  },
        { name: "Docker",  icon: <StackIcon name="docker"   className="size-4" />, category: "devops"   },
      ],
      links: [
        {
          icon: <HomeIcon className="size-4" />,
          type: "Website",
          href: "https://app.cognusplay.com.br",
        },
      ],
    },
    {
      title: "Infraero Simulator",
      slug: "infraero-simulator",
      href: "https://simulador.edukativa.com.br",
      image: "/projects/simulador.png",
      dates: "2025",
      active: true,
      category: "infra",
      description:
        "Simulator for Infraero staff training in emergency operational procedures.",
      technologies: [
        { name: "TypeScript", icon: <StackIcon name="typescript" className="size-4" />, category: "frontend" },
        { name: "Next.js",   icon: <StackIcon name="nextjs2"    className="size-4" />, category: "frontend" },
      ],
      links: [
        {
          icon: <HomeIcon className="size-4" />,
          type: "Website",
          href: "https://simulador.edukativa.com.br",
        },
      ],
    },
    {
      title: "Telegram Bot",
      slug: "telegram-bot",
      href: "https://github.com/Danzokka/telegram-bot",
      dates: "2024",
      active: true,
      category: "backend",
      description:
        "Automated Telegram bot built with NestJS and Telegraf, featuring scheduled messages, command handling and event-driven notifications.",
      technologies: [
        { name: "NestJS",  icon: <StackIcon name="nestjs"  className="size-4" />, category: "backend" },
        { name: "Node.js", icon: <StackIcon name="nodejs"  className="size-4" />, category: "backend" },
      ],
      links: [
        {
          icon: <Icons.github className="w-5 h-5" />,
          type: "Source",
          href: "https://github.com/Danzokka/telegram-bot",
        },
      ],
    },
    {
      title: "Gestrix",
      slug: "gestrix",
      href: "https://plataformagestrix.com.br",
      image: "/projects/gestrix.png",
      dates: "2025–2026",
      active: true,
      featured: true,
      category: "backend",
      description:
        "Multi-tenant SaaS platform for vehicle fleet rental management. Turborepo monorepo with NestJS API and Next.js 15 frontend, featuring real-time dashboards, contract management and role-based access control.",
      technologies: [
        { name: "Next.js",    icon: <StackIcon name="nextjs2"     className="size-4" />,              category: "frontend" },
        { name: "NestJS",    icon: <StackIcon name="nestjs"      className="size-4" />,              category: "backend"  },
        { name: "PostgreSQL",icon: <StackIcon name="postgresql"  className="size-4" />,              category: "backend"  },
        { name: "Prisma",    icon: <StackIcon name="prisma"      className="size-4" variant="dark"/>, category: "backend"  },
        { name: "Redis",     icon: <StackIcon name="redis"       className="size-4" />,              category: "backend"  },
        { name: "ShadcnUI",  icon: <StackIcon name="shadcnui"    className="size-4" variant="dark"/>, category: "frontend" },
      ],
      links: [
        {
          icon: <HomeIcon className="size-4" />,
          type: "Website",
          href: "https://plataformagestrix.com.br",
        },
      ],
    },
    {
      title: "Reuel",
      slug: "reuel",
      href: "https://reuel.app.br",
      image: "/projects/reuel.png",
      dates: "2025–2026",
      active: true,
      featured: true,
      category: "frontend",
      description:
        "Carpooling platform with a consolidated web app integrating Admin, Partner, and Public panels. Next.js 16 frontend with Fastify API, real-time features via Socket.io, and AWS S3 for media storage.",
      technologies: [
        { name: "Next.js",    icon: <StackIcon name="nextjs2"     className="size-4" />,              category: "frontend" },
        { name: "ShadcnUI",   icon: <StackIcon name="shadcnui"    className="size-4" variant="dark"/>, category: "frontend" },
        { name: "PostgreSQL", icon: <StackIcon name="postgresql"  className="size-4" />,              category: "backend"  },
        { name: "Prisma",     icon: <StackIcon name="prisma"      className="size-4" variant="dark"/>, category: "backend"  },
        { name: "Redis",      icon: <StackIcon name="redis"       className="size-4" />,              category: "backend"  },
        { name: "AWS",        icon: <StackIcon name="aws"         className="size-4" variant="dark"/>, category: "devops"   },
      ],
      links: [
        {
          icon: <HomeIcon className="size-4" />,
          type: "Website",
          href: "https://reuel.app.br",
        },
      ],
    },
    {
      title: "Appointment Scheduler",
      slug: "marcador-de-consultas",
      href: "https://github.com/Danzokka/marcador-de-consultas",
      dates: "2024",
      active: true,
      category: "frontend",
      description:
        "Full-stack appointment scheduling system with calendar views, user auth and email notifications.",
      technologies: [
        { name: "Next.js",    icon: <StackIcon name="nextjs2"    className="size-4" />,              category: "frontend" },
        { name: "NestJS",    icon: <StackIcon name="nestjs"     className="size-4" />,              category: "backend"  },
        { name: "PostgreSQL",icon: <StackIcon name="postgresql" className="size-4" />,              category: "backend"  },
        { name: "Prisma",    icon: <StackIcon name="prisma"     className="size-4" variant="dark"/>, category: "backend"  },
      ],
      links: [
        {
          icon: <Icons.github className="w-5 h-5" />,
          type: "Source",
          href: "https://github.com/Danzokka/marcador-de-consultas",
        },
      ],
    },
  ],
  services: [
    {
      title: "Web Development",
      description:
        "Creation of custom websites and web applications to meet your business needs.",
      icon: <Globe className="size-4" />,
    },
    {
      title: "Consulting",
      description:
        "Technical consulting to help you make the best decisions for your project.",
      icon: <Headset className="size-4" />,
    },
    {
      title: "Technical Support",
      description:
        "Technical support services to ensure your systems are always running smoothly.",
      icon: <Terminal className="size-4" />,
    },
  ],
  reviews: [
    {
      avatar: "/placeholder.png",
      name: "Client Name",
      position: "CEO of Business X",
      rating: 5,
      reviewText:
        "This is a sample review. The service provided was exceptional and exceeded my expectations.",
    },
  ],
  metrics: [
    { value: 5,   suffix: "+",  label: "Years of Experience" },
    { value: 20,  suffix: "+",  label: "Projects Completed"  },
    { value: 0,   suffix: "",   label: "Coffee Cups",   isInfinity: true },
  ],
  navbar: {
    home: "Home",
    projects: "Projects",
    skills: "Skills",
    services: "Services",
    contact: "Contact",
  },
  hero: {
    title: "Rafael Dantas",
    description:
      "Fullstack Engineer with DevOps expertise. I build scalable systems end-to-end — from pixel-perfect UIs to production infrastructure.",
    tagline: "connecting systems",
    roles: ["Fullstack Engineer", "DevOps Engineer", "Infrastructure"],
    aboutMe: "About Me",
    seeProjects: "See Projects",
    contact: "Contact Me",
  },
  sectionTitles: {
    projects: "Projects",
    projectsSubtitle: "What I've shipped",
    projectsDescription:
      "From SaaS platforms to observability stacks — a selection of production systems I've designed and deployed.",
    services: "Services",
    servicesSubtitle: "What I offer",
    servicesDescription:
      "I offer end-to-end development and infrastructure services to help your product scale.",
    reviews: "Reviews",
    reviewsSubtitle: "Client Feedback",
    reviewsDescription:
      "Real feedback from clients who trusted me to deliver.",
    getStarted: "Get Started",
    available: "Available for work",
    skills: "Skills",
    skillsFrontend: "Frontend",
    skillsBackend: "Backend",
    skillsDevops: "DevOps & Infra",
    projectsAll: "All",
    projectsFrontend: "Frontend",
    projectsBackend: "Backend",
    projectsInfra: "Infra",
    technologies: "Technologies",
    footerHeadline: "Ready to connect systems.",
    footerPitch: "From pixel-perfect UIs to production infrastructure — I build end-to-end and ship fast.",
    footerResume: "Open Resume",
    contact: "Contact",
    contactDescription: "Want to work together or just say hello? Reach out via email or social — I'm always open to a conversation.",
    contactEmail: "Send an email",
  },
  skillDescriptions: {
    frontend: "Building responsive, accessible interfaces with React and Next.js. Strong focus on design systems, component architecture, and smooth animations with Tailwind CSS and Framer Motion.",
    backend: "Designing RESTful and event-driven APIs with NestJS and Node.js. Experienced with PostgreSQL, MongoDB, Prisma ORM, and Moodle LMS integrations.",
    devops: "Automating deployments and managing cloud infrastructure on AWS with Docker, Jenkins, and GitHub Actions. Full observability with Grafana, Keycloak, and SonarQube.",
  },
};

export const DATA_PT: User = {
  ...COMMON_DATA,
  description:
    "Engenheiro de Software que virou Empreendedor. Adoro construir coisas e ajudar pessoas. Muito ativo no Twitter.",
  summary:
    "Desenvolvedor Full-stack especializado em Next.js e NestJS com grande interesse em DevOps e Linux. No final de 2022, deixei meu emprego como engenheiro de software para me dedicar em tempo integral à construção e escala dos meus próprios negócios SaaS. No passado, [cursei ciência da computação e administração](/#education), [estagiei em grandes empresas de tecnologia no Vale do Silício](https://www.youtube.com/watch?v=d-LJ2e5qKdE) e [participei de mais de 21 hackathons por diversão](/#hackathons).",
  work: [
    {
      company: "Edukativa",
      href: "https://edukativa.com",
      position: "Engenheiro de Software",
      location: "Remoto",
      logo: "/work/edukativa.png",
      startDate: "2023-03-01",
      endDate: "2024-05-01",
      responsibilities: [
        "Liderei o desenvolvimento do principal produto SaaS da empresa, uma plataforma de cursos online, usando Next.js, NestJS e PostgreSQL.",
        "Implementei novos recursos e otimizei os existentes, resultando em um aumento de 30% no engajamento dos usuários.",
      ],
      description:
        "A Edukativa é uma plataforma de aprendizado online que oferece cursos sobre diversos temas, incluindo programação, design e marketing. Como Engenheiro de Software, fui responsável pelo desenvolvimento e manutenção dos principais recursos da plataforma.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
          category: "frontend",
        },
        {
          name: "Node.js",
          icon: <StackIcon name="nodejs" className="size-4" />,
          category: "backend",
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
          category: "backend",
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
          category: "backend",
        },
        {
          name: "Tailwind",
          icon: <StackIcon name="tailwindcss" className="size-4" />,
          category: "frontend",
        },
        {
          name: "Docker",
          icon: <StackIcon name="docker" className="size-4" />,
          category: "devops",
        },
        {
          name: "AWS",
          icon: <StackIcon name="aws" className="size-4" variant="dark" />,
          category: "devops",
        },
      ],
    },
    {
      company: "Edukativa",
      href: "#",
      position: "Estagiário de Desenvolvimento de Software",
      location: "Remoto",
      logo: "/work/placeholder.png",
      startDate: "2023-05-01",
      endDate: "2024-01-15",
      responsibilities: [
        "Trabalhou em aplicações web escaláveis.",
        "Colaborou com desenvolvimento de plugins para o Moodle.",
        "Desenvolveu automações de processos com o N8N.",
      ],
      description:
        "A Edukativa é uma plataforma de aprendizado online que oferece cursos sobre diversos temas, incluindo programação, design e marketing. Como Engenheiro de Software, fui responsável pelo desenvolvimento e manutenção dos principais recursos da plataforma.",
      technologies: [
        {
          name: "N8N",
          icon: <StackIcon name="n8n" className="size-4" />,
          category: "devops",
        },
        {
          name: "Moodle",
          icon: <StackIcon name="moodle" className="size-4" />,
          category: "backend",
        },
        {
          name: "PHP",
          icon: <StackIcon name="php" className="size-4" />,
          category: "backend",
        },
        {
          name: "JavaScript",
          icon: <StackIcon name="js" className="size-4" />,
          category: "frontend",
        },
        {
          name: "MySQL",
          icon: <StackIcon name="mysql" className="size-4" />,
          category: "backend",
        },
        {
          name: "AWS",
          icon: <StackIcon name="aws" className="size-4" variant="dark" />,
          category: "devops",
        },
      ],
    },
  ],
  education: [
    {
      institution: "IESB",
      degree: "Bacharelado em Ciência da Computação e Administração",
      href: "https://iesb.br",
      logo: "/education/iesb.png",
      startDate: "2019-01-01",
      endDate: "2023-12-01",
    },
  ],
  projects: [
    {
      title: "Coink",
      slug: "coink",
      href: "https://github.com/Danzokka/coink",
      image: "/projects/coink.png",
      dates: "2025–2026",
      active: true,
      featured: true,
      category: "frontend",
      description:
        "Coink é um sistema de gerenciamento financeiro pessoal desenvolvido com Next.js, NestJS, Prisma, Tailwind CSS e ShadcnUI.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
          category: "frontend",
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
          category: "backend",
        },
        {
          name: "Tailwind",
          icon: <StackIcon name="tailwindcss" className="size-4" />,
          category: "frontend",
        },
        {
          name: "Prisma",
          icon: <StackIcon name="prisma" className="size-4" variant="dark" />,
          category: "backend",
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
          category: "backend",
        },
        {
          name: "ShadcnUI",
          icon: <StackIcon name="shadcnui" className="size-4" variant="dark" />,
          category: "frontend",
        },
      ],
      links: [],
    },
    {
      title: "TCC-Estufa",
      slug: "tcc-estufa",
      href: "https://github.com/Danzokka/tcc-estufa",
      image: "/projects/estufa.jpg",
      dates: "2024",
      active: true,
      category: "backend",
      description:
        "Projeto de TCC sobre automação e monitoramento de estufas utilizando IA e tecnologias modernas.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
          category: "frontend",
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
          category: "backend",
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
          category: "backend",
        },
        {
          name: "Prisma",
          icon: <StackIcon name="prisma" className="size-4" variant="dark" />,
          category: "backend",
        },
        {
          name: "Python",
          icon: <StackIcon name="python" className="size-4" />,
          category: "backend",
        },
        {
          name: "Docker",
          icon: <StackIcon name="docker" className="size-4" />,
          category: "devops",
        },
      ],
      links: [
        {
          icon: <StackIcon name="github" className="size-4" variant="dark" />,
          type: "Código",
          href: "https://github.com/Danzokka/tcc-estufa",
        },
      ],
    },
    {
      title: "Acessa",
      slug: "acessa",
      href: "https://acessa.edukativa.com.br",
      image: "/projects/acessa.png",
      dates: "2025–2026",
      active: true,
      category: "frontend",
      description:
        "Acessa é uma plataforma de acessibilidade para ensino de alunos com necessidades especiais.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
          category: "frontend",
        },
        {
          name: "Tailwind",
          icon: <StackIcon name="tailwindcss" className="size-4" />,
          category: "frontend",
        },
        {
          name: "ShadcnUI",
          icon: <StackIcon name="shadcnui" className="size-4" variant="dark" />,
          category: "frontend",
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
          category: "backend",
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
          category: "backend",
        },
        {
          name: "Prisma",
          icon: <StackIcon name="prisma" className="size-4" variant="dark" />,
          category: "backend",
        },
      ],
      links: [
        {
          icon: <HomeIcon className="size-4" />,
          type: "Website",
          href: "https://acessa.edukativa.com.br",
        },
      ],
    },
    {
      title: "Stack de Observabilidade",
      slug: "stack-de-observabilidade",
      href: "https://homepage.edukativa.com.br",
      image: "/projects/observability.png",
      dates: "2025–2026",
      active: true,
      featured: true,
      category: "infra",
      description:
        "Stack de Observabilidade completa com Jenkins, SonarQube, Keycloak, Grafana e alertas automáticos no Slack.",
      technologies: [
        {
          name: "AWS",
          icon: <StackIcon name="aws" className="size-4" variant="dark" />,
          category: "devops",
        },
        {
          name: "Docker",
          icon: <StackIcon name="docker" className="size-4" />,
          category: "devops",
        },
        {
          name: "Jenkins",
          icon: <StackIcon name="jenkins" className="size-4" />,
          category: "devops",
        },
        {
          name: "Grafana",
          icon: <StackIcon name="grafana" className="size-4" variant="dark" />,
          category: "devops",
        },
      ],
      links: [
        {
          icon: <HomeIcon className="size-6" />,
          type: "Website",
          href: "https://homepage.edukativa.com.br",
        },
      ],
    },
    {
      title: "Sistema Gestão Acadêmica",
      slug: "sistema-gestao-academica",
      href: "https://app.cognusplay.com.br",
      image: "/projects/painel.png",
      dates: "2023–2026",
      active: true,
      featured: true,
      category: "backend",
      description:
        "Sistema de Gestão Acadêmica integrado ao Moodle, com camada isolada para alunos e painel de métricas para gestores.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
          category: "frontend",
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
          category: "backend",
        },
        {
          name: "MongoDB",
          icon: <StackIcon name="mongodb" className="size-4" />,
          category: "backend",
        },
        {
          name: "Moodle",
          icon: <StackIcon name="moodle" className="size-4" />,
          category: "backend",
        },
        {
          name: "Docker",
          icon: <StackIcon name="docker" className="size-4" />,
          category: "devops",
        },
      ],
      links: [
        {
          icon: <HomeIcon className="size-6" />,
          type: "Website",
          href: "https://app.cognusplay.com.br",
        },
      ],
    },
    {
      title: "Simulador Infraero",
      slug: "simulador-infraero",
      href: "https://simulador.edukativa.com.br",
      image: "/projects/simulador.png",
      dates: "2025",
      active: true,
      category: "infra",
      description:
        "Simulador para treinamento de funcionários da Infraero em procedimentos operacionais de emergência.",
      technologies: [
        {
          name: "TypeScript",
          icon: <StackIcon name="typescript" className="size-4" />,
          category: "frontend",
        },
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
          category: "frontend",
        },
      ],
      links: [
        {
          icon: <HomeIcon className="size-4" />,
          type: "Website",
          href: "https://simulador.edukativa.com.br",
        },
      ],
    },
    {
      title: "Telegram Bot",
      slug: "telegram-bot",
      href: "https://github.com/Danzokka/telegram-bot",
      dates: "2024",
      active: true,
      category: "backend",
      description:
        "Bot para Telegram construído com NestJS e Telegraf, com mensagens agendadas, tratamento de comandos e notificações orientadas a eventos.",
      technologies: [
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
          category: "backend",
        },
        {
          name: "Node.js",
          icon: <StackIcon name="nodejs" className="size-4" />,
          category: "backend",
        },
      ],
      links: [
        {
          icon: <Icons.github className="w-5 h-5" />,
          type: "Código",
          href: "https://github.com/Danzokka/telegram-bot",
        },
      ],
    },
    {
      title: "Gestrix",
      slug: "gestrix",
      href: "https://plataformagestrix.com.br",
      image: "/projects/gestrix.png",
      dates: "2025–2026",
      active: true,
      featured: true,
      category: "backend",
      description:
        "Plataforma SaaS multi-tenant para gestão de frota de veículos para locação. Monorepo com Turborepo, API NestJS e frontend Next.js 15, com dashboards em tempo real, gestão de contratos e controle de acesso por papéis.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
          category: "frontend",
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
          category: "backend",
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
          category: "backend",
        },
        {
          name: "Prisma",
          icon: <StackIcon name="prisma" className="size-4" variant="dark" />,
          category: "backend",
        },
        {
          name: "Redis",
          icon: <StackIcon name="redis" className="size-4" />,
          category: "backend",
        },
        {
          name: "ShadcnUI",
          icon: <StackIcon name="shadcnui" className="size-4" variant="dark" />,
          category: "frontend",
        },
      ],
      links: [
        {
          icon: <HomeIcon className="size-4" />,
          type: "Website",
          href: "https://plataformagestrix.com.br",
        },
      ],
    },
    {
      title: "Reuel",
      slug: "reuel",
      href: "https://reuel.app.br",
      image: "/projects/reuel.png",
      dates: "2025–2026",
      active: true,
      featured: true,
      category: "frontend",
      description:
        "Plataforma de compartilhamento de caronas com web app consolidado integrando painéis de Admin, Parceiro e Público. Frontend Next.js 16 com API Fastify, funcionalidades em tempo real via Socket.io e AWS S3 para armazenamento de mídia.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
          category: "frontend",
        },
        {
          name: "ShadcnUI",
          icon: <StackIcon name="shadcnui" className="size-4" variant="dark" />,
          category: "frontend",
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
          category: "backend",
        },
        {
          name: "Prisma",
          icon: <StackIcon name="prisma" className="size-4" variant="dark" />,
          category: "backend",
        },
        {
          name: "Redis",
          icon: <StackIcon name="redis" className="size-4" />,
          category: "backend",
        },
        {
          name: "AWS",
          icon: <StackIcon name="aws" className="size-4" variant="dark" />,
          category: "devops",
        },
      ],
      links: [
        {
          icon: <HomeIcon className="size-4" />,
          type: "Website",
          href: "https://reuel.app.br",
        },
      ],
    },
    {
      title: "Marcador de Consultas",
      slug: "marcador-de-consultas",
      href: "https://github.com/Danzokka/marcador-de-consultas",
      dates: "2024",
      active: true,
      category: "frontend",
      description:
        "Sistema de agendamento de consultas com visualização de calendário, autenticação de usuários e notificações por e-mail.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
          category: "frontend",
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
          category: "backend",
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
          category: "backend",
        },
        {
          name: "Prisma",
          icon: <StackIcon name="prisma" className="size-4" variant="dark" />,
          category: "backend",
        },
      ],
      links: [
        {
          icon: <Icons.github className="w-5 h-5" />,
          type: "Código",
          href: "https://github.com/Danzokka/marcador-de-consultas",
        },
      ],
    },
  ],
  services: [
    {
      title: "Desenvolvimento de Software",
      description:
        "Desenvolvimento de soluções de software personalizadas para atender às necessidades específicas do seu negócio.",
      icon: <Code2 className="size-6" />,
    },
    {
      title: "Consultoria",
      description:
        "Consultoria técnica para ajudar você a tomar as melhores decisões para o seu projeto.",
      icon: <Headset className="size-6" />,
    },
    {
      title: "Suporte Técnico",
      description:
        "Serviços de suporte técnico para garantir que seus sistemas estejam sempre funcionando perfeitamente.",
      icon: <Terminal className="size-6" />,
    },
  ],
  reviews: [
    {
      avatar: "/placeholder.png",
      name: "Nome do Cliente",
      position: "CEO da Empresa X",
      rating: 5,
      reviewText:
        "Esta é uma avaliação de exemplo. O serviço prestado foi excepcional e superou minhas expectativas.",
    },
  ],
  metrics: [
    { value: 5, suffix: "+", label: "Anos de Experiência" },
    { value: 20, suffix: "+", label: "Projetos Concluídos" },
    { value: 0, suffix: "", label: "Xícaras de Café", isInfinity: true },
  ],
  navbar: {
    home: "Início",
    projects: "Projetos",
    skills: "Habilidades",
    services: "Serviços",
    contact: "Contato",
  },
  hero: {
    title: "Rafael Dantas",
    description:
      "Engenheiro Fullstack com expertise em DevOps. Construo sistemas escaláveis de ponta a ponta — de UIs pixel-perfect à infraestrutura de produção.",
    tagline: "conectando sistemas",
    roles: ["Engenheiro Fullstack", "Engenheiro DevOps", "Infraestrutura"],
    aboutMe: "Sobre Mim",
    seeProjects: "Ver Projetos",
    contact: "Fale Comigo",
  },
  sectionTitles: {
    projects: "Projetos",
    projectsSubtitle: "O que eu entreguei",
    projectsDescription:
      "De plataformas SaaS a stacks de observabilidade — uma seleção de sistemas em produção que projetei e implantei.",
    services: "Serviços",
    servicesSubtitle: "O que ofereço",
    servicesDescription:
      "Ofereço serviços de desenvolvimento e infraestrutura de ponta a ponta para escalar seu produto.",
    reviews: "Avaliações",
    reviewsSubtitle: "Feedback de Clientes",
    reviewsDescription:
      "Feedback real de clientes que confiaram em mim para entregar.",
    getStarted: "Começar",
    available: "Disponível para trabalho",
    skills: "Habilidades",
    skillsFrontend: "Frontend",
    skillsBackend: "Backend",
    skillsDevops: "DevOps & Infra",
    projectsAll: "Todos",
    projectsFrontend: "Frontend",
    projectsBackend: "Backend",
    projectsInfra: "Infra",
    technologies: "Tecnologias",
    footerHeadline: "Pronto para conectar sistemas.",
    footerPitch:
      "De interfaces pixel-perfect a infraestrutura de produção — construo de ponta a ponta e entrego rápido.",
    footerResume: "Abrir Currículo",
    contact: "Contato",
    contactDescription: "Quer trabalhar junto ou só dar um olá? Me chame por email ou pelas redes — estou sempre aberto a uma conversa.",
    contactEmail: "Enviar email",
  },
  skillDescriptions: {
    frontend:
      "Construindo interfaces responsivas e acessíveis com React e Next.js. Foco em sistemas de design, arquitetura de componentes e animações com Tailwind CSS e Framer Motion.",
    backend:
      "Desenvolvendo APIs RESTful e orientadas a eventos com NestJS e Node.js. Experiência com PostgreSQL, MongoDB, Prisma ORM e integrações com Moodle LMS.",
    devops:
      "Automatizando deploys e gerenciando infraestrutura em nuvem na AWS com Docker, Jenkins e GitHub Actions. Observabilidade completa com Grafana, Keycloak e SonarQube.",
  },
};

export const DATA = DATA_PT;
