import { MDXContent } from '@/shared/mdx';
import path from 'node:path';
import * as fs from 'node:fs';
import matter from 'gray-matter';
import { contentFrontmatterSchema } from '@content/schema';
import { postMetadataSchema } from '@/modules/post';
import { Metadata } from 'next';
import { MDXContainer } from '@/shared/mdx/components/mdx-container';

export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'test' }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await getPostBySlug(slug);

  const title = metadata.title;
  const description = metadata.description ?? metadata.summary ?? title;
  const keywords = metadata.tags?.join(', ') ?? [];
  const isPublished = metadata.published;

  return {
    title,
    description,
    keywords,
    robots: isPublished ? undefined : { index: false, follow: false, nocache: true },
  };
}

export default async function MDXSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { metadata, content } = await getPostBySlug(slug);

  const { title } = metadata;

  console.log({ metadata });

  return (
    <MDXContainer className="p-4">
      <MDXContent title={title} content={content} />
    </MDXContainer>
  );
}

async function getPostBySlug(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'mdx', slug, 'index.mdx');
  const raw = await fs.promises.readFile(filePath, 'utf-8');

  const { data, content } = matter(raw);

  const frontmatter = contentFrontmatterSchema.parse(data);
  const metadata = postMetadataSchema.parse(frontmatter);

  return {
    metadata,
    content,
  };
}
