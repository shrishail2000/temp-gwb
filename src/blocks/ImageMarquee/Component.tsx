import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type { ImageMarqueeBlock as ImageMarqueeBlockType } from '@/payload-types';
import { cn } from '@/utilities/ui';

type ImageMarqueeBlockProps = ImageMarqueeBlockType & {
  className?: string;
};

const ImageMarquee: React.FC<ImageMarqueeBlockProps> = ({
  title,
  images,
  ctaPitch,
  links,
  className,
}) => {
  if (!images?.length) return null;

  const imageMultiplier = 2;
  const imagesToRender = [...images];
  for (let i = 1; i < imageMultiplier; i++) {
    imagesToRender.push(...images);
  }

  const ariaHiddenBoundary = imagesToRender.length / imageMultiplier;

  return (
    <section
      className={cn(
        'bg-background w-full flex flex-col items-center gap-5 md:gap-10 overflow-hidden',
        className,
      )}
    >
      {title && <RichText data={title} className="container text-center" />}
      <div className="marquee-container overflow-x-clip w-full">
        <div className="flex gap-10 marquee-images-track w-max pl-10">
          {imagesToRender.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="w-[172px] h-[172px] flex justify-center items-center"
              aria-hidden={(index + 1) / ariaHiddenBoundary > 1}
            >
              <Media resource={image.image} imgClassName="max-w-full w-fit h-auto" />
            </div>
          ))}
        </div>
      </div>
      {(ctaPitch || links?.length) && (
        <div className="container flex flex-col gap-4 items-center">
          {ctaPitch && <RichText data={ctaPitch} className="section-cta-pitch text-on-surface" />}
          {links?.map((link) => (
            <CMSLink key={link.id} {...link.link} className="rounded-[.5rem]" />
          ))}
        </div>
      )}
    </section>
  );
};

export { ImageMarquee };
