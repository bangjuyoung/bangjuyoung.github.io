import { routing } from '../config';
import { LOCALE_COOKIE_MAX_AGE, LOCALE_COOKIE_NAME } from '@/shared/constants';
import { hasLocale } from 'next-intl';

export function detectClientLocale() {
  const { locales, defaultLocale, localeCookie } = routing;

  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  const cookieName = (typeof localeCookie === 'object' && localeCookie.name) || LOCALE_COOKIE_NAME;
  const cookieMaxAge = (typeof localeCookie === 'object' && localeCookie.maxAge) || LOCALE_COOKIE_MAX_AGE;

  // 1. URL prefix (ex: /ko-kr/about)
  const prefix = window.location.pathname.split('/')[1];

  if (hasLocale(locales, prefix)) {
    document.cookie = `${cookieName}=${prefix}; path=/; max-age=${cookieMaxAge}; SameSite=Lax;`;
    return prefix;
  }

  // 2. detect cookie
  const cookieRegex = new RegExp(`(?:^|.*;\\s*)${cookieName}=([^;]*)`);
  const cookieLocale = document.cookie.match(cookieRegex);

  if (cookieLocale && hasLocale(locales, cookieLocale[1])) {
    return cookieLocale[1];
  }

  // 3. default
  return defaultLocale;
}
