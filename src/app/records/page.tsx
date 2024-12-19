import Link from 'next/link';
import { recordContents } from '@/contexts/record';

export default function RecordPage() {
  const contents = recordContents.getAll();

  return (
    <div>
      <h1 className="text-3xl font-bold">Records Table of Contents</h1>

      <br />

      <ul className="list-disc [&>li]:ml-4">
        {contents.map(({ slug, metadata }) => {
          return (
            <li key={`${slug}`} className="my-3">
              <time className="mr-4 text-sm opacity-60">{metadata.publishedAt}</time>
              <Link href={`/records/${slug}`} className="underline underline-offset-4">
                {metadata.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
