import type { Metadata } from 'next';
import Link from 'next/link';
import '@/shared/styles/globals.css';
import { defaultFont } from '@/shared/styles/fonts';

export const metadata: Metadata = {
  title: 'Bangjuyoung',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={defaultFont.className}>
        <nav className="flex gap-4 p-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/records">Records</Link>
          <Link href="/lab">Lab</Link>
          <Link href="/changelog">Changelog</Link>
          <Link href="https://github.com/bangjuyoung/bangjuyoung.github.io" target="_blank">
            github
          </Link>
        </nav>

        <div className="p-4 [&>p]:mb-4">
          <h1 className="mb-6 text-5xl font-bold">한글입숨 Spaces vs. Tabs</h1>
          <p>
            모든 국민은 주거의 자유를 침해받지 아니한다. 주거에 대한 압수나 수색을 할 때에는 검사의 신청에 의하여 법관이
            발부한 영장을 제시하여야 한다.
          </p>

          <p>
            감사원의 조직·직무범위·감사위원의 자격·감사대상공무원의 범위 기타 필요한 사항은 법률로 정한다. 법관은 헌법과
            법률에 의하여 그 양심에 따라 독립하여 심판한다. 중앙선거관리위원회는 대통령이 임명하는 3인, 국회에서
            선출하는 3인과 대법원장이 지명하는 3인의 위원으로 구성한다. 위원장은 위원중에서 호선한다. 자금을 보조할 수
            있다.
          </p>

          <p>
            모든 국민은 법률이 정하는 바에 의하여 선거권을 가진다. 행정각부의 장은 국무위원 중에서 국무총리의 제청으로
            대통령이 임명한다. 정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는 바에 의하여
            정당운영에 필요한
            <br />
            debate between dynamic and static typing continues to be a hot topic. While dynamic typing offers
            flexibility and rapid development, static typing brings its own set of powerful advantages that can
            significantly improve the quality and maintainability of code. In this post, we&apos;ll explore why static
            typing is crucial for developers, accompanied by practical examples through markdown code snippets.
          </p>
        </div>

        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
