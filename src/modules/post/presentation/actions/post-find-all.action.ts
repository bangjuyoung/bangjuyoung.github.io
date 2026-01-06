// 'use server';

import { PostFindAllData, postFindAllSchema } from '../schemas';
import { getPostFactory } from '../../composition';

export async function postFindAllAction(input: PostFindAllData) {
  const parsed = postFindAllSchema.safeParse(input);

  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => issue.path.join('.') + ' : ' + issue.message).join(', ');
    throw new Error(message);
  }

  try {
    const factory = getPostFactory();
    const result = await factory.queries.findAll.execute(parsed.data);

    return result;
  } catch (error) {
    // TODO: handle error
    throw error;
  }
}
