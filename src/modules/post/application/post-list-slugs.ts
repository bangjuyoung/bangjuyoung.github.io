import { postListSlugsRepository } from '../infra';

export async function postListSlugs(collection: string) {
  if (!collection?.trim()) {
    throw new Error('collection is required');
  }

  return await postListSlugsRepository(collection);
}
