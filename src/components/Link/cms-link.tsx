import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/utilities/ui';
import Link from 'next/link';
import React from 'react';
import { CMSLinkType } from './types';
import { getLinkUrl } from './helper';

export const CMSLink: React.FC<CMSLinkType> = (props) => {
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
    prefetch = false,
  } = props;

  const href = getLinkUrl(props);

  if (!href) return null;

  const size = appearance === 'link' ? 'clear' : sizeFromProps;
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {};

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps} prefetch={prefetch}>
        {label && label}
        {children && children}
      </Link>
    );
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps} prefetch={prefetch}>
        {label && <span>{label}</span>}
        {children && children}
      </Link>
    </Button>
  );
};
