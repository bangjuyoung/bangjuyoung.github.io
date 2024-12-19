import { notFound } from 'next/navigation';
import { CustomMDXRemote } from '@/shared/mdx';
import { recordContents } from '@/contexts/record';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return recordContents.getAll().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const metadata = recordContents.getBySlug(slug)?.metadata;

  if (!metadata) {
    return {};
  }

  const { title, summary } = metadata;

  return {
    ...(title && { title }),
    ...(summary && { description: summary }),
  };
}

export default async function RecordContentPage({ params }: PageProps) {
  const { slug } = await params;

  const result = recordContents.getBySlug(slug);

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
      <CustomMDXRemote source={content} />
    </>
  );
}
