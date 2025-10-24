export class PostNotFoundError extends Error {
  constructor(
    public readonly collection: string,
    public readonly slug: string,
    public readonly filename: string,
    public readonly cause?: unknown,
  ) {
    super(`Post not found: ${collection}/${slug}/${filename}`);
    this.name = 'PostNotFoundError';
  }
}
