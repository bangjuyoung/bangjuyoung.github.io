import Link from 'next/link';
import { findSubFoldersByDomain } from '@/shared/post';

export default function LabPage() {
  const { domainPath, folders } = findSubFoldersByDomain(['lab']) ?? { domainPath: 'lab', folders: [] };

  return (
    <div>
      <h1 className="text-3xl font-bold">Lab</h1>

      <br />

      <ul className="list-disc [&>li]:ml-4">
        {folders.map(({ slug, title }) => {
          return (
            <li key={`${slug}`} className="my-3">
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
