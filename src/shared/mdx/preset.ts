import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { PluggableList } from 'unified';

// GitHub 스타일 마크다운 + 줄바꿈을 <br>로 처리
export const remarkPlugins = [remarkGfm, remarkBreaks];

// 헤딩에 id 부여 + 앵커 링크 + 코드 하이라이트
export const rehypePlugins = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'wrap',
      properties: {
        className: ['autolink-heading'],
      },
    },
  ],
  [
    rehypePrettyCode,
    {
      theme: 'github-dark',
      // Tailwind/prose 배경과 충돌 방지
      keepBackground: false,
    },
  ],
] satisfies PluggableList;
