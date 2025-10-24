import { CONTENT_BASE_DIR } from '@content/config';
import path from 'node:path';
import { MDXDirEntry, mdxListDirEntries, mdxLoadFile } from '@/shared/mdx';
import { contentFrontmatterSchema } from '@content/schema';
import { postMetadataSchema } from '../domain';
import { mapWithConcurrency } from '@/shared/lib';

export interface PostListItem {
  slug: string;
  title: string;
  overview: string;
  date: Date;
  published: boolean;
  tags: string[];
  relativePath: string;
}

export async function postListAllRepository(
  collection: string,
  filename: string,
  options?: { concurrency?: number },
): Promise<PostListItem[]> {
  const concurrency = Math.max(1, options?.concurrency ?? 8);

  const absolutePath = path.join(CONTENT_BASE_DIR, collection);
  const dirEntries = await mdxListDirEntries(absolutePath);

  if (dirEntries.length === 0) {
    return [];
  }

  const rows = await mapWithConcurrency<MDXDirEntry, PostListItem | null>(
    dirEntries,
    concurrency,
    async ({ path: dirPath, slug }) => {
      try {
        const filePath = path.join(dirPath, filename);
        const { data } = await mdxLoadFile(filePath);

        const frontmatter = contentFrontmatterSchema.parse(data);
        const metadata = postMetadataSchema.parse(frontmatter);

        const title = metadata.title;
        const overview = metadata.summary ?? metadata.description ?? '';
        const date = metadata.date;
        const published = metadata.published;
        const tags = metadata.tags;
        const relativePath = path.posix.join(collection, slug, filename);

        return { slug, title, overview, date, published, tags, relativePath };
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  );

  return rows.filter((row): row is PostListItem => row !== null);
}
