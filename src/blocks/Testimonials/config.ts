import type { Block } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical';

export const Testimonials: Block = {
  slug: 'testimonial',
  interfaceName: 'TestimonialBlock',
  imageURL: '/assets/payload/testimonial-block.svg',
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
      name: 'gradientBackground',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'reviews',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'comment',
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
        {
          name: 'reviewerInfo',
          type: 'group',
          fields: [
            {
              name: 'name',
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
              name: 'bio',
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
              name: 'profileImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Testimonials',
    singular: 'Testimonial',
  },
};
