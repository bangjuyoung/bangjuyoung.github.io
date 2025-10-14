import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

// Configure MDX
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
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
