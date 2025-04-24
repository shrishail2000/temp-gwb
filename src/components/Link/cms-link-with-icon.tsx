import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/utilities/ui';
import Link from 'next/link';
import React from 'react';

import type { Media as MediaType, Page, Post } from '@/payload-types';
import { Media as MediaComponent } from '../Media';

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant'];
  children?: React.ReactNode;
  className?: string;
  label?: string | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: 'pages' | 'posts';
    value: Page | Post | string | number;
  } | null;
  size?: ButtonProps['size'] | null;
  type?: 'custom' | 'reference' | null;
  url?: string | null;
  icon?: {
    placement?: 'before' | 'after' | 'none' | null | undefined;
    image?: (string | null) | MediaType;
  };
};

export const CMSLinkWithIcon: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    icon,
  } = props;

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url;

  if (!href) return null;

  const size = appearance === 'link' ? 'clear' : sizeFromProps;
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {icon?.placement === 'before' && (
          <MediaComponent resource={icon.image} className="shrink-0" />
        )}
        {label && label}
        {icon?.placement === 'after' && (
          <MediaComponent resource={icon.image} className="shrink-0" />
        )}
        {children && children}
      </Link>
    );
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {icon?.placement === 'before' && (
          <MediaComponent resource={icon.image} className="shrink-0" />
        )}
        {label && label}
        {icon?.placement === 'after' && (
          <MediaComponent resource={icon.image} className="shrink-0" />
        )}
        {children && children}
      </Link>
    </Button>
  );
};
