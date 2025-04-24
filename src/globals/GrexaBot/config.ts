import type { Field, GlobalConfig } from 'payload';

import { link } from '@/fields/link';
import { revalidate } from './hooks/revalidate';

export const GrexaBotFloatingWidget: GlobalConfig = {
  slug: 'grexabot-floating-widget',
  access: {
    read: () => true,
  },
  //   fields: [
  //     {
  //       name: 'variants',
  //       type: 'array',
  //       fields: [
  //         {
  //           name: 'name',
  //           label: 'Variant Name',
  //           type: 'text',
  //           admin: {
  //             description:
  //               'This is the name of the variant that will be used to identify it in the admin panel. Use lower case characters and underscores.',
  //               placeholder: 'default_variant'
  //           },
  //         },
  //         {
  //           name: 'text',
  //           type: 'richText',
  //         },
  //         link(),
  //         {
  //           name: 'default',
  //           label: 'Default State',
  //           type: 'group',
  //           fields: [
  //             {
  //               name: 'botLogo',
  //               type: 'upload',
  //               relationTo: 'media',
  //             },
  //             {
  //               name: 'background',
  //               type: 'upload',
  //               relationTo: 'media',
  //             },
  //           ],
  //         },
  //         {
  //           name: 'hover',
  //           label: 'Hover State',
  //           type: 'group',
  //           fields: [
  //             {
  //               name: 'botLogo',
  //               type: 'upload',
  //               relationTo: 'media',
  //             },
  //             {
  //               name: 'background',
  //               type: 'upload',
  //               relationTo: 'media',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  fields: [
    {
      name: 'text',
      type: 'richText',
    },
    link({
      appearances: ['default'],
      disableLabel: true,
      overrides: {
        admin: {
          description: 'This is the redirect URL for the GrexaBot widget.',
        },
      },
    }),
    {
      name: 'default',
      label: 'Default State',
      type: 'group',
      fields: [
        {
          name: 'botLogo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'background',
          type: 'group',
          defaultValue: 'color',
          fields: [
            {
              name: 'type',
              type: 'radio',
              defaultValue: 'color',
              options: [
                {
                  label: 'Color',
                  value: 'color',
                },
                {
                  label: 'Image',
                  value: 'image',
                },
              ],
            },
            {
              name: 'color',
              label: false,
              type: 'select',
              defaultValue: 'secondary',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'color',
              },
              options: [
                {
                  label: 'Primary',
                  value: 'primary',
                },
                {
                  label: 'Secondary',
                  value: 'secondary',
                },
              ],
            },
            {
              name: 'image',
              label: false,
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'image',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'hover',
      label: 'Hover State',
      type: 'group',
      fields: [
        {
          name: 'botLogo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'background',
          type: 'group',
          fields: [
            {
              name: 'type',
              type: 'radio',
              defaultValue: 'color',
              options: [
                {
                  label: 'Color',
                  value: 'color',
                },
                {
                  label: 'Image',
                  value: 'image',
                },
              ],
            },
            {
              name: 'color',
              label: false,
              type: 'select',
              defaultValue: 'secondary',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'color',
              },
              options: [
                {
                  label: 'Primary',
                  value: 'primary',
                },
                {
                  label: 'Secondary',
                  value: 'secondary',
                },
              ],
            },
            {
              name: 'image',
              label: false,
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'image',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidate],
  },
};
