// Portfolio content, ported verbatim from the Claude Design file (Portfolio.dc.html).

export type Lang = "pt" | "en";
export type Category = "devops" | "backend" | "frontend";
type Story = { title: string; desc: string[]; learn: string[] };

export type Project = {
  slug: string;
  title: string;
  category: Category;
  ext?: string;
  dates: string;
  href: string;
  image?: string;
  /** screenshots for the project page; the first one is the main print when there is no `image` */
  shots?: string[];
  /** home card shows the dan_the_dev cat instead of a screenshot */
  catCover?: boolean;
  code?: boolean;
  story?: Record<Lang, Story>;
  tech: string[];
  /** [label pt, label en, items] */
  arch?: [string, string, string[]][];
  /** [short, long] */
  pt: [string, string];
  en: [string, string];
};

export type Experience = {
  company: string;
  year: string;
  end: [string, string];
  kind: [string, string];
  place: [string, string];
  period: [string, string];
  role: [string, string];
  tech: string[];
  bullets: Record<Lang, string[]>;
};

export type Slide = {
  kind: string;
  kicker?: string;
  title?: string;
  lead?: string;
  text?: string;
  note?: string;
  action?: string;
  href?: string;
  chips?: string[];
  stages?: string[];
  active?: number;
  peek?: string;
  terms?: { abbr: string; name: string; text: string }[];
  bars?: { label: string; value: number; text: string }[];
  lines?: { text: string; prompt?: boolean; tone?: string }[];
};

export type Post = {
  id: string;
  type: "carrossel" | "reel";
  title: string;
  date: [string, string];
  tags: string;
  caption: string;
  slides: Slide[];
};

export const EMAIL = "rafaeldantasboeira@gmail.com";

const ICON: Record<string, string> = { 'React': 'react', 'TypeScript': 'typescript', 'Next.js': 'nextdotjs', 'Tailwind CSS': 'tailwindcss', 'Tailwind': 'tailwindcss', 'JavaScript': 'javascript', 'ShadcnUI': 'shadcnui', 'Framer Motion': 'framer', 'TanStack Query': 'reactquery', 'Zod': 'zod',
  'NestJS': 'nestjs', 'Node.js': 'nodedotjs', 'PostgreSQL': 'postgresql', 'Prisma': 'prisma', 'MongoDB': 'mongodb', 'Redis': 'redis', 'Swagger': 'swagger', 'Python': 'python', 'PHP': 'php', 'MySQL': 'mysql',
  'Docker': 'docker', 'Linux': 'linux', 'Shell': 'gnubash', 'Git': 'git', 'GitHub': 'github', 'GitHub Actions': 'githubactions', 'Jenkins': 'jenkins', 'N8N': 'n8n', 'Grafana': 'grafana', 'Keycloak': 'keycloak',
  'Moodle': 'moodle', 'k6': 'k6', 'Instagram': 'instagram', 'Turborepo': 'turborepo', 'Kubernetes': 'kubernetes', 'Argo CD': 'argo', 'AWS EKS': '', 'Prometheus': 'prometheus', 'Rust': 'rust', 'Tauri': 'tauri', 'Go': 'go', 'Fastify': 'fastify', 'Socket.io': 'socketdotio', 'LinkedIn': 'linkedin', 'AWS': '' };
