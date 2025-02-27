import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { highlight } from 'sugar-high';

const MDX_COMPONENTS: MDXRemoteProps['components'] = {
  a: ({ className, ...props }) => {
    return <a className={`underline-offset-4 text-blue-600 hover:text-blue-500 ${className}`} {...props} />;
  },
  code: ({ children, className, ...props }) => {
    const codeHTML = highlight(children);

    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} className={`code-highlight ${className}`} {...props} />;
  },
};

export function CustomMDXRemote({ options, ...props }: MDXRemoteProps) {
  return (
    <article className="max-w-none prose prose-slate">
      <MDXRemote
        {...props}
        components={{ ...MDX_COMPONENTS, ...props?.components }}
        options={{
          ...options,
          mdxOptions: { ...options?.mdxOptions, remarkPlugins: options?.mdxOptions?.remarkPlugins ?? [remarkGfm] },
        }}
      />
    </article>
  );
}
