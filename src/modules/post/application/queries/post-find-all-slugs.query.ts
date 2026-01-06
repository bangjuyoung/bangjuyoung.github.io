import { PostRepositoryPort } from '../../domain';

export class PostFindAllSlugsQuery {
  constructor(private readonly repo: PostRepositoryPort) {}

  async execute(input: { collection: string }) {
    const { collection } = input;

    return await this.repo.findAllSlugs(collection);
  }
}
