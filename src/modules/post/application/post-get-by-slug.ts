import { postFindBySlugRepository } from '../infra';
import { isNodeError } from '@/shared/lib';
import { PostNotFoundError } from '../domain';
import { mdxIsFile } from '@/shared/mdx';

export async function postGetBySlug(
  collection: string,
  slug: string,
  options?: {
    filename?: string;
  },
) {
  if (!collection?.trim()) {
    throw new Error('collection is required');
  }

  if (!slug?.trim()) {
    throw new Error('slug is required');
  }

  const { filename = 'index.mdx' } = options ?? {};

  if (filename && !mdxIsFile(filename)) {
    throw new Error('filename must be a mdx file');
  }

  try {
    return await postFindBySlugRepository(collection, slug, filename);
  } catch (error: unknown) {
    console.error(error);

    // 파일 없는 경우만 도메인 에러로 번역
    if (isNodeError(error, 'ENOENT')) {
      throw new PostNotFoundError(collection, slug, filename, error);
    }

    // 그 외는 상위에서 공통 처리(로깅/에러 페이지 등)
    throw error;
  }
}
