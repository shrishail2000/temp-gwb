'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utilities/ui';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { createContext, useContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

const MobileMenuContext = createContext<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

const MobileMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

const MobileMenuTrigger = ({ className }: { className?: string }) => {
  const ctx = useContext(MobileMenuContext);

  if (!ctx) {
    throw new Error('MobileMenuTrigger must be used within a MobileMenuProvider');
  }

  const { isOpen, setIsOpen } = ctx;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen((prev) => !prev)}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className={cn('relative z-30', className)}
    >
      {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
    </Button>
  );
};

const MobileMenuContent = ({ children }: { children: React.ReactNode }) => {
  const ctx = useContext(MobileMenuContext);

  if (!ctx) {
    throw new Error('MobileMenuContent must be used within a MobileMenuProvider');
  }

  const { isOpen } = ctx;

  return (
    <div
      className={cn(
        'fixed inset-0 z-20 w-full top-[4rem] h-fit bg-background transition-all duration-300 ease-in-out [&>ul]:overflow-y-hidden overflow-y-hidden grid accordion-content-grow',
        {
          'grid-rows-[1fr] overflow-y-auto py-2 pb-4 border-b': isOpen,
          'grid-rows-[0fr] overflow-y-hidden': !isOpen,
        },
      )}
    >
      {children}
    </div>
  );
};

const MobileMenuOverlay = ({ className }: { className?: string }) => {
  const ctx = useContext(MobileMenuContext);

  if (!ctx) {
    throw new Error('MobileMenuOverlay must be used within a MobileMenuProvider');
  }

  const { isOpen } = ctx;

  return (
    <div
      className={cn(
        'fixed inset-0 z-0 w-full top-0 left-0 h-dvh bg-black/10 transition-opacity duration-300 ease-in-out pointer-events-none',
        {
          'opacity-100': isOpen,
          'opacity-0': !isOpen,
        },
        className,
      )}
    />
  );
};

export { MobileMenuProvider, MobileMenuContent, MobileMenuTrigger, MobileMenuOverlay };
