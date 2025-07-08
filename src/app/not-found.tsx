'use client';

import { DEFAULT_LOCALE } from '@/shared/domain';

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <h1 className="p-2 text-3xl font-bold text-red-600">Global Not Found</h1>
      </body>
    </html>
  );
}
