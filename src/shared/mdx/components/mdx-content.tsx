import '@/shared/styles/markdown.css';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote-client/rsc';
import { rehypePlugins, remarkPlugins } from '../preset';
import { mdxComponents } from './mdx-components';

export type MDXContentProps = {
  title?: string;
  content: MDXRemoteProps['source'];
} & Pick<MDXRemoteProps, 'components' | 'options'>;

export function MDXContent({ title, content, components, options }: MDXContentProps) {
  const { mdxOptions, ...restOptions } = options ?? {};

  const mergedMdxOptions = {
    ...mdxOptions,
    development: mdxOptions?.development ?? false,
    remarkPlugins: mdxOptions?.remarkPlugins ?? remarkPlugins,
    rehypePlugins: mdxOptions?.rehypePlugins ?? rehypePlugins,
  };

  const mergedComponents = {
    ...mdxComponents,
    ...components,
  };

  return (
    <>
      {title && <h1>{title}</h1>}

      <MDXRemote
        source={content}
        components={mergedComponents}
        options={{
          ...restOptions,
          parseFrontmatter: restOptions?.parseFrontmatter ?? false,
          mdxOptions: mergedMdxOptions,
        }}
      />
    </>
  );
}
