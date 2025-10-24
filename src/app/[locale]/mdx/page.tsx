import { postListAll } from '@/modules/post';
import Link from 'next/link';

type Props = { params: Promise<{ locale: string }> };

export default async function MDXPage({ params }: Props) {
  const { locale } = await params;
  const items = await postListAll('mdx');

  if (items.length === 0) {
    return <div className="p-4">작성된 포스트가 없습니다.</div>;
  }

  return (
    <ul className="p-2 *:py-4 *:not-last:border-b">
      {items.map(({ slug, title, overview, date, published, tags }) => {
        return (
          <li key={`${slug}`}>
            <div>
              <h2 className="text-xl leading-tight font-bold">
                {!published && <small className="block mb-1 text-xs leading-tight font-normal">발행전</small>}
                <Link href={`/${locale}/mdx/${slug}`} className="underline decoration-1 underline-offset-6">
                  {title}
                </Link>
              </h2>
              <time className="text-sm leading-tight opacity-60">{date.toISOString()}</time>
            </div>

            {overview && <p className="mt-2">{overview}</p>}

            {tags.length > 0 && (
              <ul className="mt-4 flex gap-2 *:p-1.5 *:text-xs *:leading-tight *:font-bold *:rounded *:text-muted-foreground *:bg-muted">
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
