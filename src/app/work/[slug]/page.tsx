import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { getProject, projects } from "@/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Not found" };
  }

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — al0ke`,
      description: project.tagline,
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
