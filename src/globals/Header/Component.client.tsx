import Link from 'next/link';
import React from 'react';

import type { Header } from '@/payload-types';

import { HeaderNav } from './Nav';
import { Media } from '@/components/Media';
import { CMSLink, CMSLinkWithIcon } from '@/components/Link';
import { DEFAULT_LOGO } from './constants';
import {
  MobileMenuContent,
  MobileMenuOverlay,
  MobileMenuProvider,
  MobileMenuTrigger,
} from './Nav/mobile-menu-context';

interface HeaderClientProps {
  data: Header;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const theme = 'light';

  return (
    <MobileMenuProvider>
      <header
        className="sticky top-0 z-20 bg-on-primary shadow-l1"
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="py-3 relative z-20 flex justify-between container">
          <Link href="/" className="flex items-center">
            {data.logo ? (
              <Media
                resource={data.logo}
                loading="eager"
                priority={true}
                className="invert-0 dark:invert my-auto"
              />
            ) : (
              <Media
                resource={DEFAULT_LOGO}
                loading="eager"
                priority={true}
                className="invert-0 dark:invert my-auto"
              />
            )}
          </Link>
          <HeaderNav data={data} />
          <div className="hidden md:flex gap-5">
            {data?.links?.map((link) => (
              <CMSLinkWithIcon
                key={link.id}
                {...link.link}
                className="gap-2 rounded-[.5rem] font-semibold px-5 py-3 text-base"
              />
            ))}
          </div>
          {data?.navItems && <MobileMenuTrigger className="md:hidden" />}
        </div>
        {data?.navItems && (
          <MobileMenuContent>
            <ul className="container md:hidden">
              {data?.navItems.map(({ link, id }) => {
                return (
                  <li key={id}>
                    <CMSLink
                      {...link}
                      appearance="link"
                      className="text-base text-on-surface letter-spacing-h3 my-2 hover:no-underline custom-underline"
                    />
                  </li>
                );
              })}
            </ul>
          </MobileMenuContent>
        )}
      </header>
      {data?.navItems && <MobileMenuOverlay className="md:hidden" />}
    </MobileMenuProvider>
  );
};
