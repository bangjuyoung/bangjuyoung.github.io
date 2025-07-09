import { use } from 'react';
import { hasLocale } from 'use-intl';
import { routing } from '@/modules/common/i18n';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleHomePage({ params }: Props) {
  const { locale } = use(params);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const t = useTranslations('HomePage');

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('title')}</h1>
    </div>
  );
}
