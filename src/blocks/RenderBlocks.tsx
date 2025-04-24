import React, { Fragment } from 'react';

import type { Page } from '@/payload-types';

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component';
import { CallToActionBlock } from '@/blocks/CallToAction/Component';
import { ContentBlock } from '@/blocks/Content/Component';
import { FormBlock } from '@/blocks/Form/Component';
import { MediaBlock } from '@/blocks/MediaBlock/Component';
import { SupportedBusinessBlock } from './SupportedBusiness/Component';
import { cn } from '@/utilities/ui';
import { ImageMarquee } from './ImageMarquee/Component';
import { FAQ } from './FAQ/Component';
import { Testimonials } from './Testimonials/Component';
import { Section } from '@/components/ui/section';
import { Feature } from './Feature/Component';

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  'supported-business': SupportedBusinessBlock,
  feature: Feature,
  'image-marquee': ImageMarquee,
  faq: FAQ,
  testimonial: Testimonials,
};

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][];
  sectionGap?: string;
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <Section
                  asChild
                  className={cn({
                    'my-0 md:my-0': blockType === 'feature',
                    '!mb-0': index === blocks.length - 1,
                  })}
                  key={index}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </Section>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
