import Link from 'next/link';
import { findAllPostsByDomain } from '@/shared/post';

export default function LabChallengesPage() {
  const posts = findAllPostsByDomain(['lab', 'challenges']);

  return (
    <div>
      <h1 className="text-3xl font-bold">Challenges Table of Contents</h1>

      <br />

      <ul className="list-disc [&>li]:ml-4">
        {posts.map(({ domainPath, slug, metadata: { title, publishedAt } }) => {
          return (
            <li key={`${slug}`} className="my-3">
              <time className="mr-4 text-sm opacity-60">{publishedAt}</time>
              <Link href={`/${domainPath}/${slug}`} className="underline underline-offset-4">
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
