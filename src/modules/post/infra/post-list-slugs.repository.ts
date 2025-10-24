import path from 'node:path';
import { CONTENT_BASE_DIR } from '@content/config';
import { mdxListDirEntries } from '@/shared/mdx';

export async function postListSlugsRepository(collection: string) {
  const absolutePath = path.join(CONTENT_BASE_DIR, collection);
  const dirEntries = await mdxListDirEntries(absolutePath);

  return dirEntries.map(({ slug }) => slug);
}
