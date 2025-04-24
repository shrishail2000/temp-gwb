import { getLinkUrl } from '@/components/Link/helper';
import { Media } from '@/components/Media';
import { getImageUrl } from '@/components/Media/helper';
import RichText from '@/components/RichText';
import { GrexabotFloatingWidget as GrexabotFloatingWidgetType } from '@/payload-types';
import { getCachedGlobal } from '@/utilities/getGlobals';
import { cn } from '@/utilities/ui';
import Image from 'next/image';
import Link from 'next/link';

type GrexaBotFloatingWidgetProps = {
  className?: string;
};

const GrexaBotFloatingWidget = async ({ className }: GrexaBotFloatingWidgetProps) => {
  const widgetData: GrexabotFloatingWidgetType = await getCachedGlobal(
    'grexabot-floating-widget',
    1,
  )();

  if (!widgetData?.link) return null;

  const linkUrl = getLinkUrl(widgetData.link);
  const hoverBackground = getImageUrl(widgetData.hover?.background?.image);

  const renderBotLogo =
    getImageUrl(widgetData.default?.botLogo) || getImageUrl(widgetData.hover?.botLogo);

  if (!linkUrl) return null;

  return (
    <Link
      href={linkUrl}
      className={cn(
        'hidden md:block group fixed bottom-[3.75rem] right-10 rounded-full shadow-l5',
        className,
      )}
    >
      <div className="bg-secondary relative py-2 px-5 rounded-full overflow-hidden">
        {hoverBackground && (
          <Image
            className="absolute z-0 top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
            src={hoverBackground}
            alt="Bot widget background"
            width={240}
            height={64}
          />
        )}
        <div className="z-10 relative flex justify-between gap-[.625rem] items-center">
          {renderBotLogo && (
            <div className="relative w-12 h-12 shrink-0">
              {widgetData?.default?.botLogo && (
                <Media
                  resource={widgetData.default?.botLogo}
                  fill
                  imgClassName={cn(
                    'z-0 absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-out',
                    {
                      // only hide the image if we have hover image
                      'group-hover:opacity-0': widgetData.hover?.botLogo,
                    },
                  )}
                />
              )}
              {widgetData?.hover?.botLogo && (
                <Media
                  fill
                  resource={widgetData.hover?.botLogo}
                  imgClassName={cn(
                    'z-0 absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 ease-out',
                    {
                      'group-hover:opacity-100': widgetData.hover?.botLogo,
                    },
                  )}
                />
              )}
            </div>
          )}
          {widgetData?.text && (
            <RichText
              className="text-primary group-hover:text-white transition-color duration-500 ease-out"
              data={widgetData.text}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export { GrexaBotFloatingWidget };
