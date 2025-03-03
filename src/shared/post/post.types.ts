export type PostMetadataProps = {
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
  coverImage?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type PostDataProps = {
  metadata: PostMetadataProps;
  content: string;
};

export type PostSummaryProps = {
  domainPath: string;
  slug: string;
} & Pick<PostDataProps, 'metadata'>;

export type PostDetailProps = {
  domainPath: string;
  slug: string;
} & PostDataProps;

export type PostDomainPath = string[];

export type PostFoldersProps = {
  domainPath: string;
  folders: Array<{
    slug: string;
    title: string;
  }>;
};
