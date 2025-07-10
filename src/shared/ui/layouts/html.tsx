import { ComponentProps, PropsWithChildren } from 'react';
import { nanumGothicCoding } from '../fonts';
import { cn } from '@/shared/lib';

export type HtmlProps = PropsWithChildren<ComponentProps<'html'>>;

export function Html({ className, ...props }: HtmlProps) {
  return <html {...props} className={cn(nanumGothicCoding.variable, className)} />;
}
