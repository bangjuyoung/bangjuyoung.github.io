import { notFound } from 'next/navigation';
import { MDXContent } from '@/shared/mdx';
import { findAllPostsByDomain, findPostBySlug } from '@/shared/post';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return findAllPostsByDomain(['records', 'test']).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const metadata = findPostBySlug(['records', 'test'], slug)?.metadata;

  if (!metadata) {
    return {};
  }

  const { title, summary } = metadata;

  return {
    ...(title && { title }),
    ...(summary && { description: summary }),
  };
}

export default async function RecordsTestDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const result = findPostBySlug(['records', 'test'], slug);

  if (!result) {
    notFound();
  }

  const {
    metadata: { title },
    content,
  } = result;

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">{title}</h1>
      <MDXContent source={content} />
    </>
  );
}
