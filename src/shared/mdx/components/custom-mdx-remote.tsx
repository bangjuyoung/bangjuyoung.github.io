import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { highlight } from 'sugar-high';

import './custom-mdx-remote.css';

const MDX_COMPONENTS: MDXRemoteProps['components'] = {
  code: ({ children, ...props }) => {
    const codeHTML = highlight(children);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
};

export function CustomMDXRemote({ options, ...props }: MDXRemoteProps) {
  return (
    <article className="custom-mdx-remote">
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
