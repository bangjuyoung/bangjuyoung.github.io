import { PostDetail, PostNotFoundError, PostRepositoryPort } from '../../domain';

export type PostFindBySlugQueryInput = {
  collection: string;
  slug: string;
  filename?: string;
};

export class PostFindBySlugQuery {
  constructor(private readonly repo: PostRepositoryPort) {}

  async execute(input: PostFindBySlugQueryInput): Promise<PostDetail> {
    const { collection, slug, filename = 'index.mdx' } = input;

    const post = await this.repo.findBySlug(collection, slug, filename);

    if (!post) {
      throw new PostNotFoundError(collection, slug, filename);
    }

    return post;
  }
}