const IFY: Record<string, string> = { 'AWS': 'mdi:aws', 'AWS EKS': 'simple-icons:amazoneks', 'EKS': 'simple-icons:amazoneks', 'EC2': 'simple-icons:amazonec2', 'Teams': 'mdi:microsoft-teams', 'LinkedIn': 'mdi:linkedin', 'Loki': 'devicon-plain:grafanaloki', 'FinOps': 'tabler:coin', 'TUI': 'tabler:terminal-2' };
const RAW: Record<string, string> = {"Tempo":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" viewBox=\"0 0 512 512\"><path fill=\"__C__\" d=\"M19.6 152.6H10c-5.5 0-10 4.5-10 10s4.5 10 10 10h9.6c5.5 0 10-4.5 10-10c-.1-5.5-4.5-10-10-10m184 145.3H194c-5.5 0-10 4.4-10 9.9s4.4 10 9.9 10h9.6c5.5 0 10-4.4 10-9.9c.1-5.6-4.3-10-9.9-10q.15 0 0 0m-8-94.8c0-5.5-4.5-10-10-10h-33.3c-5.5 0-10 4.5-10 10s4.5 10 10 10h33.3c5.5-.1 10-4.5 10-10m315.7-62.6l-10.1-56.9c-2.9-21.3-21.6-37-43.1-36H68.2C53.6 47.1 41.4 58.5 40.9 73c-.1 2.3.1 4.7.7 6.9l10.7 60.5c.1.5.2 1 .3 1.4c1.3 7.4-2.5 10.4-5.8 11.5c-5.2 1.9-7.9 7.6-6 12.7c1.4 3.9 5.1 6.6 9.3 6.6h434.6c14.6.5 26.8-10.9 27.3-25.5c.1-2.1-.2-4.4-.7-6.6M378.7 368.6c-4.2-22.1-16.8-30.2-31-30.2h-103c-5.5 0-10 4.6-10 10.1c0 5.1 3.8 9.5 8.9 10c3.3.6 6.8 4.9 9 15.5l10.6 58.8c4 18.2 20 31.3 38.6 31.7l61.5-.3c14.6.7 26.9-10.5 27.6-25.1q.15-3.45-.6-6.9zm-136.2-50.1h111.8c.8 0 1.7-.1 2.5-.4c10.3-2.2 10.8-10.6 9.5-18.9L352 221c-3.9-20.3-15.7-28.4-31.2-28.4H218.4c-5.5.1-9.9 4.6-9.8 10.1c.1 5 3.8 9.1 8.7 9.8c3.4.6 7.1 5.2 9.3 16.8l10.8 59.8c1.2 4.3-1.4 8.7-5.7 9.9c-.2.1-.4.1-.7.1c-5.2 1.8-7.9 7.4-6.1 12.6c1.4 4 5.2 6.7 9.4 6.7h8z\"/></svg>","Alertmanager":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.02em\" height=\"1em\" viewBox=\"0 0 115.333 114\"><path fill=\"__C__\" d=\"M56.667.667C25.372.667 0 26.036 0 57.332s25.372 56.666 56.667 56.666s56.666-25.371 56.666-56.666c0-31.296-25.372-56.665-56.666-56.665m0 106.055c-8.904 0-16.123-5.948-16.123-13.283H72.79c0 7.334-7.219 13.283-16.123 13.283m26.63-17.682H30.034v-9.658h53.264v9.658Zm-.191-14.629h-52.92c-.176-.203-.356-.403-.526-.609c-5.452-6.62-6.736-10.076-7.983-13.598c-.021-.116 6.611 1.355 11.314 2.413c0 0 2.42.56 5.958 1.205c-3.397-3.982-5.414-9.044-5.414-14.218c0-11.359 8.712-21.285 5.569-29.308c3.059.249 6.331 6.456 6.552 16.161c3.252-4.494 4.613-12.701 4.613-17.733c0-5.21 3.433-11.262 6.867-11.469c-3.061 5.045.793 9.37 4.219 20.099c1.285 4.03 1.121 10.812 2.113 15.113C63.797 33.534 65.333 20.5 71 16c-2.5 5.667.37 12.758 2.333 16.167c3.167 5.5 5.087 9.667 5.087 17.548c0 5.284-1.951 10.259-5.242 14.148c3.742-.702 6.326-1.335 6.326-1.335l12.152-2.371c.001-.001-1.765 7.261-8.55 14.254\"/></svg>","Remotion":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" viewBox=\"0 0 250 250\"><g fill=\"__C__\"><path fill-opacity=\".1\" d=\"M81.03 33.963c-3.848.208-6.95.814-10.075 1.995c-1.558.583-4.114 1.852-5.52 2.73c-5.881 3.662-10.364 9.169-12.702 15.577c-.466 1.268-1.728 5.315-2.54 8.1c-5.407 18.617-8.476 38.975-9.135 60.521c-.104 3.432-.104 11.603 0 14.979c.442 14.285 1.816 27.181 4.307 40.332c1.012 5.323 2.635 12.473 3.575 15.721c1.92 6.599 5.841 12.217 11.418 16.335c3.736 2.761 7.978 4.613 12.678 5.523c2.266.438 5.255.638 7.457.494c3.045-.199 9.087-1.005 13.996-1.875c22.128-3.918 42.568-10.933 61.104-20.972c11.739-6.36 21.774-13.247 31.456-21.602c9.65-8.316 17.877-17.261 25.117-27.3c1.679-2.323 2.523-3.679 3.366-5.387c2.17-4.405 3.19-8.786 3.182-13.686c0-4.565-.868-8.619-2.74-12.768c-.9-2.003-1.759-3.44-3.688-6.169c-7.102-10.047-14.985-18.801-24.594-27.308c-14.896-13.184-32.589-23.997-52.346-32c-4.283-1.733-8.501-3.257-13.579-4.909c-10.751-3.487-24.056-6.511-35.313-8.02c-1.767-.24-4.17-.375-5.423-.31\"/><path fill-opacity=\".3\" d=\"M91.457 53.379c-3.029.163-5.47.64-7.929 1.57c-1.227.458-3.237 1.457-4.344 2.147c-4.628 2.883-8.156 7.216-9.995 12.258c-.367.999-1.36 4.182-1.998 6.374c-4.256 14.65-6.67 30.67-7.19 47.625c-.081 2.7-.081 9.13 0 11.786c.349 11.241 1.43 21.389 3.39 31.738c.796 4.188 2.074 9.815 2.813 12.371c1.511 5.193 4.597 9.614 8.985 12.854c2.94 2.173 6.278 3.63 9.977 4.345c1.782.346 4.135.503 5.867.39c2.396-.157 7.15-.791 11.014-1.476c17.412-3.083 33.497-8.603 48.083-16.503c9.237-5.005 17.134-10.424 24.752-16.999c7.594-6.543 14.068-13.583 19.765-21.482c1.321-1.828 1.985-2.895 2.649-4.239c1.707-3.466 2.51-6.914 2.504-10.77c0-3.592-.683-6.782-2.156-10.047c-.708-1.576-1.385-2.707-2.902-4.854c-5.59-7.906-11.792-14.795-19.354-21.489c-11.722-10.374-25.644-18.883-41.191-25.181c-3.37-1.363-6.689-2.562-10.685-3.862c-8.46-2.745-18.93-5.124-27.788-6.311c-1.39-.189-3.281-.295-4.267-.245\"/><path d=\"M102.247 73.517c-2.178.117-3.933.46-5.702 1.129c-.882.33-2.328 1.047-3.123 1.544c-3.329 2.073-5.866 5.189-7.189 8.815c-.264.718-.978 3.008-1.437 4.584c-3.06 10.535-4.797 22.055-5.17 34.249c-.059 1.941-.059 6.566 0 8.476c.25 8.083 1.028 15.381 2.438 22.823c.573 3.013 1.491 7.059 2.023 8.897c1.087 3.734 3.305 6.914 6.461 9.244c2.114 1.562 4.515 2.61 7.175 3.125c1.282.248 2.973.361 4.219.28c1.724-.113 5.143-.569 7.921-1.061c12.522-2.218 24.089-6.187 34.578-11.868c6.643-3.599 12.322-7.497 17.801-12.225c5.461-4.705 10.117-9.768 14.213-15.449c.951-1.314 1.428-2.082 1.905-3.048c1.228-2.493 1.805-4.972 1.801-7.745c0-2.583-.491-4.877-1.551-7.225c-.509-1.134-.995-1.947-2.087-3.491c-4.019-5.686-8.479-10.64-13.917-15.454c-8.43-7.46-18.442-13.58-29.623-18.109c-2.423-.98-4.81-1.842-7.684-2.777c-6.083-1.973-13.613-3.685-19.983-4.538c-1-.136-2.36-.213-3.069-.177\"/></g></svg>"};

