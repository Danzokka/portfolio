import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/portfolio";
import { ProjectDetail } from "@/components/site/project-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} — Rafael Dantas`, description: project.pt[0] };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetail key={slug} project={project} />;
}
