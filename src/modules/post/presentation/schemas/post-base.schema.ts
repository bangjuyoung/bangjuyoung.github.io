import { stringCreateSchema } from '@/shared/schemas';
import { mdxIsFile } from '@/shared/mdx';

export const postCollectionSchema = stringCreateSchema({
  message: { required: 'collection is required', invalid: 'collection must be a string' },
});

export const postSlugSchema = stringCreateSchema({
  message: { required: 'slug is required', invalid: 'slug must be a string' },
});

export const postFilenameSchema = stringCreateSchema({
  message: { required: 'filename is required', invalid: 'filename must be a string' },
}).refine((value) => value === undefined || mdxIsFile(value), {
  error: ({ input }) => `filename must be a mdx file: ${input}`,
});
