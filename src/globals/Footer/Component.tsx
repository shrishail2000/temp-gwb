import { getCachedGlobal } from '@/utilities/getGlobals';
import Link from 'next/link';
import React from 'react';

import type { Footer } from '@/payload-types';

import { CMSLink, CMSLinkWithIcon } from '@/components/Link';
import { cn } from '@/utilities/ui';
import { Media } from '@/components/Media';
import { DEFAULT_LOGO } from './constants';

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)();

  const footerLinkGroups = footerData?.linkGroups || [];

  const socialLinks = footerData?.socials || [];

  const legalLinks = footerData?.legalLinks || [];

  return (
    <footer className="bg-on-surface dark:bg-card text-white">
      <div className="container py-10 flex flex-col">
        <Link className="w-fit" href="/">
          {footerData?.logo ? (
            <Media resource={footerData?.logo} />
          ) : (
            <Media resource={DEFAULT_LOGO} />
          )}
        </Link>
        <div className="grid grid-cols-2 md:grid-cols-4 pt-10 pb-6 gap-y-10 md:gap-2 md:gap-y-2">
          {footerLinkGroups?.map((group) => {
            return (
              <div key={group?.id} className="w-full shrink-0 flex flex-col justify-start gap-5">
                <p className="font-semibold">{group?.title}</p>
                <ul className="flex flex-col gap-4 md:gap-2">
                  {group?.links?.map((item) => (
                    // TODO: add this hard coded color to the theme
                    <li key={item?.id} className="text-[#999] text-sm md:text-base">
                      <CMSLink
                        {...item?.link}
                        className="hover:no-underline hover:text-white custom-underline"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="py-5 border-t border-[#999]/30 flex flex-col md:gap-5">
          <ul className="flex gap-5">
            {socialLinks?.map((link) => (
              <li key={link?.id}>
                <CMSLinkWithIcon {...link?.link} />
              </li>
            ))}
          </ul>
          <ul className="flex gap-y-2 gap-x-5 flex-wrap">
            {footerData?.copyrightText && (
              <span
                className={cn('h-4 text-background text-xs font-medium relative', {
                  'pipe-separator': legalLinks.length > 1,
                })}
              >
                {footerData?.copyrightText}
              </span>
            )}
            {legalLinks.map((link, index) => (
              <li
                key={link?.id}
                className={cn('h-4 text-background text-xs font-medium relative', {
                  'pipe-separator': index !== legalLinks.length - 1,
                })}
              >
                <CMSLink {...link?.link} className="hover:underline underline-offset-2" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
