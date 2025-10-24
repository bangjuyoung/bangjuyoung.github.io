import '@/shared/styles/globals.css';
import { PropsWithChildren } from 'react';

type Props = Readonly<PropsWithChildren>;

// @see https://next-intl.dev/docs/routing/middleware#usage-without-middleware-static-export
export default function RootLayout({ children }: Props) {
  return children;
}
