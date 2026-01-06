import { PostRepositoryPort } from '../../domain';

export class PostFindAllQuery {
  constructor(private readonly repo: PostRepositoryPort) {}

  async execute(input: { collection: string; filename?: string; publishedOnly?: boolean }) {
    const { collection, filename = 'index.mdx', publishedOnly } = input;

    const posts = await this.repo.findAll(collection, filename);

    if (publishedOnly) {
      return posts.filter((post) => post.published);
    }

    return posts;
  }
}
