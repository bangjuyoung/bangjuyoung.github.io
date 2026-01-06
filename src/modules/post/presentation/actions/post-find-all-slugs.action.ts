// 'use server';

import { PostFindAllSlugsData, postFindAllSlugsSchema } from '../schemas';
import { getPostFactory } from '../../composition';

export async function postFindAllSlugsAction(input: PostFindAllSlugsData) {
  const parsed = postFindAllSlugsSchema.safeParse(input);

  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => issue.path.join('.') + ' : ' + issue.message).join(', ');
    throw new Error(message);
  }

  try {
    const factory = getPostFactory();
    const result = await factory.queries.findAllSlugs.execute(parsed.data);

    return result;
  } catch (error) {
    // TODO: handle error
    throw error;
  }
}
