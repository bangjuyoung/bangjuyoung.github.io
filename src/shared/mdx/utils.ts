import fs from 'node:fs/promises';
import matter from 'gray-matter';
import path from 'node:path';

export type MDXDirEntry = { path: string; slug: string };
export type MDXFileEntry = { path: string; filename: string; slug: string };

export function mdxIsFile(name: string) {
  return path.extname(name).toLowerCase() === '.mdx';
}

export async function mdxReadFile(absolutePath: string) {
  return fs.readFile(absolutePath, 'utf-8');
}

export function mdxParseFrontmatter(raw: string) {
  const { data, content } = matter(raw);

  return { data, content };
}

export async function mdxLoadFile(absolutePath: string) {
  const raw = await mdxReadFile(absolutePath);
  return mdxParseFrontmatter(raw);
}

export async function mdxListDirEntries(absolutePath: string): Promise<MDXDirEntry[]> {
  try {
    const entries = await fs.readdir(absolutePath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map(({ name }) => {
        return { path: path.join(absolutePath, name), slug: name };
      });
  } catch (error) {
    console.error(error);
    return [];
  }
}
