import { MDXContainer, MDXContent } from '@/shared/mdx';
import { postBuildNextMetadata, postGetBySlug, postListParams, PostNotFoundError } from '@/modules/post';
import { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return await postListParams('mdx');
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await postGetBySlug('mdx', slug);

  return postBuildNextMetadata(metadata);
}

export default async function MDXSlugPage({ params }: Props) {
  const { slug } = await params;

  try {
    const { title, content } = await postGetBySlug('mdx', slug);

    return (
      <MDXContainer className="p-4">
        <MDXContent title={title} content={content} />
      </MDXContainer>
    );
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return (
        <div className="flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">404 - Not Found</h1>
          <p>The requested page could not be found.</p>
        </div>
      );
    }

    throw error;
  }
}
