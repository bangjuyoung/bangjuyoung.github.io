import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: 'export',
};

const withNextIntl = createNextIntlPlugin('./src/modules/common/i18n/config/request.ts');

export default withNextIntl(nextConfig);
