import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import Image from 'next/image';

export const mdxComponents: MDXRemoteProps['components'] = {
  wrapper: ({ children }) => {
    return <article className="max-w-none prose prose-slate">{children}</article>;
  },

  a: ({ className, ...props }) => {
    return <a className={`underline-offset-4 text-blue-600 hover:text-blue-500 ${className}`} {...props} />;
  },

  code: ({ children, className, ...props }) => {
    const codeHTML = highlight(children);

    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} className={`code-highlight ${className}`} {...props} />;
  },

  img: ({ alt, ...props }) => {
    return <Image alt={alt ?? ''} {...props} />;
  },
};
