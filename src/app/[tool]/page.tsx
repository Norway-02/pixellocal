import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOOLS, getSiteUrl } from '../../lib/toolsConfig';
import ToolLayout from '../../components/ToolLayout';
import ToolInteractiveArea from '../../components/ToolInteractiveArea';

interface PageProps {
  params: Promise<{ tool: string }>;
}

export async function generateStaticParams() {
  return Object.keys(TOOLS).map((slug) => ({
    tool: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = TOOLS[slug];
  if (!tool) return {};

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/${tool.slug}`;

  return {
    title: tool.title,
    description: tool.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tool.title} | PixelLocal`,
      description: tool.seoDescription,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { tool: slug } = await params;
  const tool = TOOLS[slug];

  if (!tool) {
    notFound();
  }

  return (
    <ToolLayout tool={tool}>
      <ToolInteractiveArea tool={tool} />
    </ToolLayout>
  );
}
