import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const ImageMarquee: Block = {
  slug: 'image-marquee',
  interfaceName: 'ImageMarqueeBlock',
  imageURL: '/assets/payload/image-marquee-block.svg',
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
          ]
        },
      }),
      label: 'Title',
    },
    {
      name: 'ctaPitch',
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
          ]
        },
      }),
      label: 'CTA Pitch',
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 1,
      },
    }),
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          type: 'upload',
          relationTo: 'media',
          name: 'image',
          label: 'Image',
        },
      ],
    },
  ],
  labels: {
    plural: 'Image Marquees',
    singular: 'Image Marquee',
  },
}
