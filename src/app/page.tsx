import { redirect } from 'next/navigation';
import { routing } from '@/shared/i18n';

// @see https://next-intl.dev/docs/routing/middleware#usage-without-middleware-static-export
export default function HomePage() {
  redirect(`/${routing.defaultLocale}`);
}
