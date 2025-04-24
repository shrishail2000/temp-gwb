import type { GlobalConfig } from 'payload';

import { link } from '@/fields/link';
import { revalidateFooter } from './hooks/revalidateFooter';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'linkGroups',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'links',
          type: 'array',
          fields: [link({ appearances: false })],
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        link({
          disableLabel: true,
          appearances: false,
        }),
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
    },
    {
      name: 'legalLinks',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
