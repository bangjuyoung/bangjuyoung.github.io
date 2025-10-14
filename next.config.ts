import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

// Configure MDX
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    // GitHub 스타일 마크다운 + 줄바꿈을 <br>로 처리
    remarkPlugins: ['remark-gfm', 'remark-breaks'],
    // 헤딩에 id 부여 + 앵커 링크 + 코드 하이라이트
    rehypePlugins: [
      'rehype-slug',
      [
        'rehype-autolink-headings',
        {
          behavior: 'wrap',
          properties: {
            className: ['autolink-heading'],
          },
        },
      ],
      [
        'rehype-pretty-code',
        {
          theme: 'github-dark',
          // Tailwind/prose 배경과 충돌 방지
          keepBackground: false,
        },
      ],
    ],
  },
});

// Configure Next Intl
const withNextIntl = createNextIntlPlugin('./src/modules/common/i18n/config/request.ts');

// Configure Next.js
const nextConfig: NextConfig = {
  output: 'export',

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

// Export the combined configuration
export default withMDX(withNextIntl(nextConfig));
