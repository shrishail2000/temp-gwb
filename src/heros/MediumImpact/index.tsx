import React from 'react';

import type { Page } from '@/payload-types';

import { CMSLinkWithIcon } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, title }) => {
  return (
    <div className="container md:h-[400px] flex flex-col md:flex-row justify-between gap-6 py-10 pb-0 md:my-[3.75rem]">
      <div className="mb-8 md:w-[40%]">
        {title && <RichText className="mb-6" data={title} enableGutter={false} />}

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
      <div className="md:w-[60%]">
        {media && typeof media === 'object' && (
          <div className="h-full">
            <Media
              className="h-full"
              imgClassName="h-full object-contain"
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3">
                <RichText data={media.caption} enableGutter={false} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
