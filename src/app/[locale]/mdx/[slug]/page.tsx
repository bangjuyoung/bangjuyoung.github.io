import { MDXContainer, MDXContent } from '@/shared/mdx';
import { PostNotFoundError } from '@/modules/post/domain';
import { Metadata } from 'next';
import { postFindAllSlugsAction, postFindBySlugAction } from '@/modules/post/presentation/actions';
import { postBuildNextMetadata } from '@/modules/post/presentation/utils';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const result = await postFindAllSlugsAction({ collection: 'mdx' });

  return result.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await postFindBySlugAction({ collection: 'mdx', slug });

  return postBuildNextMetadata(metadata);
}

export default async function MDXSlugPage({ params }: Props) {
  const { slug } = await params;

  try {
    const { title, content } = await postFindBySlugAction({ collection: 'mdx', slug });

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