/** Icon URL for a tech name: inline SVG, Iconify or Simple Icons, tinted with a hex colour (no #). */
export function ic(n: string, c = "F4F7FF"): string {
  if (RAW[n]) return "data:image/svg+xml," + encodeURIComponent(RAW[n].split("__C__").join("#" + c));
  if (IFY[n]) {
    const [p, s] = IFY[n].split(":");
    return `https://api.iconify.design/${p}/${s}.svg?color=%23${c}`;
  }
  return ICON[n] ? `https://cdn.simpleicons.org/${ICON[n]}/${c}` : "";
}

export const hasIcon = (n: string) => !!(ICON[n] || IFY[n] || RAW[n]);

export type SkillCat = "infra" | "obs" | "lang" | "app";
export const SKILLS: [string, SkillCat][] = [
  ['AWS EKS', 'infra'], ['Kubernetes', 'infra'], ['Argo CD', 'infra'], ['k6', 'infra'], ['Docker', 'infra'], ['AWS', 'infra'], ['Linux', 'infra'], ['GitHub Actions', 'infra'], ['Jenkins', 'infra'], ['Git', 'infra'], ['N8N', 'infra'],
  ['Prometheus', 'obs'], ['Alertmanager', 'obs'], ['Grafana', 'obs'], ['Loki', 'obs'], ['Tempo', 'obs'], ['FinOps', 'obs'],
  ['Rust', 'lang'], ['Go', 'lang'], ['TypeScript', 'lang'], ['Python', 'lang'], ['Shell', 'lang'],
  ['Tauri', 'app'], ['Next.js', 'app'], ['React', 'app'], ['NestJS', 'app'], ['Node.js', 'app'], ['PostgreSQL', 'app'], ['Redis', 'app'], ['Prisma', 'app'], ['MongoDB', 'app'],
];
export const LAYER: Record<string, string> = { 'Next.js': 'fe', 'React': 'fe', 'TypeScript': 'fe', 'ShadcnUI': 'fe', 'Tailwind': 'fe', 'Turborepo': 'fe',
  'NestJS': 'api', 'Node.js': 'api', 'Fastify': 'api', 'Moodle': 'api', 'Socket.io': 'api', 'Keycloak': 'api',
  'PostgreSQL': 'db', 'MongoDB': 'db', 'Redis': 'db', 'Prisma': 'db', 'AWS': 'infra', 'Docker': 'infra', 'Jenkins': 'infra', 'Grafana': 'infra' };
