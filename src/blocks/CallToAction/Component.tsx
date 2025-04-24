import React from 'react';

import type { CallToActionBlock as CTABlockType } from '@/payload-types';

import RichText from '@/components/RichText';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import { cn } from '@/utilities/ui';

type CTABlockProps = CTABlockType & {
  className?: string;
};

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  links,
  richText,
  image,
  className,
}) => {
  return (
    <section className={cn('container pt-6 md:pt-14', className)}>
      <div className="w-full bg-[#045CCC] rounded-xl md:rounded-[32px] flex flex-col md:flex-row gap-4 items-center md:items-stretch justify-start md:justify-between p-4 md:p-0 pb-0 md:pr-[8rem]">
        <div className="flex flex-col gap-5 items-center md:items-start md:gap-10 w-full md:w-[50%] md:py-[3.75rem] md:pl-14">
          {richText && (
            <RichText
              data={richText}
              className="text-primary-foreground tracking-tighter text-center md:text-start font-medium md:font-semibold px-1"
            />
          )}
          {links?.map((link) => (
            <CMSLink
              key={link.id}
              {...link.link}
              className="py-2 px-4 rounded-[6px] w-fit tracking-tight"
            />
          ))}
        </div>
        {image && (
          <div className="relative w-[320px]">
            <Media resource={image} imgClassName="md:absolute left-0 bottom-0 right-0 w-full" />
          </div>
        )}
      </div>
    </section>
  );
};
