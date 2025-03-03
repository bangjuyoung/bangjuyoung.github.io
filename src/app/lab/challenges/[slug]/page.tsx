import { notFound } from 'next/navigation';
import { MDXContent } from '@/shared/mdx';
import { findAllPostsByDomain, findPostBySlug } from '@/shared/post';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = findAllPostsByDomain(['lab', 'challenges']);

  if (posts.length === 0) {
    return [{ slug: 'not-found' }];
  }

  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const metadata = findPostBySlug(['lab', 'challenges'], slug)?.metadata;

  if (!metadata) {
    return {};
  }

  const { title, summary } = metadata;

  return {
    ...(title && { title }),
    ...(summary && { description: summary }),
  };
}

export default async function LabChallengesDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const result = findPostBySlug(['lab', 'challenges'], slug);

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
