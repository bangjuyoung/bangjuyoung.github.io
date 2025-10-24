import { postListSlugs } from './post-list-slugs';

export async function postListParams(collection: string) {
  const slugs = await postListSlugs(collection);

  return slugs.map((slug) => ({ slug }));
}
