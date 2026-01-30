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
import { User } from "@/types/user";
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
  skills: [
    {
      name: "JavaScript",
      icon: <StackIcon name="js" className="size-4" />,
    },
    {
      name: "TypeScript",
      icon: <StackIcon name="typescript" className="size-4" />,
    },
    {
      name: "Node.js",
      icon: <StackIcon name="nodejs" className="size-4" />,
    },
    {
      name: "Next.js",
      icon: <StackIcon name="nextjs2" className="size-4" />,
    },
    {
      name: "NestJS",
      icon: <StackIcon name="nestjs" className="size-4" />,
    },
    {
      name: "Docker",
      icon: <StackIcon name="docker" className="size-4" />,
    },
    {
      name: "PostgreSQL",
      icon: <StackIcon name="postgresql" className="size-4" />,
    },
    {
      name: "Linux",
      icon: <StackIcon name="linux" className="size-4" />,
    },
    {
      name: "AWS",
      icon: <StackIcon name="aws" className="size-4" variant="dark" />,
    },
    {
      name: "Tailwind CSS",
      icon: <StackIcon name="tailwindcss" className="size-4" />,
    },
    {
      name: "Shell",
      icon: <StackIcon name="bash" className="size-4" variant="dark" />,
    },
    {
      name: "Git",
      icon: <StackIcon name="git" className="size-4" />,
    },
    {
      name: "Prisma",
      icon: <StackIcon name="prisma" className="size-4" variant="dark" />,
    },
    {
      name: "ShadcnUI",
      icon: <StackIcon name="shadcnui" className="size-4" variant="dark" />,
    },
    {
      name: "GitHub",
      icon: <StackIcon name="github" className="size-4" variant="dark" />,
    },
    {
      name: "MongoDB",
      icon: <StackIcon name="mongodb" className="size-4" />,
    },
  ],
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
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
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
          icon: <StackIcon name="react" className="size-4" />,
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
    {
      title: "Marcador de Consultas",
      href: "https://github.com/Danzokka/marcador-de-consultas",
      dates: "2024",
      active: true,
      description:
        "An appointment scheduling system for users, developed with Next.js, NestJS, and Prisma, utilizing ShadcnUI for visual components.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
        },

        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
        },
      ],
      links: [
        {
          icon: <Icons.github className="w-5 h-5" />,
          type: "Source",
          href: "https://github.com/Danzokka/marcador-de-consultas",
        },
      ],
    },
    {
      title: "install_scripts",
      href: "https://github.com/Danzokka/install_scripts",
      dates: "2024",
      active: true,
      description: "An automated and versatile installer for systems.",
      technologies: [
        {
          name: "Shell",
          icon: <StackIcon name="shell" className="size-4" />,
        },
      ],
      links: [
        {
          icon: <Icons.github className="w-5 h-5" />,
          type: "Source",
          href: "https://github.com/Danzokka/install_scripts",
        },
      ],
    },
    {
      title: "CMS-Portfolio",
      href: "https://github.com/Danzokka/CMS-Portfolio",
      dates: "2024",
      active: true,
      description: "A Content Management System designed for portfolios.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
        },
      ],
      links: [
        {
          icon: <Icons.github className="w-5 h-5" />,
          type: "Source",
          href: "https://github.com/Danzokka/CMS-Portfolio",
        },
      ],
    },
    {
      title: "Sistema Gestão Acadêmica",
      href: "https://github.com/Devs-Edukativa/sistema-gestao-academica",
      dates: "2026",
      active: true,
      description: "Monorepo for Academic Management System.",
      technologies: [
        {
          name: "TypeScript",
          icon: <StackIcon name="typescript" className="size-4" />,
        },
      ],
      links: [],
    },
    {
      title: "Infraero Simulator",
      href: "https://github.com/Devs-Edukativa/infraero-sim",
      dates: "2025",
      active: true,
      description: "Simulator for Infraero systems.",
      technologies: [
        {
          name: "TypeScript",
          icon: <StackIcon name="typescript" className="size-4" />,
        },
      ],
      links: [],
    },
    {
      title: "FinOrg",
      href: "https://github.com/RS-Devworks/finorg",
      dates: "2025",
      active: true,
      description: "Financial Management System.",
      technologies: [
        {
          name: "TypeScript",
          icon: <StackIcon name="typescript" className="size-4" />,
        },
      ],
      links: [],
    },
  ],
  services: [
    {
      title: "Web Development",
      description:
        "Creation of custom websites and web applications to meet your business needs.",
      icon: <StackIcon name="globe" className="size-4" />,
    },
    {
      title: "Consulting",
      description:
        "Technical consulting to help you make the best decisions for your project.",
      icon: <StackIcon name="headset" className="size-4" />,
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
    {
      value: "100+",
      label: "Clients Served",
    },
    {
      value: "250K+",
      label: "Lines of Code",
    },
    {
      value: "50+",
      label: "Projects Completed",
    },
  ],
  navbar: {
    home: "Home",
    projects: "Projects",
    about: "About",
    services: "Services",
    contact: "Contact",
  },
  hero: {
    title: "Welcome to My Portfolio",
    description:
      "I am a passionate developer specializing in creating beautiful and functional web applications. Explore my projects and services below.",
    aboutMe: "About Me",
    seeProjects: "See Projects",
  },
  sectionTitles: {
    projects: "My Projects",
    projectsSubtitle: "See my latest work",
    projectsDescription:
      "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
    about: "About Me",
    aboutSubtitle: "About Rafael",
    aboutDescription:
      "Our team is composed of passionate professionals dedicated to delivering the best solutions for our clients. Get to know the people behind the projects.",
    services: "My Services",
    servicesSubtitle: "What I offer",
    servicesDescription:
      "I offer a variety of services to help you achieve your digital goals. From custom website development to search engine optimization, I'm here to help your business grow online.",
    reviews: "Reviews",
    reviewsSubtitle: "Client Reviews",
    reviewsDescription:
      "Real feedback from clients who trusted my design expertise to elevate their brands successfully.",
    footerSubtitle: "Available for work",
    getStarted: "Get Started",
    available: "Available for work",
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
        },
        {
          name: "Node.js",
          icon: <StackIcon name="nodejs" className="size-4" />,
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
        },
        {
          name: "Docker",
          icon: <StackIcon name="docker" className="size-4" />,
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
        },
        {
          name: "AWS",
          icon: <StackIcon name="aws" className="size-4" variant="dark" />,
        },
        {
          name: "Tailwind CSS",
          icon: <StackIcon name="tailwindcss" className="size-4" />,
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
        },
        {
          name: "Moodle",
          icon: <StackIcon name="moodle" className="size-4" />,
        },
        {
          name: "PHP",
          icon: <StackIcon name="php" className="size-4" />,
        },
        {
          name: "JavaScript",
          icon: <StackIcon name="js" className="size-4" />,
        },
        {
          name: "JQuery",
          icon: <StackIcon name="jquery" className="size-4" />,
        },
        {
          name: "MySQL",
          icon: <StackIcon name="mysql" className="size-4" />,
        },
        {
          name: "AWS",
          icon: <StackIcon name="aws" className="size-4" variant="dark" />,
        }
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
      href: "https://github.com/RS-Devworks/coink",
      dates: "2025-2026",
      active: true,
      description:
        "Coink é um sistema de gerenciamento financeiro pessoal desenvolvido com Next.js, NestJS, Prisma, Tailwind CSS e ShadcnUI.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
        },
        {
          name: "Tailwind CSS",
          icon: <StackIcon name="tailwindcss" className="size-4" />,
        },
        {
          name: "Prisma",
          icon: <StackIcon name="prisma" className="size-4" variant="dark" />,
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
        },
        {
          name: "ShadcnUI",
          icon: <StackIcon name="shadcnui" className="size-4" variant="dark" />,
        },
      ],
      links: [],
    },
    {
      title: "Marcador de Consultas",
      href: "https://github.com/Danzokka/marcador-de-consultas",
      dates: "2024",
      active: true,
      description:
        "Sistema de agendamento de consultas desenvolvido com Next.js, NestJS e Prisma, utilizando ShadcnUI para componentes visuais.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
        },
        {
          name: "Prisma",
          icon: <StackIcon name="prisma" className="size-4" variant="dark" />,
        },
        {
          name: "ShadcnUI",
          icon: <StackIcon name="shadcnui" className="size-4" variant="dark" />,
        },
        {
          name: "Tailwind CSS",
          icon: <StackIcon name="tailwindcss" className="size-4" />,
        },
      ],
      links: [
        {
          icon: <StackIcon name="github" className="size-4" variant="dark" />,
          type: "Código",
          href: "https://github.com/Danzokka/marcador-de-consultas",
        },
      ],
    },
    {
      title: "Acessa",
      href: "https://acessa.edukativa.com.br",
      dates: "2025-2026",
      active: true,
      description:
        "Acessa é uma plataforma de acessibilidade para ensino de alunos com necessidades especiais",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
        },
        {
          name: "Tailwind CSS",
          icon: <StackIcon name="tailwindcss" className="size-4" />,
        },
        {
          name: "ShadcnUI",
          icon: <StackIcon name="shadcnui" className="size-4" variant="dark" />,
        },
        {
          name: "PostgreSQL",
          icon: <StackIcon name="postgresql" className="size-4" />,
        },
        {
          name: "Prisma",
          icon: <StackIcon name="prisma" className="size-4" variant="dark" />,
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
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
      href: "https://homepage.edukativa.com.br",
      dates: "2025-2026",
      active: true,
      description:
        "Stack de Observabilidade completa com avisos automatizados enviados para o Slack, painel de gerenciamento de sessões para o Sistema de Gestão Academica e Acessa, automatização com Jenkins, análise de código com SonarQube, gerenciamento de sessões OIDC com Keycloak e Outline para documentação de serviços.",
      technologies: [
        {
          name: "AWS",
          icon: <StackIcon name="aws" className="size-4" variant="dark" />,
        },
        {
          name: "Docker",
          icon: <StackIcon name="docker" className="size-4" />,
        },
        {
          name: "Jenkins",
          icon: <StackIcon name="jenkins" className="size-4" />,
        },
        {
          name: "Grafana",
          icon: <StackIcon name="grafana" className="size-4" variant="dark" />,
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
      href: "https://app.cognusplay.com.br",
      dates: "2023-2026",
      active: true,
      description:
        "Sistema de Gestão Academica integrado ao Moodle, serve como uma camada isolada do Moodle, permitindo que os alunos tenham uma experiência mais personalizada e eficiente sem navegar pelo Moodle, para os gerentes permite que vejam de forma instantânea dados de progresso de usuários e métricas importantes de cursos.",
      technologies: [
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
        },
        {
          name: "NestJS",
          icon: <StackIcon name="nestjs" className="size-4" />,
        },
        {
          name: "MongoDB",
          icon: <StackIcon name="mongodb" className="size-4" />,
        },
        {
          name: "Moodle",
          icon: <StackIcon name="moodle" className="size-4" />,
        },
        {
          name: "Redis",
          icon: <StackIcon name="redis" className="size-4" />,
        },
        {
          name: "Docker",
          icon: <StackIcon name="docker" className="size-4" />,
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
      href: "https://simulador.edukativa.com.br",
      dates: "2025",
      active: true,
      description:
        "Um simulador desenvolvido para treinar funcionários da Infraero em procedimentos operacionais de emergências.",
      technologies: [
        {
          name: "TypeScript",
          icon: <StackIcon name="typescript" className="size-4" />,
        },
        {
          name: "Next.js",
          icon: <StackIcon name="nextjs2" className="size-4" />,
        },
      ],
      links: [
        {
          icon: <HomeIcon className="size-6" />,
          type: "Website",
          href: "https://simulador.edukativa.com.br",
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
    {
      value: "100+",
      label: "Clientes Atendidos",
    },
    {
      value: "250K+",
      label: "Linhas de Código",
    },
    {
      value: "50+",
      label: "Projetos Concluídos",
    },
  ],
  navbar: {
    home: "Início",
    projects: "Projetos",
    about: "Sobre",
    services: "Serviços",
    contact: "Contato",
  },
  hero: {
    title: "Bem-vindo ao Meu Portfólio",
    description:
      "Sou um desenvolvedor apaixonado, especializado em criar aplicações web bonitas e funcionais. Explore meus projetos e serviços abaixo.",
    aboutMe: "Sobre Mim",
    seeProjects: "Ver Projetos",
  },
  sectionTitles: {
    projects: "Meus Projetos",
    projectsSubtitle: "Veja os meus últimos trabalhos",
    projectsDescription:
      "Já trabalhei em uma variedade de projetos, desde sites simples até aplicações web complexas. Aqui estão alguns dos meus favoritos.",
    about: "Sobre Mim",
    aboutSubtitle: "Sobre o Rafael",
    aboutDescription:
      "Nossa equipe é composta por profissionais apaixonados dedicados a entregar as melhores soluções para nossos clientes. Conheça as pessoas por trás dos projetos.",
    services: "Meus Serviços",
    servicesSubtitle: "O que eu ofereço",
    servicesDescription:
      "Ofereço uma variedade de serviços para ajudar você a alcançar seus objetivos digitais. Desde o desenvolvimento de sites personalizados até a otimização para mecanismos de busca, estou aqui para ajudar seu negócio a crescer online.",
    reviews: "Avaliações",
    reviewsSubtitle: "Avaliações de Clientes",
    reviewsDescription:
      "Feedback real de clientes que confiaram na minha expertise de design para elevar suas marcas com sucesso.",
    footerSubtitle: "Disponível para trabalho",
    getStarted: "Começar",
    available: "Disponível para trabalho",
  },
};

export const DATA = DATA_PT;
