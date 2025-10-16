import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { cn } from '@/shared/lib';

export const mdxComponents: MDXComponents = {
  a: ({ href = '', target, rel, children, className, ...props }) => {
    const isExternal = /^https?:\/\//.test(href);

    return (
      <Link
        href={href}
        target={isExternal ? '_blank' : target}
        rel={isExternal ? 'noopener noreferrer' : rel}
        className={cn('decoration-1 underline-offset-4', className)}
        {...props}
      >
        {children}
      </Link>
    );
  },
  code: ({ className, children, ...props }) =>
    className?.includes('language-') ? (
      <code className={className} {...props}>
        {children}
      </code>
    ) : (
      <code className="rounded bg-muted px-1 py-0.5 text-foreground" {...props}>
        {children}
      </code>
    ),
  pre: ({ children, ...props }) => (
    <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4 text-foreground border border-border" {...props}>
      {children}
    </pre>
  ),
  img: ({ src = '', alt = '', width, height, ...props }) =>
    src ? (
      <Image
        src={src}
        alt={alt}
        width={width ? Number(width) : 800}
        height={height ? Number(height) : 450}
        className="rounded-lg border border-border my-4"
        {...props}
      />
    ) : null,
  table: (props) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-border bg-muted px-3 py-1.5 text-left" {...props} />,
  td: (props) => <td className="border-t border-border px-3 py-1.5" {...props} />,
};
