import z from 'zod';
import { contentFrontmatterSchema } from '@content/schema';

export const postMetadataSchema = contentFrontmatterSchema.transform((fm) => {
  const dateString = fm?.publishedAt ?? fm?.date ?? new Date().toISOString();
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date format in frontmatter');
  }

  return {
    title: fm.title,
    description: fm?.description,
    summary: fm?.summary,
    tags: fm?.tags,
    locale: fm?.locale,
    published: fm?.published,
    date,
  };
});

export type PostMetadataProps = z.output<typeof postMetadataSchema>;
