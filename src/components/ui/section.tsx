import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utilities/ui';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  container?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ asChild, container = false, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'section';

    return (
      <Comp ref={ref} className={cn('my-[3.75rem] md:my-[8.75rem]', className)} {...props}>
        {container ? <div className="container">{children}</div> : children}
      </Comp>
    );
  },
);

Section.displayName = 'Section';

export { Section };
