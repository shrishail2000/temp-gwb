'use client';

import { cn } from '@/utilities/ui';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

type AccordionProps = {
  data: {
    title: React.ReactNode;
    content: React.ReactNode;
  }[];
};

const Accordion = ({ data }: AccordionProps) => {
  const [openedTabs, setOpenedTabs] = useState(() => new Set());

  return (
    <div className={'flex flex-col w-full'}>
      {data.map((item, index) => (
        <div
          key={index}
          className={cn('border-b border-b-black/[13%]')}
          data-active={openedTabs.has(index)}
        >
          <button
            className={cn(
              'flex gap-2 justify-between items-start w-full py-6 px-4 text-left text-on-surface-variant focus:outline-foreground bg-background transition-colors duration-500 ease-in',
              {
                'text-on-surface': openedTabs.has(index),
              },
            )}
            onClick={() => {
              const newSet = new Set(openedTabs);
              if (newSet.has(index)) {
                newSet.delete(index);
              } else {
                newSet.add(index);
              }
              setOpenedTabs(newSet);
            }}
          >
            {item.title}
            <ChevronDownIcon
              width={25}
              height={25}
              className={cn('shrink-0 transition-transform duration-500 stroke-current', {
                'rotate-180': openedTabs.has(index),
                'rotate-0': !openedTabs.has(index),
              })}
            />
          </button>
          <div
            id={`faq-content-${index}`}
            className={cn(
              '[&>div]:overflow-hidden all grid px-4 pb-6 bg-background accordion-content-grow',
              {
                'overflow-hidden grid-rows-[0fr] pb-0': !openedTabs.has(index),
                'grid-rows-[1fr] pb-6': openedTabs.has(index),
              },
            )}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export { Accordion };
