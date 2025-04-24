import React from 'react';

import type { Page } from '@/payload-types';

import RichText from '@/components/RichText';
import { CMSLinkWithIcon } from '@/components/Link';

type LowImpactHeroType =
  | {
      children?: React.ReactNode;
      title?: never;
      links?: never;
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never;
      title?: Page['hero']['title'];
      links?: Page['hero']['links'];
    });

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, title, links }) => {
  return (
    <div className="container mt-16">
      <div className="flex flex-col justify-center items-center gap-6 py-2 md:py-4 pb-0">
        {children ||
          (title && <RichText data={title} enableGutter={false} className="text-center" />)}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLinkWithIcon {...link} className="rounded-[8px] gap-1" />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
