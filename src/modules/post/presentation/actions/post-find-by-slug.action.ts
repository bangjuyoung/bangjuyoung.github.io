// 'use server';

import { getPostFactory } from '../../composition';
import { PostFindBySlugData, postFindBySlugSchema } from '../schemas';

export async function postFindBySlugAction(input: PostFindBySlugData) {
  const parsed = postFindBySlugSchema.safeParse(input);

  if (!parsed.success) {
    const messages = parsed.error.issues.map((issue) => issue.path.join('.') + ' : ' + issue.message).join(', ');
    throw new Error(messages);
  }

  const { collection, slug, filename } = parsed.data;

  try {
    const factory = getPostFactory();
    const result = await factory.queries.findBySlug.execute({ collection, slug, filename });

    return result;
  } catch (error) {
    // TODO: handle error
    throw error;
  }
}
