import z from 'zod';
import { emptyToUndefined } from '@/shared/schemas';
import { postCollectionSchema, postFilenameSchema } from './post-base.schema';

export const postFindAllSchema = z.object({
  collection: z.preprocess(emptyToUndefined, postCollectionSchema),
  filename: z.preprocess(emptyToUndefined, postFilenameSchema.optional()),
  publishedOnly: z.boolean().optional(),
});

export type PostFindAllData = z.infer<typeof postFindAllSchema>;
