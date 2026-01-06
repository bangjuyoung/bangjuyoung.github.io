import { PostFileSystemRepository } from '../infra';
import { PostFindAllQuery, PostFindAllSlugsQuery, PostFindBySlugQuery } from '../application/queries';

export class PostFactory {
  private readonly repo = new PostFileSystemRepository();

  readonly queries = {
    findBySlug: new PostFindBySlugQuery(this.repo),
    findAll: new PostFindAllQuery(this.repo),
    findAllSlugs: new PostFindAllSlugsQuery(this.repo),
  };
}
