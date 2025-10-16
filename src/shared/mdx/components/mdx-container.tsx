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
    <Component
      {...props}
      className={cn(
        'prose prose-neutral dark:prose-invert',
        'max-w-none',
        'prose-headings:font-semibold',
        'prose-a:text-primary',
        'prose-strong:text-foreground',
        'prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
        'prose-pre:bg-muted prose-pre:text-foreground prose-pre:border prose-pre:border-border',
        'prose-hr:border-border',
        'prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:bg-muted/40 prose-blockquote:py-2 prose-blockquote:px-4',
        'prose-table:border-separate prose-table:border-spacing-0',
        'prose-th:border-b prose-th:border-border',
        'prose-td:border-t prose-td:border-border',
        className,
      )}
    >
      {children}
    </Component>
  );
}
