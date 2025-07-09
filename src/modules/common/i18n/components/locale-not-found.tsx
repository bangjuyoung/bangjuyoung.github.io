import { useTranslations } from 'next-intl';
import { Link } from '@/modules/common/i18n';
import { Button } from '@/shared/ui/shadcn-ui';

export function LocaleNotFound() {
  const t = useTranslations('NOT_FOUND');

  return (
    <div className="flex flex-col gap-4 p-2">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p>{t('description')}</p>

      <Button className="max-w-fit" asChild>
        <Link href="/">{t('goToHome')}</Link>
      </Button>
    </div>
  );
}