export const PROJECTS: Project[] = [
  { slug: 'observabilidade-citiesoft', shots: ['/projects/shots/observabilidade-grafana-plataforma.png', '/projects/shots/observabilidade-grafana-traces.png', '/projects/shots/observabilidade-grafana-noc.png'], title: 'Observabilidade Citiesoft', category: 'devops', ext: '.yaml', dates: '2026', href: '',
    story: {
      pt: { title: 'Ver o cluster e o quanto ele custa.', desc: ['Com os serviços rodando no EKS, faltava um lugar único para ver o que acontecia. Montei a stack com Prometheus para métricas, Loki para logs e Tempo para traces, com tudo reunido no Grafana.', 'Além dos painéis de serviço, criei painéis de FinOps para acompanhar o custo da infraestrutura. Os alertas saem do Alertmanager direto para o Microsoft Teams, e o notificador está virando um serviço próprio em Go para mensagens mais claras.'], learn: [] },
      en: { title: 'Seeing the cluster and what it costs.', desc: ['With services running on EKS, there was no single place to see what was happening. I built the stack with Prometheus for metrics, Loki for logs and Tempo for traces, all brought together in Grafana.', 'Besides service dashboards, I created FinOps dashboards to track infrastructure cost. Alerts go from Alertmanager straight to Microsoft Teams, and the notifier is becoming a custom Go service for clearer messages.'], learn: [] } },
    tech: ['EKS', 'Kubernetes', 'Argo CD', 'Prometheus', 'Loki', 'Tempo', 'Grafana', 'FinOps', 'Alertmanager', 'Go', 'Teams'],
    arch: [['cluster', 'cluster', ['EKS', 'Kubernetes']], ['sinais', 'signals', ['Prometheus', 'Loki', 'Tempo']], ['painéis', 'dashboards', ['Grafana', 'FinOps']], ['alertas', 'alerts', ['Alertmanager', 'Go']], ['canal', 'channel', ['Teams']]],
    pt: ['Stack de observabilidade com painéis de serviço e de FinOps.', 'Stack de observabilidade implantada na Citiesoft: métricas com Prometheus, logs com Loki e traces com Tempo, tudo reunido no Grafana. Inclui painéis de observabilidade para os serviços e painéis de FinOps para acompanhar o custo da infraestrutura. Os alertas saem do Alertmanager para o Microsoft Teams, e o notificador está virando um serviço próprio em Go.'],
    en: ['Observability stack with service and FinOps dashboards.', 'Observability stack deployed at Citiesoft: metrics with Prometheus, logs with Loki and traces with Tempo, all brought together in Grafana. Includes observability dashboards for the services and FinOps dashboards to track infrastructure cost. Alerts go from Alertmanager to Microsoft Teams, and the notifier is becoming a custom Go service.'] },
  { slug: 'deploy-eks-ec2', shots: ['/projects/shots/deploy-eks-ec2-grafana-cicd.png', '/projects/shots/deploy-eks-ec2-jenkins-login.png'], title: 'Deploy EKS + EC2', category: 'devops', ext: '.groovy', dates: '2026', href: '',
    story: {
      pt: { title: 'Um fluxo para o cluster e para as VMs.', desc: ['Montei o cluster Kubernetes na AWS com EKS e automatizei os deploys. O Jenkins builda e publica as imagens, e o Argo CD sincroniza o cluster a partir do Git.', 'Parte das aplicações ainda roda em instâncias EC2, então o mesmo fluxo também entrega para elas. Agora estou colocando deploy canary e testes de carga com k6 no caminho.'], learn: [] },
      en: { title: 'One flow for the cluster and the VMs.', desc: ['I set up the Kubernetes cluster on AWS with EKS and automated deployments. Jenkins builds and publishes the images, and Argo CD syncs the cluster from Git.', 'Some applications still run on EC2 instances, so the same flow ships to them too. Now I am adding canary deploys and k6 load tests to the path.'], learn: [] } },
    tech: ['Jenkins', 'k6', 'Argo CD', 'AWS', 'EKS', 'EC2', 'Kubernetes', 'Docker'],
    arch: [['ci', 'ci', ['Jenkins', 'Docker']], ['testes', 'tests', ['k6']], ['gitops · canary', 'gitops · canary', ['Argo CD']], ['cluster', 'cluster', ['EKS', 'Kubernetes']], ['vms', 'vms', ['EC2']]],
    pt: ['Cluster Kubernetes na AWS com deploy automatizado.', 'Cluster Kubernetes na AWS com EKS e deploys automatizados: o Jenkins builda e publica as imagens, e o Argo CD sincroniza o cluster a partir do Git. O mesmo fluxo entrega para as instâncias EC2 que ainda rodam fora do cluster. O deploy canary e os testes de carga com k6 estão entrando nesse fluxo.'],
    en: ['Kubernetes cluster on AWS with automated deploys.', 'Kubernetes cluster on AWS with EKS and automated deployments: Jenkins builds and publishes the images, and Argo CD syncs the cluster from Git. The same flow ships to the EC2 instances that still run outside the cluster. Canary deploys and k6 load tests are being added to this flow.'] },
  { slug: 'citie-tunnel', shots: ['/projects/shots/citie-tunnel-gui-cluster.png', '/projects/shots/citie-tunnel-tui-painel.png', '/projects/shots/citie-tunnel-gui-recursos.png', '/projects/shots/citie-tunnel-tui-recursos.png'], title: 'citie-tunnel', category: 'devops', ext: '.rs', dates: '2026', href: '',
    story: {
      pt: { title: 'Scripts que pararam de funcionar.', desc: ['O citie-tunnel nasceu de um problema interno. Abrir túnel para acessar os bancos de dados sempre deu trabalho, e com a migração para o Kubernetes os scripts que já existiam pararam de funcionar.', 'Em vez de remendar script por script, juntei tudo numa ferramenta só, escrita em Rust. Ela abre os túneis até os bancos e oferece duas interfaces sobre o mesmo núcleo: uma GUI desktop em Tauri para quem prefere clicar e uma TUI para quem vive no terminal.'],
        learn: ['Uma ferramenta centralizada resolve mais do que vários scripts soltos: um lugar para corrigir e um jeito só de usar.', 'Separar o núcleo das interfaces garante que a GUI e a TUI se comportem do mesmo jeito.', 'Migrar para o Kubernetes muda o caminho até os serviços, e as ferramentas internas precisam acompanhar essa mudança.'] },
      en: { title: 'Scripts that stopped working.', desc: ['citie-tunnel came from an internal problem. Opening tunnels to reach the databases was always painful, and after the move to Kubernetes the existing scripts stopped working.', 'Instead of patching script after script, I put everything into one tool written in Rust. It opens the tunnels to the databases and offers two interfaces on the same core: a Tauri desktop GUI for those who prefer clicking and a TUI for those who live in the terminal.'],
        learn: ['One centralized tool solves more than many loose scripts: one place to fix and one way to use it.', 'Splitting the core from the interfaces keeps the GUI and the TUI behaving the same way.', 'Moving to Kubernetes changes the path to every service, and internal tooling has to follow.'] } },
    tech: ['Rust', 'Tauri', 'TUI'],
    arch: [['núcleo', 'core', ['Rust']], ['gui', 'gui', ['Tauri']], ['tui', 'tui', ['TUI']]],
    pt: ['Ferramenta em Rust com interface gráfica e TUI.', 'O citie-tunnel é uma ferramenta escrita em Rust com duas interfaces: uma GUI desktop feita com Tauri e uma TUI para usar direto no terminal, sobre o mesmo núcleo.'],
    en: ['Rust tool with a desktop GUI and a TUI.', 'citie-tunnel is a tool written in Rust with two interfaces: a desktop GUI built with Tauri and a TUI for the terminal, on top of the same core.'] },
  { slug: 'gestrix', shots: ['/projects/shots/gestrix-1.png', '/projects/shots/gestrix-2.png', '/projects/shots/gestrix-3.png'], title: 'Gestrix', category: 'backend', dates: '2025–2026', image: '/projects/gestrix.png', href: 'https://plataformagestrix.com.br', code: false,
    tech: ['Next.js', 'NestJS', 'Turborepo', 'PostgreSQL', 'Prisma', 'Redis', 'ShadcnUI'],
    pt: ['Plataforma SaaS multi-tenant para gestão de frota de veículos para locação.', 'Plataforma SaaS multi-tenant para gestão de frota de veículos para locação. Monorepo com Turborepo, API NestJS e frontend Next.js 15, com dashboards em tempo real, gestão de contratos e controle de acesso por papéis.'],
    en: ['Multi-tenant SaaS platform for vehicle fleet rental management.', 'Multi-tenant SaaS platform for vehicle fleet rental management. Turborepo monorepo with NestJS API and Next.js 15 frontend, featuring real-time dashboards, contract management and role-based access control.'] },
  { slug: 'reuel', shots: ['/projects/reuel.png', '/projects/shots/reuel-2.png', '/projects/shots/reuel-3.png', '/projects/shots/reuel-1.png'], title: 'Reuel', category: 'frontend', dates: '2025–2026', href: 'https://reuel.app.br',
    tech: ['Next.js', 'ShadcnUI', 'Fastify', 'Socket.io', 'PostgreSQL', 'Prisma', 'Redis', 'AWS'],
    pt: ['Plataforma de caronas com painéis de Admin, Parceiro e Público.', 'Plataforma de compartilhamento de caronas com web app consolidado integrando painéis de Admin, Parceiro e Público. Frontend Next.js 16 com API Fastify, funcionalidades em tempo real via Socket.io e AWS S3 para armazenamento de mídia.'],
    en: ['Carpooling platform with Admin, Partner and Public panels.', 'Carpooling platform with a consolidated web app integrating Admin, Partner, and Public panels. Next.js 16 frontend with Fastify API, real-time features via Socket.io, and AWS S3 for media storage.'] },
  { slug: 'sistema-gestao-academica', shots: ['/projects/painel.png', '/projects/shots/sistema-gestao-academica-1.png', '/projects/shots/sistema-gestao-academica-2.png', '/projects/shots/sistema-gestao-academica-3.png'], title: 'Gestão Acadêmica', category: 'backend', dates: '2023–2026', href: 'https://app.cognusplay.com.br',
    tech: ['Next.js', 'NestJS', 'Keycloak', 'MongoDB', 'Moodle', 'Docker'],
    pt: ['Sistema de Gestão Acadêmica integrado ao Moodle.', 'Sistema de Gestão Acadêmica integrado ao Moodle, com camada isolada para alunos e painel de métricas para gestores. Gerencia cursos, matrículas, notas e relatórios em tempo real, com autenticação via Keycloak. Roda em três versões: a própria, a da Enagro e a do SFB.'],
    en: ['Academic management system integrated with Moodle.', 'Academic management system integrated with Moodle, with an isolated student layer and a metrics dashboard for managers. Handles courses, enrolments, grades and real-time reports with Keycloak auth. Runs in three versions: our own, Enagro and SFB.'] },
  { slug: 'coink', title: 'Coink', category: 'frontend', dates: '2025–2026', image: '/projects/coink.png', href: 'https://github.com/Danzokka/coink', code: true,
    tech: ['Next.js', 'NestJS', 'Tailwind', 'Prisma', 'PostgreSQL', 'ShadcnUI'],
    pt: ['Sistema de gerenciamento financeiro pessoal.', 'Sistema de gerenciamento financeiro pessoal com dashboard interativo, categorização de despesas, metas de economia e relatórios automáticos. Full-stack, com autenticação, integração bancária e gráficos em tempo real.'],
    en: ['Personal finance management system.', 'Personal finance management system with interactive dashboard, expense categorization, savings goals and automatic reports. Built full-stack with authentication, bank integration and real-time charts.'] },
  { slug: 'acessa', title: 'Acessa', category: 'frontend', dates: '2025–2026', image: '/projects/acessa.png', href: 'https://acessa.edukativa.com.br',
    tech: ['Next.js', 'Tailwind', 'ShadcnUI', 'NestJS', 'PostgreSQL', 'Prisma'],
    pt: ['Plataforma de acessibilidade para ensino de alunos com necessidades especiais.', 'Plataforma que facilita o estudo de crianças com necessidades especiais, com conteúdo adaptativo, suporte a leitores de tela e ferramentas de gestão para professores.'],
    en: ['Accessibility platform for teaching students with special needs.', 'Accessibility platform for teaching students with special needs, featuring adaptive content, screen-reader support and teacher management tools.'] },
  { slug: 'dan-the-dev', catCover: true, title: 'dan_the_dev', category: 'frontend', ext: '.tsx', dates: '2026', href: 'https://github.com/Danzokka/dan_the_dev', code: true,
    tech: ['Next.js', 'React', 'TypeScript', 'Remotion'],
    arch: [['roteiro', 'script', ['TypeScript']], ['studio', 'studio', ['Next.js', 'React']], ['render', 'render', ['Remotion']], ['canais', 'channels', ['Instagram', 'LinkedIn']]],
    pt: ['Meu studio pessoal para produção de conteúdo técnico.', 'O dan_the_dev é o meu studio pessoal de conteúdo técnico. Um app local em Next.js reúne a pesquisa de pauta, o editor de carrosséis e o editor de vídeos, todos com a mesma identidade visual. Os vídeos verticais são renderizados com Remotion e os posts vão para o Instagram e o LinkedIn.'],
    en: ['My personal studio for technical content production.', 'dan_the_dev is my personal studio for technical content. A local Next.js app brings together topic research, the carousel editor and the video editor, all with one visual identity. Vertical videos are rendered with Remotion and posts go to Instagram and LinkedIn.'] },
];
export const EXT: Record<Category, string> = { frontend: '.tsx', backend: '.ts', devops: '.yaml' };
export const EXP: Experience[] = [
  { company: 'Citiesoft', year: '2026', end: ['hoje', 'now'], kind: ['trabalho', 'work'], place: ['', ''], period: ['jul 2026 → hoje', 'jul 2026 → now'],
    role: ['Engenheiro DevOps · Arquitetura de infraestrutura', 'DevOps Engineer · Infrastructure architecture'], tech: ['AWS', 'EKS', 'EC2', 'Kubernetes', 'Jenkins', 'Argo CD', 'k6', 'Prometheus', 'Alertmanager', 'Loki', 'Tempo', 'Grafana', 'Go', 'Rust', 'Tauri'],
    bullets: { pt: ['Sou um dos arquitetos da empresa: defino como a estrutura de software e de infraestrutura é montada.', 'Subi o cluster Kubernetes na AWS com EKS.', 'Automatizei os deploys com Jenkins e Argo CD, no cluster e em instâncias EC2, e estou implantando deploy canary e testes de carga com k6.', 'Implantei a stack de observabilidade com Prometheus, Loki, Tempo e Grafana, com painéis de serviço e de FinOps.', 'Configurei alertas no Microsoft Teams com o Alertmanager e estou evoluindo o notificador para um serviço próprio em Go.', 'Criei skills para agentes de IA que montam PDFs de uso interno, e automatizei a geração de relatórios.', 'Conduzi capacitações em Jenkins e Kubernetes.', 'Criei o citie-tunnel, uma ferramenta em Rust com GUI em Tauri e TUI.'],
      en: ["I'm one of the company's architects: I define how the software and infrastructure are put together.", 'Set up the Kubernetes cluster on AWS with EKS.', 'Automated deployments with Jenkins and Argo CD, to the cluster and to EC2 instances, and am rolling out canary deploys and k6 load tests.', 'Deployed the observability stack with Prometheus, Loki, Tempo and Grafana, with service and FinOps dashboards.', 'Set up Microsoft Teams alerts with Alertmanager and am evolving the notifier into a custom Go service.', 'Built skills for AI agents that assemble internal PDFs, and automated report generation.', 'Ran Jenkins and Kubernetes trainings.', 'Built citie-tunnel, a Rust tool with a Tauri GUI and a TUI.'] } },
  { company: 'Edukativa', year: '2023', end: ['2024', '2024'], kind: ['trabalho', 'work'], place: ['', ''], period: ['mar 2023 → mai 2024', 'mar 2023 → may 2024'],
    role: ['Engenheiro de Software · Tech Lead', 'Software Engineer · Tech Lead'], tech: ['Next.js', 'NestJS', 'MongoDB', 'PostgreSQL', 'Moodle', 'PHP', 'Docker', 'AWS'],
    bullets: { pt: ['Atuei como tech lead, com contato direto com os clientes para entender o problema e alinhar as entregas.', 'Desenvolvi o Sistema de Gestão Acadêmica integrado ao Moodle, que roda em três versões: a própria, a da Enagro e a do SFB.', 'Participei da montagem do Acessa, plataforma que facilita o estudo de crianças com necessidades especiais.', 'Continuei evoluindo os plugins do Moodle em PHP, com dados em MongoDB.'],
      en: ['Worked as tech lead, talking directly with clients to understand the problem and align deliveries.', 'Built the Academic Management System integrated with Moodle, which runs in three versions: our own, Enagro and SFB.', 'Helped build Acessa, a platform that makes studying easier for children with special needs.', 'Kept improving the Moodle plugins in PHP, with data in MongoDB.'] } },
  { company: 'Edukativa', year: '2023', end: ['2024', '2024'], kind: ['estágio', 'internship'], place: ['', ''], period: ['mai 2023 → jan 2024', 'may 2023 → jan 2024'],
    role: ['Estagiário de Desenvolvimento de Software', 'Software Development Intern'], tech: ['N8N', 'Moodle', 'PHP', 'JavaScript', 'MySQL', 'AWS'],
    bullets: { pt: ['Trabalhei em aplicações web escaláveis.', 'Colaborei com o desenvolvimento de plugins para o Moodle.', 'Desenvolvi automações de processos com o N8N.'],
      en: ['Worked on scalable web applications.', 'Contributed to Moodle plugin development.', 'Built process automations with N8N.'] } },
  { company: 'IESB', year: '2019', end: ['2023', '2023'], kind: ['formação', 'education'], place: ['', ''], period: ['2019 → 2023', '2019 → 2023'],
    role: ['Bacharelado em Engenharia da Computação', 'BSc in Computer Engineering'], tech: [],
    bullets: { pt: [], en: [] } },
];
const STAGES = ['push', 'build', 'teste', 'artefato', 'deploy'];
export const POSTS: Post[] = [
  { id: 'viagem', type: 'carrossel', title: 'A viagem de um commit', date: ['há 3 dias', '3 days ago'], tags: '#cicd #devops #pipeline',
    caption: 'O que acontece com o seu código nos oito minutos depois do git push? 🐱\nNesse carrossel eu sigo um commit pelas cinco etapas de um pipeline de CI/CD, explico os dois sentidos de CD e mostro onde o bug fica barato de corrigir.\n#cicd #devops #githubactions #pipeline',
    slides: [
      { kind: 'cover', kicker: 'devops do zero / 01', title: 'A viagem de um *commit*', lead: 'O que acontece entre o seu git push e a produção, etapa por etapa, sem ninguém apertar botão.', chips: ['CI/CD', 'iniciante', '5 etapas'] },
      { kind: 'terms', kicker: 'as duas siglas', terms: [
        { abbr: 'CI', name: 'Integração contínua', text: 'Cada push entra na branch principal passando por uma esteira automática de build e teste. Integrar várias vezes por dia faz o conflito e o bug aparecerem em minutos.' },
        { abbr: 'CD', name: 'Entrega contínua, ou deploy contínuo', text: 'O que passou na CI segue sozinho até um ambiente, como um pacote versionado pronto para subir. A diferença entre os dois é um botão de aprovação.' }] },
      { kind: 'pipeline', kicker: 'etapa 1 · build', stages: STAGES, active: 1, title: 'O código *compila?*', text: 'npm ci e npm run build, ou docker build. Instala dependências do zero, compila e empacota. Quebrou aqui, a esteira para em um minuto.' },
      { kind: 'bars', kicker: 'por que isso importa', peek: 'corner', title: 'Quanto custa corrigir o bug', bars: [
        { label: 'editor', value: 1, text: '1×' }, { label: 'esteira', value: 5, text: '5×' }, { label: 'homologação', value: 15, text: '15×' }, { label: 'produção', value: 100, text: '100×' }],
        note: 'Ordem de grandeza. A esteira existe para segurar o bug nas duas primeiras barras.' },
      { kind: 'cta', kicker: 'o que fica', stages: STAGES, text: 'Push. Build. Teste. Artefato. Deploy. *Toda vez, do mesmo jeito.*', action: 'Salva para o dia em que for montar a primeira esteira do seu projeto.' },
    ] },
  { id: 'loki', type: 'carrossel', title: 'Como o Loki armazena logs', date: ['há 1 semana', '1 week ago'], tags: '#loki #kubernetes #observabilidade',
    caption: 'Pra onde vai um log quando o nó morre? 🐱\nO Alloy lê o disco de cada nó e envia tudo pro Loki antes. Cada linha viaja com labels, que são o índice de verdade.\n#loki #kubernetes #observabilidade',
    slides: [
      { kind: 'cover', kicker: 'observabilidade / 02', title: 'Como o Loki *armazena logs*', lead: 'Do stdout do pod até o S3, e por que a busca é por label.', chips: ['Loki', 'Kubernetes', 'S3'] },
      { kind: 'statement', kicker: 'o mito', text: 'O Loki não indexa o texto. *Indexa os labels.*' },
      { kind: 'terminal', kicker: 'na prática', title: 'Uma busca por label', lines: [
        { text: "logcli query '{app=\"api\", env=\"prod\"}'", prompt: true },
        { text: '2026-09-10T02:00:14Z  cpu spike on node-2', tone: 'muted' },
        { text: '2026-09-10T02:00:15Z  OOMKilled api-7f9c', tone: 'danger' },
        { text: 'só os chunks de app=api foram lidos', tone: 'accent' }], note: 'Só os chunks com aqueles labels saem do S3.' },
      { kind: 'cta', kicker: 'o que fica', text: 'Label é índice. *Texto é carga.*', action: 'Salva para quando for escolher onde guardar os logs do cluster.', href: 'github.com/Danzokka' },
    ] },
  { id: 'proxy', type: 'reel', title: 'Proxy, Load Balancer e API Gateway', date: ['há 2 semanas', '2 weeks ago'], tags: '#nginx #aws #apigateway',
    caption: 'API Gateway e Load Balancer são tudo proxy? 🐱\nNesse vídeo eu separo os três pela decisão que cada um centraliza: encaminhar, distribuir ou governar.\n#nginx #aws #loadbalancer #apigateway #backend',
    slides: [
      { kind: 'cover', kicker: 'redes / 03', title: 'Proxy, LB e *API Gateway*', lead: 'Três decisões diferentes, e por que o mesmo nginx cobre as três.', chips: ['nginx', 'AWS', 'vídeo'] },
      { kind: 'statement', kicker: 'veredito', text: 'Proxy encaminha. Load balancer distribui. *Gateway governa.*' },
    ] },
  { id: 'docker', type: 'carrossel', title: 'Multi-stage build no Docker', date: ['há 3 semanas', '3 weeks ago'], tags: '#docker #containers',
    caption: 'Exemplo de post. Na versão real, este card vem do feed.',
    slides: [{ kind: 'cover', kicker: 'containers / 04', title: 'Imagem *menor*, deploy mais rápido', lead: 'O que fica na imagem final e o que fica pra trás num multi-stage build.', chips: ['Docker', 'build'] }] },
  { id: 'k8s', type: 'carrossel', title: 'O que é um pod', date: ['há 1 mês', '1 month ago'], tags: '#kubernetes #devops',
    caption: 'Exemplo de post. Na versão real, este card vem do feed.',
    slides: [{ kind: 'cover', kicker: 'kubernetes / 05', title: 'O que é um *pod*, afinal?', lead: 'A menor unidade do Kubernetes, e por que ela não é um container.', chips: ['Kubernetes', 'iniciante'] }] },
];
export const MARQ = ['AWS', 'Kubernetes', 'Argo CD', 'Jenkins', 'Alertmanager', 'Prometheus', 'Grafana', 'Loki', 'Tempo', 'Rust', 'Go', 'Tauri', 'Docker', 'AWS', 'Next.js'];
export const I18N = {
  pt: {
    skip: 'clique para pular', talk: 'fale comigo', scene: 'cena', drag: 'arraste para girar',
    roles: ['engenheiro devops', 'observabilidade e gitops', 'rust, go e kubernetes'],
    heroA: 'Engenheiro DevOps e um dos arquitetos de infraestrutura da Citiesoft. Cuido de clusters Kubernetes, entrega com GitOps e observabilidade de ponta a ponta, e escrevo ferramentas em Rust e Go quando falta uma. No ',
    heroB: ', explico como tudo isso funciona.',
    nowK: 'agora', nowRole: 'Engenheiro DevOps', nowSince: 'desde jul 2026',
    nowDoing: ['Arquitetura de software e de infraestrutura', 'Deploy canary e testes de carga com k6', 'Observabilidade, FinOps e alertas no Teams', 'Agentes de IA para documentos internos'],
    flowK: 'como eu entrego hoje', flowA: 'Do commit', flowEm: 'ao alerta.',
    flow: [['ci', 'build e imagem'], ['gitops', 'sincroniza o cluster'], ['aws', 'cluster e vms'], ['métricas', 'logs e traces'], ['alertas', 'regras e rotas'], ['canal', 'via notificador go']],
    ctaProjects: 'ver projetos →', ctaTalk: 'fale comigo',
    nav: ['sobre', 'experiência', 'projetos', 'conteúdo', 'contato'],
    aboutKicker: './sobre', aboutA: 'DevOps.', aboutEm: 'Com raiz no código.',
    about: 'Engenheiro DevOps com base fullstack. Hoje meu dia é Kubernetes, GitOps com Argo CD e observabilidade com Prometheus, Loki, Tempo e Grafana. Os anos construindo produtos em Next.js e NestJS me ajudam a entender o que roda dentro do cluster, e Rust e Go entram quando a ferramenta certa ainda não existe.',
    cats: ['tudo', 'infra', 'observabilidade', 'linguagens', 'apps'],
    catTexts: ['As ferramentas do meu dia a dia, da infraestrutura ao código. Escolha uma camada para ver o que entra em cada uma.',
      'Clusters Kubernetes com entrega via GitOps no Argo CD, containers com Docker e pipelines no GitHub Actions e no Jenkins. AWS e Linux por baixo de tudo.',
      'Métricas no Prometheus, logs no Loki e traces no Tempo, reunidos no Grafana. Os mesmos painéis mostram a saúde dos serviços e quanto a infraestrutura custa.',
      'Rust e Go para ferramentas de infraestrutura e CLIs, TypeScript para produto, Python e Shell para automação.',
      'A base fullstack: Tauri para apps desktop, Next.js e React no front, NestJS e Node.js nas APIs, PostgreSQL, Redis e MongoDB nos dados.'],
    tools: 'ferramentas',
    expKicker: './experiencia', expA: 'Experiência.', expEm: 'Do produto à infra.', expSince: 'desde',
    projKicker: './projetos', projA: 'Projetos.', projEm: 'O que eu entreguei.', items: 'projetos', seeCase: 'ver o case',
    filters: ['todos', 'devops', 'backend', 'frontend'],
    metrics: ['anos de experiência', 'projetos concluídos', 'xícaras de café'],
    contentA: 'Eu também', contentEm: 'explico.',
    contentDesc: 'Carrosséis e vídeos curtos sobre DevOps, infraestrutura e backend, com a mesma identidade visual do roteiro à exportação final. Publicados no Instagram e no LinkedIn.',
    follow: 'seguir ↗', posts: 'posts', postFilters: ['todos', 'carrosséis', 'reels'], postsLang: '',
    prev: '← anterior', next: 'próximo →', openIg: 'abrir no instagram ↗', close: 'fechar esc',
    contactKicker: './contato', contactA: 'Bora colocar', contactEm: 'em produção?',
    contactDesc: 'Quer trabalhar junto ou só dar um olá? Me chame por email ou pelas redes. Estou sempre aberto a uma conversa.',
    copy: '@ clique para copiar o email', copied: '✓ copiado',
    footMeta: ['© 2026 rafael dantas', 'brasília, df'],
    prints: 'prints', descK: 'descrição', learnK: 'aprendizado', stackK: 'stack', shotPh: ['print principal', 'print', 'print'], zoom: 'ampliar ↗', viewLabel: 'visualização', viewList: '≡ lista', viewGrid: '▦ grade', pickK: 'cenas 3d por seção', pickGo: 'ir ↓', pickOpen: '◇ cenas 3d', pickClose: '× fechar', internal: 'projeto interno', back: '← voltar', live: 'em produção', overview: 'visão geral', architecture: 'arquitetura', nextProject: 'próximo projeto',
    visit: 'visitar site ↗', code: 'ver código ↗', specs: ['ano', 'categoria', 'stack', 'status'], statusV: 'ativo',
    layers: { user: 'usuário', fe: 'frontend', api: 'api', db: 'dados', infra: 'infra' },
    boot: ['danzokka · boot', '▸ kubectl apply -f portfolio.yaml', '▸ argocd app sync danzokka', '▸ grafana: painéis carregados', '✓ pronto. bem-vindo.'],
  },
  en: {
    skip: 'click to skip', talk: 'get in touch', scene: 'scene', drag: 'drag to spin',
    roles: ['devops engineer', 'observability and gitops', 'rust, go and kubernetes'],
    heroA: 'DevOps engineer and one of the infrastructure architects at Citiesoft. I run Kubernetes clusters, GitOps delivery and end-to-end observability, and I write tools in Rust and Go when one is missing. On ',
    heroB: ', I explain how all of it works.',
    nowK: 'now', nowRole: 'DevOps Engineer', nowSince: 'since jul 2026',
    nowDoing: ['Software and infrastructure architecture', 'Canary deploys and k6 load tests', 'Observability, FinOps and Teams alerts', 'AI agents for internal documents'],
    flowK: 'how I ship today', flowA: 'From commit', flowEm: 'to alert.',
    flow: [['ci', 'build and image'], ['gitops', 'syncs the cluster'], ['aws', 'cluster and vms'], ['metrics', 'logs and traces'], ['alerts', 'rules and routes'], ['channel', 'via go notifier']],
    ctaProjects: 'see projects →', ctaTalk: 'get in touch',
    nav: ['about', 'experience', 'projects', 'content', 'contact'],
    aboutKicker: './about', aboutA: 'DevOps.', aboutEm: 'Rooted in code.',
    about: 'DevOps engineer with a fullstack background. My day is Kubernetes, GitOps with Argo CD and observability with Prometheus, Loki, Tempo and Grafana. Years of building products in Next.js and NestJS help me understand what runs inside the cluster, and Rust and Go come in when the right tool does not exist yet.',
    cats: ['all', 'infra', 'observability', 'languages', 'apps'],
    catTexts: ['The tools I use every day, from infrastructure to code. Pick a layer to see what goes into each one.',
      'Kubernetes clusters with GitOps delivery on Argo CD, containers with Docker and pipelines on GitHub Actions and Jenkins. AWS and Linux underneath it all.',
      'Metrics in Prometheus, logs in Loki and traces in Tempo, brought together in Grafana. The same dashboards show service health and what the infrastructure costs.',
      'Rust and Go for infrastructure tools and CLIs, TypeScript for product, Python and Shell for automation.',
      'The fullstack base: Tauri for desktop apps, Next.js and React on the front, NestJS and Node.js for APIs, PostgreSQL, Redis and MongoDB for data.'],
    tools: 'tools',
    expKicker: './experience', expA: 'Experience.', expEm: 'From product to infra.', expSince: 'since',
    projKicker: './projects', projA: 'Projects.', projEm: "What I've shipped.", items: 'projects', seeCase: 'see the case',
    filters: ['all', 'devops', 'backend', 'frontend'],
    metrics: ['years of experience', 'projects completed', 'coffee cups'],
    contentA: 'I also', contentEm: 'explain.',
    contentDesc: 'Carousels and short videos about DevOps, infrastructure and backend, with one visual identity from script to final export. Published on Instagram and LinkedIn.',
    follow: 'follow ↗', posts: 'posts', postFilters: ['all', 'carousels', 'reels'], postsLang: 'posts in portuguese',
    prev: '← prev', next: 'next →', openIg: 'open on instagram ↗', close: 'close esc',
    contactKicker: './contact', contactA: 'Ready to', contactEm: 'ship it?',
    contactDesc: "Want to work together or just say hello? Reach out via email or social. I'm always open to a conversation.",
    copy: '@ click to copy the email', copied: '✓ copied',
    footMeta: ['© 2026 rafael dantas', 'brasília, brazil'],
    prints: 'screenshots', descK: 'description', learnK: 'learnings', stackK: 'stack', shotPh: ['main screenshot', 'screenshot', 'screenshot'], zoom: 'zoom ↗', viewLabel: 'view', viewList: '≡ list', viewGrid: '▦ grid', pickK: '3d scenes per section', pickGo: 'go ↓', pickOpen: '◇ 3d scenes', pickClose: '× close', internal: 'internal project', back: '← back', live: 'in production', overview: 'overview', architecture: 'architecture', nextProject: 'next project',
    visit: 'visit site ↗', code: 'view code ↗', specs: ['year', 'category', 'stack', 'status'], statusV: 'active',
    layers: { user: 'user', fe: 'frontend', api: 'api', db: 'data', infra: 'infra' },
    boot: ['danzokka · boot', '▸ kubectl apply -f portfolio.yaml', '▸ argocd app sync danzokka', '▸ grafana: dashboards loaded', '✓ ready. welcome.'],
  },
};

export type Dict = (typeof I18N)["pt"];
