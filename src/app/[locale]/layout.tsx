import { PropsWithChildren, use } from 'react';
import { hasLocale } from 'use-intl';
import { Link, LocaleSwitcher, routing } from '@/modules/common/i18n';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@/shared/ui/shadcn-ui';
import { Html } from '@/shared/ui/layouts';

type Props = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<Props, 'params'>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'COMMON' });

  return {
    title: t('app_name'),
    description: t('app_description'),
  };
}

export default function LocaleLayout({ params, children }: Readonly<Props>) {
  const { locale } = use(params);

  if (!hasLocale(routing.locales, locale)) {
    return notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const t = use(getTranslations({ locale, namespace: 'COMMON' }));

  return (
    <Html lang={locale}>
      <body className={`antialiased`}>
        <NextIntlClientProvider>
          <LocaleSwitcher />
          <h1 className="text-3xl font-bold">{t('app_name')}</h1>
          <p className="text-sm">{t('app_description')}</p>

          <div className="inline-flex gap-4 p-4 border rounded">
            <Button asChild>
              <Link locale="ko-kr" href="/">
                한국어 홈
              </Link>
            </Button>

            <Button asChild>
              <Link locale="en-us" href="/">
                영어 홈
              </Link>
            </Button>

            <Button asChild>
              <Link locale="ko-kr" href="/about">
                한국어 소개
              </Link>
            </Button>

            <Button asChild>
              <Link locale="en-us" href="/about">
                영어 소개
              </Link>
            </Button>
          </div>

          {children}
        </NextIntlClientProvider>
      </body>
    </Html>
  );
}
