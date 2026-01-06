import path from 'node:path';
import { CONTENT_BASE_DIR } from '@content/config';
import { MDXDirEntry, mdxListDirEntries, mdxLoadFile } from '@/shared/mdx';
import { contentFrontmatterSchema } from '@content/schema';
import { postMetadataSchema, PostDetail, PostItem, PostRepositoryPort } from '../domain';
import { isNodeError, mapWithConcurrency } from '@/shared/lib';

export class PostFileSystemRepository implements PostRepositoryPort {
  async findBySlug(collection: string, slug: string, filename: string): Promise<PostDetail | null> {
    try {
      const absolutePath = path.join(CONTENT_BASE_DIR, collection, slug, filename);
      const { data, content } = await mdxLoadFile(absolutePath);

      const frontmatter = contentFrontmatterSchema.parse(data);
      const metadata = postMetadataSchema.parse(frontmatter);

      const title = metadata.title;

      return {
        metadata,
        title,
        content,
        relativePath: this.toPostRelativePath(collection, slug, filename),
      };
    } catch (error) {
      // 파일 없는 경우
      if (isNodeError(error, 'ENOENT')) {
        return null;
      }

      this.warn(`findBySlug failed (collection=${collection}, slug=${slug}, filename: ${filename})`, error);

      throw error;
    }
  }

  async findAll(collection: string, filename: string, options?: { concurrency?: number }): Promise<PostItem[]> {
    const concurrency = Math.max(1, options?.concurrency ?? 8);

    const absolutePath = this.toCollectionAbsolutePath(collection);
    const dirEntries = await mdxListDirEntries(absolutePath);

    if (dirEntries.length === 0) {
      return [];
    }

    const rows = await mapWithConcurrency<MDXDirEntry, PostItem | null>(
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
          const relativePath = this.toPostRelativePath(collection, slug, filename);

          return { slug, title, overview, date, published, tags, relativePath };
        } catch (error) {
          this.warn(`findAll item failed (collection=${collection}, slug=${slug}, filename=${filename})`, error);
          return null;
        }
      },
    );

    return rows.filter((row): row is PostItem => row !== null);
  }

  async findAllSlugs(collection: string): Promise<string[]> {
    const absolutePath = this.toCollectionAbsolutePath(collection);
    const dirEntries = await mdxListDirEntries(absolutePath);

    return dirEntries.map(({ slug }) => slug);
  }

  private toCollectionAbsolutePath(collection: string): string {
    return path.join(CONTENT_BASE_DIR, collection);
  }

  private toPostRelativePath(collection: string, slug: string, filename: string): string {
    return path.posix.join(collection, slug, filename);
  }

  private warn(context: string, error: unknown) {
    console.warn(`[PostFileSystemRepository] ${context}`);
    console.warn(error);
  }
}
