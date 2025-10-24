import { PostMetadataProps } from '../domain';
import { Metadata } from 'next';

export function postBuildNextMetadata(raw: PostMetadataProps): Metadata {
  const title = raw.title || 'Untitled';
  const description = raw.description ?? raw.summary ?? title;
  const keywords = raw.tags ?? [];
  const robots = raw.published ? undefined : { index: false, follow: false, nocache: true };

  return {
    title,
    description,
    keywords,
    robots,
  };
}
