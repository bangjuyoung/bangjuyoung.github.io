import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Configure Next Intl
const withNextIntl = createNextIntlPlugin('./src/shared/i18n/config/request.ts');

// Configure Next.js
const nextConfig: NextConfig = {
  output: 'export',

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

// Export the combined configuration
export default withNextIntl(nextConfig);
