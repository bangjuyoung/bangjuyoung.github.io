import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from './mdx-components';

export function MDXContent({ options, ...props }: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...mdxComponents, ...props?.components }}
      options={{
        ...options,
        mdxOptions: { ...options?.mdxOptions, remarkPlugins: options?.mdxOptions?.remarkPlugins ?? [remarkGfm] },
      }}
    />
  );
}
