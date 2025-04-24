import type { Block } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical';
import { linkGroup } from '@/fields/linkGroup';

export const SupportedBusinesses: Block = {
  slug: 'supported-business',
  interfaceName: 'SupportedBusinessBlock',
  imageURL: '/assets/payload/supported-businesses-block.svg',
  fields: [
    {
      name: 'title',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            OrderedListFeature(),
            UnorderedListFeature(),
          ];
        },
      }),
    },
    {
      name: 'businessesList',
      type: 'array',
      admin: {
        description: 'Make sure that number of businesses in list does not break the UI',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'callToAction',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ];
            },
          }),
        },
        linkGroup({
          appearances: ['default', 'outline', 'inverse-primary'],
          overrides: {
            maxRows: 1,
          },
        }),
      ],
    },
  ],
  labels: {
    plural: 'Supported Businesses',
    singular: 'Supported Businesses',
  },
};
