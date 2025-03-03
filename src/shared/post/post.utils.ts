import path from 'node:path';
import fs from 'node:fs';
import { PostDataProps, PostDomainPath, PostMetadataProps } from './post.types';
import matter from 'gray-matter';

export function getPostsPath(domainPath: PostDomainPath): string | null {
  const directory = path.join(process.cwd(), 'posts', ...domainPath);

  if (!fs.existsSync(directory)) {
    console.warn(`[warn] Directory does not exist: ${directory}`);
    return null;
  }

  return directory;
}

export function getPostFilePath(domainPath: PostDomainPath, slug: string): string | null {
  const postsPath = getPostsPath(domainPath);

  if (!postsPath) {
    return null;
  }

  const postFilePath = path.join(postsPath, slug, 'index.mdx');

  if (!fs.existsSync(postFilePath)) {
    console.warn(`[warn] MDX file not found: ${postFilePath}`);
    return null;
  }

  return postFilePath;
}

export function readPostFile(filePath: string): PostDataProps | null {
  if (!fs.existsSync(filePath)) {
    console.warn(`[warn] MDX file not found: ${filePath}`);
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);

  return {
    metadata: data as PostMetadataProps,
    content,
  };
}
