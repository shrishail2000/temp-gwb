import type { Block } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical';

import { linkGroup } from '../../fields/linkGroup';
import { richTextWithColor } from '@/fields/text-with-color';

export const FeatureBlock: Block = {
  slug: 'feature',
  interfaceName: 'featureBlock',
  imageURL: '/assets/payload/feature-block.svg',
  fields: [
    {
      name: 'content',
      type: 'group',
      fields: [
        {
          name: 'tag',
          type: 'group',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              required: false,
            },
            {
              name: 'label',
              type: 'text',
            },
          ],
        },
        richTextWithColor({
          name: 'title',
        }),
        {
          name: 'description',
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
          label: 'Description',
        },
        linkGroup({
          appearances: ['default', 'outline'],
          overrides: {
            maxRows: 1,
          },
        }),
      ],
    },
    {
      name: 'image',
      type: 'group',
      fields: [
        {
          name: 'position',
          defaultValue: 'right',
          label: 'Image Position',
          type: 'select',
          options: ['left', 'right'],
        },
        {
          type: 'upload',
          relationTo: 'media',
          name: 'image',
          label: false,
        },
      ],
    },
    {
      name: 'background',
      type: 'select',
      options: ['white', 'gray'],
    },
  ],
  labels: {
    plural: 'Features',
    singular: 'Feature',
  },
};
