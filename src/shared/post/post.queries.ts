import path from 'node:path';
import fs from 'node:fs';
import { getPostFilePath, getPostsPath, readPostFile } from './post.utils';
import { PostDetailProps, PostDomainPath, PostFoldersProps, PostSummaryProps } from './post.types';

export function findSubFoldersByDomain(domainPath: PostDomainPath): PostFoldersProps | null {
  const postsPath = getPostsPath(domainPath);

  if (!postsPath) {
    return null;
  }

  const folders = fs
    .readdirSync(postsPath)
    .filter((folder) => {
      const fullPath = path.join(postsPath, folder);
      return fs.statSync(fullPath).isDirectory();
    })
    .map((folder) => ({
      slug: folder,
      title: folder.replace(/-/g, ' '),
    }));

  return { domainPath: domainPath.join('/'), folders };
}

export function findAllPostsByDomain(domainPath: PostDomainPath): PostSummaryProps[] {
  const subFolderData = findSubFoldersByDomain(domainPath);

  if (!subFolderData) {
    return [];
  }

  const { folders } = subFolderData;

  return folders
    .map(({ slug }) => {
      const postFilePath = getPostFilePath(domainPath, slug);

      if (!postFilePath) {
        return null;
      }

      const postData = readPostFile(postFilePath);

      if (!postData) {
        return null;
      }

      const { metadata } = postData;

      return {
        domainPath: domainPath.join('/'),
        slug,
        metadata,
      };
    })
    .filter((post): post is PostSummaryProps => post !== null);
}

export function findPostBySlug(domainPath: PostDomainPath, slug: string): PostDetailProps | null {
  const postsPath = getPostsPath(domainPath);

  if (!postsPath) {
    console.warn(`[warn] Directory does not exist: ${postsPath}`);
    return null;
  }

  const postFilePath = getPostFilePath(domainPath, slug);

  if (!postFilePath) {
    return null;
  }

  const postData = readPostFile(postFilePath);

  if (!postData) {
    return null;
  }

  const { metadata, content } = postData;

  return {
    domainPath: domainPath.join('/'),
    slug,
    metadata,
    content,
  };
}
