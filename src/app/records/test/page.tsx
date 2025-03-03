import Link from 'next/link';
import { findAllPostsByDomain } from '@/shared/post';

export default function RecordsTestPage() {
  const posts = findAllPostsByDomain(['records', 'test']);

  return (
    <div>
      <h1 className="text-3xl font-bold">Test Table of Contents</h1>

      <br />

      <ul className="list-disc [&>li]:ml-4">
        {posts.map(({ slug, metadata: { title, publishedAt } }) => {
          return (
            <li key={`${slug}`} className="my-3">
              <time className="mr-4 text-sm opacity-60">{publishedAt}</time>
              <Link href={`/records/test/${slug}`} className="underline underline-offset-4">
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
