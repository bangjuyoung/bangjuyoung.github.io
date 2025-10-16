import { ComponentPropsWithRef, ElementType, JSX } from 'react';
import { cn } from '@/shared/lib';

export type PropsOf<C extends ElementType> = JSX.LibraryManagedAttributes<C, ComponentPropsWithRef<C>>;

type AsProps<C extends ElementType> = {
  as?: C;
};

type EmptyObject = Record<never, never>;

export type WithAsProps<C extends ElementType, Props = EmptyObject> = Props & AsProps<C>;

export type PolymorphicComponentProps<C extends ElementType, Props = EmptyObject> = WithAsProps<C, Props> &
  Omit<PropsOf<C>, keyof WithAsProps<C, Props>>;

export type MDXContainerProps<C extends ElementType = 'article'> = PolymorphicComponentProps<C>;

export function MDXContainer<C extends ElementType = 'article'>({
  as,
  className,
  children,
  ...props
}: MDXContainerProps<C>) {
  const Component = as ?? 'article';

  return (
    <Component {...props} className={cn('prose prose-slate max-w-none', className)}>
      {children}
    </Component>
  );
}
