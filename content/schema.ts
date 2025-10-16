import z from 'zod';

export const contentFrontmatterSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().optional(),
  summary: z.string().optional(),
  publishedAt: z.string().optional(),
  date: z.string().optional(),
  tags: z.array(z.string()).default([]),
  locale: z.enum(['ko-kr', 'en-us']).default('ko-kr'),
  published: z.boolean().default(false),
});

export type ContentFrontmatterProps = z.input<typeof contentFrontmatterSchema>;
