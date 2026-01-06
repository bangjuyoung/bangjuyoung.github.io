import z from 'zod';
import { emptyToUndefined } from '@/shared/schemas';
import { postCollectionSchema } from './post-base.schema';

export const postFindAllSlugsSchema = z.object({ collection: z.preprocess(emptyToUndefined, postCollectionSchema) });

export type PostFindAllSlugsData = z.infer<typeof postFindAllSlugsSchema>;
