export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'test' }];
}

export const dynamicParams = false;

export default async function MDXSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { default: Post } = await import(`@content/mdx/${slug}/index.mdx`);

  return <Post />;
}
