'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/shadcn-ui';
import { LOCALES } from '@/shared/constants';
import { useLocale } from 'next-intl';
import { SelectProps } from '@radix-ui/react-select';
import { usePathname, useRouter } from '../config';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange: SelectProps['onValueChange'] = (locale) => {
    startTransition(() => {
      router.push(
        {
          pathname,
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          params,
        },
        { locale },
      );
    });
  };

  return (
    <Select value={locale} disabled={isPending} onValueChange={handleLocaleChange}>
      <SelectTrigger>
        <SelectValue placeholder={locale} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(LOCALES).map(([key, { label }]) => {
          return (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
