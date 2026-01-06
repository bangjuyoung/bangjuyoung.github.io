import z from 'zod';
import { postCollectionSchema, postFilenameSchema, postSlugSchema } from './post-base.schema';
import { emptyToUndefined } from '@/shared/schemas';

export const postFindBySlugSchema = z.object({
  collection: z.preprocess(emptyToUndefined, postCollectionSchema),
  slug: z.preprocess(emptyToUndefined, postSlugSchema),
  filename: z.preprocess(emptyToUndefined, postFilenameSchema.optional()),
});

export type PostFindBySlugData = z.infer<typeof postFindBySlugSchema>;
