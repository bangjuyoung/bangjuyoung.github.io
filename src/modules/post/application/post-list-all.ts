import { postListAllRepository } from '../infra';

export async function postListAll(
  collection: string,
  options?: {
    publishedOnly?: boolean;
    filename?: string;
    concurrency?: number;
  },
) {
  if (!collection?.trim()) {
    throw new Error('collection is required');
  }

  const { filename = 'index.mdx', concurrency, publishedOnly } = options ?? {};

  const rows = await postListAllRepository(collection, filename, { concurrency });

  let filteredRows = rows;

  if (publishedOnly) {
    filteredRows = rows.filter((row) => row.published);
  }

  return filteredRows;
}
