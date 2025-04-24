import { Accordion } from '@/components/accordion/accordion';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import type { FaqBlock as FaqBlockType } from '@/payload-types';
import { cn } from '@/utilities/ui';

type FaqBlockProps = FaqBlockType & {
  className?: string;
};

const FAQ: React.FC<FaqBlockProps> = ({ title, questions, ctaPitch, links, className }) => {
  if (!questions?.length) return null;

  const faqData = questions.map((question) => ({
    title: question.question && (
      <RichText
        data={question.question}
        className="text-base md:text-xl font-medium md:font-medium letter-spacing-h3 leading-6"
      />
    ),
    content: question.answer && (
      <RichText data={question.answer} className="text-muted-foreground text-base" />
    ),
  }));

  return (
    <section className={cn('bg-background container flex flex-col items-center gap-10', className)}>
      {title && <RichText data={title} className="text-center" />}
      <div className="w-[80%] max-w-[1100px] min-w-full md:min-w-[500px]">
        <Accordion data={faqData} />
      </div>
      <div className="flex flex-col gap-4 items-center">
        {ctaPitch && <RichText data={ctaPitch} className="section-cta-pitch text-on-surface" />}
        {links?.map((link) => <CMSLink key={link.id} {...link.link} className="rounded-[8px]" />)}
      </div>
    </section>
  );
};

export { FAQ };
