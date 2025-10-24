import path from 'node:path';
import { CONTENT_BASE_DIR } from '@content/config';
import { mdxLoadFile } from '@/shared/mdx';
import { contentFrontmatterSchema } from '@content/schema';
import { PostMetadataProps, postMetadataSchema } from '../domain';

export type PostFindBySlugResult = {
  metadata: PostMetadataProps;
  title: string;
  content: string;
  relativePath: string;
};

export async function postFindBySlugRepository(
  collection: string,
  slug: string,
  filename: string,
): Promise<PostFindBySlugResult> {
  const absolutePath = path.join(CONTENT_BASE_DIR, collection, slug, filename);
  const { data, content } = await mdxLoadFile(absolutePath);

  const frontmatter = contentFrontmatterSchema.parse(data);
  const metadata = postMetadataSchema.parse(frontmatter);

  const title = metadata.title;

  return {
    metadata,
    title,
    content,
    relativePath: path.posix.join(collection, slug, filename),
  };
}
