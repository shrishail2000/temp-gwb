import type { ArrayField, Field, GroupField } from 'payload';

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical';

export type LinkAppearances = 'default' | 'white' | 'primary';

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default (Black)',
    value: 'text-on-surface',
  },
  white: {
    label: 'White',
    value: 'text-white',
  },
  primary: {
    label: 'Primary',
    value: 'text-primary',
  },
};

type RichTextWithColorProps = {
  name: string;
};

export const richTextWithColor = ({ name }: RichTextWithColorProps) => {
  const richTextWithColorField: ArrayField = {
    name: name,
    type: 'array',
    admin: {
      description: 'Each peice of text which has a different color must be added as a new row',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'content',
            type: 'richText',
            admin: {
              width: '70%',
            },
            editor: lexicalEditor({
              features: ({ rootFeatures }) => {
                return [
                  ...rootFeatures,
                  OrderedListFeature(),
                  UnorderedListFeature(),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ];
              },
            }),
          },
          {
            name: 'color',
            type: 'select',
            defaultValue: appearanceOptions.default.value,
            options: [
              appearanceOptions.default,
              appearanceOptions.white,
              appearanceOptions.primary,
            ],
          },
        ],
      },
    ],
  };

  return richTextWithColorField;
};
