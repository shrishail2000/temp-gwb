import type { GlobalConfig } from 'payload';

import { link } from '@/fields/link';
import { revalidateHeader } from './hooks/revalidateHeader';
import { linkGroup } from '@/fields/linkGroup';

export const Header: GlobalConfig = {
  slug: 'header',
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
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
    linkGroup({
      overrides: {
        maxRows: 1,
      },
    }),
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
