import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type { SupportedBusinessBlock as SupportedBusinessBlockType } from '@/payload-types';
import { cn } from '@/utilities/ui';

type SupportedBusinessBlockProps = SupportedBusinessBlockType & {
  className?: string;
};

const SupportedBusinessBlock: React.FC<SupportedBusinessBlockProps> = ({
  title,
  subtitle,
  businessesList,
  callToAction,
  className,
}) => {
  if (!businessesList?.length) return null;

  return (
    <section className={cn('container flex flex-col gap-6 md:gap-[3.75rem]', className)}>
      {(title || subtitle) && (
        <div className="flex flex-col items-center gap-2">
          {title && <RichText data={title} className="text-center" />}
          {subtitle && <RichText data={subtitle} className="section-subtitle" />}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 md:gap-8">
        {businessesList.map((business) => (
          <div
            key={business.id}
            className="bg-secondary-container h-[100px] md:h-[128px] rounded-[6px] md:rounded-[8px] flex gap-2 items-center justify-between ps-4"
          >
            <p className="text-black font-semibold letter-spacing-h3 text-lg leading-6">
              {business.title}
            </p>
            {business.image && (
              <div className="relative h-full w-[100px] md:w-[120px] rounded-r-[6px] md:rounded-r-[8px] shrink-0 overflow-hidden">
                <Media resource={business.image} fill />
              </div>
            )}
          </div>
        ))}
        {callToAction && (
          <div className="bg-primary rounded-[20px] flex flex-col md:flex-row gap-5 md:gap-10 justify-between items-center p-4 md:p-6 h-fit md:h-[120px] col-span-1 sm:col-span-2">
            {callToAction.title && (
              <RichText
                data={callToAction.title}
                className="text-[1.5rem] text-white font-semibold letter-spacing-h3"
              />
            )}
            {callToAction.links?.length && (
              <CMSLink
                {...callToAction.links[0]?.link}
                className="px-6 py-3 rounded-[8px] shrink-0 font-semibold w-full md:w-fit"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export { SupportedBusinessBlock };
