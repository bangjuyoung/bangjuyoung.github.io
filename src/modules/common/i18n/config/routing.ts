import { defineRouting } from 'next-intl/routing';
import { DEFAULT_LOCALE, LOCALE_COOKIE_MAX_AGE, LOCALE_COOKIE_NAME, LOCALES } from '@/shared/domain';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.keys(LOCALES),

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,

  // @see https://next-intl.dev/docs/routing/middleware#usage-without-middleware-static-export
  localePrefix: 'always',
  localeDetection: false,

  // @see https://next-intl.dev/docs/routing#locale-cookie
  localeCookie: {
    name: LOCALE_COOKIE_NAME,
    // Expire in one year
    maxAge: LOCALE_COOKIE_MAX_AGE,
  },
});
