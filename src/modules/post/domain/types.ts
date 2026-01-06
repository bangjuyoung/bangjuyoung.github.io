import { PostMetadataProps } from './post.schema';

export type PostItem = {
  slug: string;
  title: string;
  overview: string;
  date: Date;
  published: boolean;
  tags: string[];
  relativePath: string;
};

export type PostDetail = {
  metadata: PostMetadataProps;
  title: string;
  content: string;
  relativePath: string;
};
