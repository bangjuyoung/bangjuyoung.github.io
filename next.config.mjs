/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: [
    // @see https://github.com/vercel/next.js/issues/64525
    'next-mdx-remote',
  ],
};

export default nextConfig;
