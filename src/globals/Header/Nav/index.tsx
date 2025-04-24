import React from 'react';

import type { Header as HeaderType } from '@/payload-types';

import { CMSLink } from '@/components/Link';

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];

  return (
    <nav className="flex items-center">
      <ul className="hidden md:flex md:gap-6 lg:gap-12 items-center">
        {navItems.map(({ link, id }) => {
          return (
            <li key={id}>
              <CMSLink
                {...link}
                appearance="link"
                className="text-base text-on-surface letter-spacing-h3 hover:no-underline custom-underline"
                prefetch={true}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
