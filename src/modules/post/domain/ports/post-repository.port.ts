import { PostDetail, PostItem } from '../types';

export interface PostRepositoryPort {
  findBySlug(collection: string, slug: string, filename: string): Promise<PostDetail | null>;
  findAll(collection: string, filename: string, options?: { concurrency?: number }): Promise<PostItem[]>;
  findAllSlugs(collection: string): Promise<string[]>;
}
