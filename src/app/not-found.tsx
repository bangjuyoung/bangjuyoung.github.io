'use client';

import { LocaleNotFound, useNotFoundMessage } from '@/shared/i18n';
import { NextIntlClientProvider } from 'next-intl';
import { Html } from '@/shared/layouts';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  const state = useNotFoundMessage('loading');

  const messages = {
    NOT_FOUND: state.message ?? {
      title: '404 - Not Found',
      description: '',
      goToHome: '처음으로',
    },
  };

  return (
    <Html lang={state.locale}>
      <body>
        <NextIntlClientProvider locale={state.locale} messages={messages}>
          {state.status === 'loading' && <div>Loading...</div>}
          {(state.status === 'success' || state.status === 'error') && <LocaleNotFound />}
        </NextIntlClientProvider>
      </body>
    </Html>
  );
}
