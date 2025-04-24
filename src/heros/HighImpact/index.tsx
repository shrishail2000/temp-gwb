import { useHeaderTheme } from '@/providers/HeaderTheme';
import React from 'react';

import type { Media as MediaType, Page } from '@/payload-types';

import { CMSLink, CMSLinkWithIcon } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import { getImageUrl } from '@/components/Media/helper';

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, title, description }) => {
  media = media as MediaType;
  const mediaURL = getImageUrl(media);

  return (
    <section className="bg-background container md:h-[calc(90vh-84px)] min-h-[560px] flex flex-col md:flex-row justify-between gap-6 py-10 pb-0 md:my-[3.75rem]">
      <div className="h-full flex flex-col justify-center gap-5 md:gap-10 md:w-1/2">
        <div className="flex flex-col gap-1 md:gap-5">
          {title && (
            <RichText
              data={title}
              className="text-6xl font-medium text-on-surface leading-[70px] letter-spacing-h1"
            />
          )}
          {description && (
            <RichText data={description} className="md:text-lg font-normal text-on-surface" />
          )}
        </div>
        <div className="flex gap-4 md:gap-5">
          {links?.map(({ link, id }) => {
            const hasIcon = link?.icon?.placement !== 'none' && link?.icon?.image;
            return (
              <CMSLinkWithIcon
                key={id}
                {...link}
                className={cn('rounded-[8px] letter-spacing-[-1%] font-semibold', {
                  'flex items-center gap-2': hasIcon,
                })}
              />
            );
          })}
        </div>
      </div>
      {media && media?.url && (
        <div className="w-full md:w-1/2 h-[300px] md:h-full flex flex-col justify-center items-center">
          {mediaURL && (
            <Media
              className="h-full"
              imgClassName="h-full md:h-[500px] w-auto object-contain"
              priority
              resource={media}
            />
          )}
        </div>
      )}
    </section>
  );
};
