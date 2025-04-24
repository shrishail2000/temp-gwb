import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type { FeatureBlock as FeatureBlockType, Media as MediaType } from '@/payload-types';
import { cn } from '@/utilities/ui';

type FeatureBlockProps = FeatureBlockType & {
  className?: string;
};

const Feature: React.FC<FeatureBlockProps> = ({ background, content, image, className }) => {
  const renderTag = content?.tag?.label || (content?.tag?.icon as MediaType)?.url;
  const hasTagIcon = (content?.tag?.icon as MediaType)?.url;
  const imagePlacement = image?.position || 'right';

  return (
    <section
      className={cn(
        'feature-block',
        {
          'bg-surface py-6 md:py-[3.75rem]': background === 'gray',
          'py-12 md:py-[7.5rem]': background === 'white',
        },
        className,
      )}
    >
      <div
        className={cn('min-h-[500px] container h-full flex flex-col gap-5 md:gap-10', {
          'md:flex-row': imagePlacement === 'right',
          'md:flex-row-reverse': imagePlacement === 'left',
        })}
      >
        <div className="flex flex-col gap-5 md:gap-10 md:w-1/2 justify-center items-center md:items-start">
          <div className="flex flex-col gap-3 items-center md:items-start w-full">
            {renderTag && (
              <div
                className={cn(
                  'w-fit text-sm flex items-center border border-primary rounded-full gap-2 py-1',
                  {
                    'pl-[0.375rem] pr-2': hasTagIcon,
                    'px-3': !hasTagIcon,
                  },
                )}
              >
                {content?.tag?.icon && <Media resource={content?.tag?.icon} />}
                <span className="text-primary">{content?.tag?.label}</span>
              </div>
            )}
            {content?.title?.length && content.title.length > 0 && (
              <h2 className="text-center md:text-left [&>*]:inline text-wrap w-full">
                {(content?.title || [])?.map(
                  (text) =>
                    text.content && (
                      <span className={cn(text?.color || '', '[&_*]:inline')} key={text.id}>
                        <RichText data={text?.content} disableContainer={true} />{' '}
                      </span>
                    ),
                )}
              </h2>
            )}
          </div>
          {content?.description && (
            <RichText
              className=" [&>ul]:list-disc [&>ul]:pl-2 [&>ul]:ml-2 [&>ul]:gap-5 [&>ul]:flex [&>ul]:flex-col [&>ul>li]:tracking-[0.1px] [&>ul>li]:text-base [&>ul>li]:md:text-xl [&>ul>li]:font-normal"
              data={content?.description}
            />
          )}
          <div className="hidden md:flex justify-center md:justify-start items-center gap-2 md:gap-4">
            {content?.links?.map(({ link, id }) => (
              <CMSLink {...link} key={id} className="rounded-[8px]" />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 relative">
          <Media resource={image?.image} />
        </div>
        <div className="flex md:hidden justify-center md:justify-start items-center gap-2 md:gap-4">
          {content?.links?.map(({ link, id }) => (
            <CMSLink {...link} key={id} className="rounded-[8px] w-full leading-6" />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature };
